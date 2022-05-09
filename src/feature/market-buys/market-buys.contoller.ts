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
import { MarketBuysService } from './market-buys.service';
import { MarketBuysDocument } from './ui/market-buys.document';
import card from './ui/market-buys.uielement';

const COLLECTION_NAME = collection(MarketBuysDocument);
const PATH = 'market';

@Injectable()
export class MarketBuysController extends AbstractController {
  constructor(
    clientService: ClientService,
    private marketBuysService: MarketBuysService,
    private apmService: ApmService,
  ) {
    super(clientService);
  }

  async onClientConnected(event: ClientConnectedEvent) {
    await this.clientService.emitMenu(event, {
      id: PATH,
      title: 'Market Buys',
      navLink: PATH,
      icon: 'cil-cart',
    });

    await this.clientService.emitPage(event, {
      id: PATH,
      element: card(),
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
      const documents = await this.marketBuysService.fetchMarketDocument();

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
