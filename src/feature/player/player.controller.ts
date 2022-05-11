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
import { PlayerService } from './player.service';
import { PegaDocument } from './ui/pega.document';
import page from './ui/player.uielement';

const COLLECTION_NAME = collection(PegaDocument);
const PATH = 'player';

@Injectable()
export class PlayerController extends AbstractController {
  constructor(
    clientService: ClientService,
    private playerService: PlayerService,
  ) {
    super(clientService);
  }

  async onClientConnected(event: ClientConnectedEvent) {
    await this.clientService.emitPage(event, {
      id: `${PATH}/:playerAddress`,
      element: page(),
    });
  }

  async onClientStateChanged(event: ClientStateChangedEvent) {
    if (!event.state.client?.path?.startsWith(`${PATH}/`)) {
      return;
    }

    try {
      await this.clientService.emitBusy(event, COLLECTION_NAME);

      const currency = event.state.client.selectedCurrency;

      const playerAddress = event.state.client.path.replace(`${PATH}/`, '');

      const documents = await this.playerService.fetchDocuments(currency);

      await this.clientService.emitDocuments(event, COLLECTION_NAME, documents);
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
