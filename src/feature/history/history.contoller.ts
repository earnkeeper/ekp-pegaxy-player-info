import {
  ClientConnectedEvent,
  ClientDisconnectedEvent,
  ClientStateChangedEvent,
  collection,
  RpcEvent,
} from '@earnkeeper/ekp-sdk';
import {
  AbstractController,
  ApmService,
  ClientService,
  logger,
} from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryDocument } from './ui/history.document';

import  race from './ui/history.uielement';

const COLLECTION_NAME = collection(HistoryDocument);
const PATH = 'history';

@Injectable()
export class HistoryController extends AbstractController {
  constructor(
    clientService: ClientService,
    private historyService: HistoryService,
    private apmService: ApmService,
  ) {
    super(clientService);
  }

  async onClientConnected(event: ClientConnectedEvent) {
    await this.clientService.emitMenu(event, {
      id: PATH,
      title: 'Player History',
      navLink: PATH,
      icon: 'cil-history',
    });

    await this.clientService.emitPage(event, {
      id: PATH,
      element: race(),
    });
  }

  async onClientRpc(event: RpcEvent) {
    // Do nothing
  }

  async onClientStateChanged(event: ClientStateChangedEvent) {
    if (PATH !== event?.state?.client?.path) {
      return;
    }

    await this.clientService.emitBusy(event, COLLECTION_NAME);

    try {
      const documents = await this.historyService.getHistoryDocument();

      this.clientService.emitDocuments(event, COLLECTION_NAME, documents);
    } catch (error) {
      this.apmService.captureError(error);
      logger.error('Error occurred while handling event', error);
      console.error(error);
    } finally {
      await this.clientService.emitDone(event, COLLECTION_NAME);
    }
  }

  async onClientDisconnected(event: ClientDisconnectedEvent) {
    // Do nothing
  }
}
