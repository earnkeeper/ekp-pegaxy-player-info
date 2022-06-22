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
import { RaceService } from '../race/race.service';
import { RaceDocument } from '../race/ui/race.document';

import page from './ui/player.uielement';

const PEGA_COLLECTION_NAME = collection(PegaDocument);
const RACE_COLLECTION_NAME = collection(RaceDocument);
const PATH = 'player';

@Injectable()
export class PlayerController extends AbstractController {
  constructor(
    clientService: ClientService,
    private playerService: PlayerService,
    private raceService: RaceService,
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
      await this.clientService.emitBusy(event, PEGA_COLLECTION_NAME);
      await this.clientService.emitBusy(event, RACE_COLLECTION_NAME);

      const currency = event.state.client.selectedCurrency;

      const playerAddress = event.state.client.path.replace(`${PATH}/`, '');

      const pegaDocuments = await this.playerService.fetchDocuments(
        currency,
        playerAddress,
      );

      const raceDocuments = await this.raceService.fetchDocuments(
        currency,
        playerAddress,
      );

      await this.clientService.emitDocuments(event, PEGA_COLLECTION_NAME, pegaDocuments);
      await this.clientService.emitDocuments(event, RACE_COLLECTION_NAME, raceDocuments);
    } catch (error) {
      logger.error('Error occurred while handling event', error);
      console.error(error);
    } finally {
      await this.clientService.emitDone(event, PEGA_COLLECTION_NAME);
      await this.clientService.emitDone(event, RACE_COLLECTION_NAME);
    }
  }

  async onClientDisconnected(event: ClientDisconnectedEvent) {
    // Do nothing
  }

  async onClientRpc(event: RpcEvent) {
    // Do nothing
  }
}
