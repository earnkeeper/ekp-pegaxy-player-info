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
import { RaceService } from './race.service';
import { RaceDocument } from './ui/race.document';
import page from './ui/race.uielement';

const COLLECTION_NAME = collection(RaceDocument);
const PATH = 'race';

@Injectable()
export class RaceController extends AbstractController {
  constructor(clientService: ClientService, private raceService: RaceService) {
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

      const documents = await this.raceService.fetchDocuments(
        currency,
        playerAddress,
      );

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
