import {
  ClientConnectedEvent,
  ClientDisconnectedEvent,
  ClientStateChangedEvent,
  collection,
  RpcEvent,
} from '@earnkeeper/ekp-sdk';
import {
  AbstractController,
  ClientService,
  logger,
} from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { PlayerInfoService } from './player-info.service';
import { PlayerInfoDocument } from './ui/player-info.document';
import page from './ui/player-info.uielement';

const COLLECTION_NAME = collection(PlayerInfoDocument);
const PATH = 'info';

@Injectable()
export class PlayerInfoController extends AbstractController {
  constructor(
    clientService: ClientService,
    private playersService: PlayerInfoService,
  ) {
    super(clientService);
  }

  async onClientConnected(event: ClientConnectedEvent) {
    await this.clientService.emitMenu(event, {
      id: PATH,
      title: 'Info',
      navLink: PATH,
      icon: 'user',
    });

    await this.clientService.emitPage(event, {
      id: PATH,
      element: page(),
    });
  }

  async onClientStateChanged(event: ClientStateChangedEvent) {
    if (PATH !== event?.state?.client?.path) {
      return;
    }
    try {
      await this.clientService.emitBusy(event, COLLECTION_NAME);

      const currency = event.state.client.selectedCurrency;

      const playersForm = event.state.forms?.players;

      const documents = await this.playersService.fetchDocuments(
        currency,
        playersForm,
      );
      await this.clientService.emitDocuments(
        event,
        COLLECTION_NAME,
        _.slice(documents, 0, 100),
      );
    } catch (error) {
      logger.error('Error occurred while handling event', error);
      console.error(error);
    } finally {
      await this.clientService.emitDone(event, COLLECTION_NAME);
    }
  }

  async onClientDisconnected(event: ClientDisconnectedEvent) {
    // Do nothing
  }

  async onClientRpc(event: RpcEvent) {
    // Do nothing
  }
}
