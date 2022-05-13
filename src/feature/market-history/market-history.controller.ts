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
import _ from 'lodash';
import { MarketHistoryService } from './market-history.service';
import { MarketHistoryDocument } from './ui/market-history.document';
import card from './ui/market-history.uielement';

const COLLECTION_NAME = collection(MarketHistoryDocument);
const CHART_COLLECTION_NAME = 'PegaxyMarketChart';
const PATH = 'market';

@Injectable()
export class MarketHistoryController extends AbstractController {
  constructor(
    clientService: ClientService,
    private marketBuysService: MarketHistoryService,
    private apmService: ApmService,
  ) {
    super(clientService);
  }

  async onClientConnected(event: ClientConnectedEvent) {
    await this.clientService.emitMenu(event, {
      id: PATH,
      title: 'Market History',
      navLink: PATH,
      icon: 'bar-chart-2',
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

    const currency = event.state.client.selectedCurrency;

    await this.clientService.emitBusy(event, COLLECTION_NAME);

    try {
      const documents = await this.marketBuysService.fetchMarketDocuments(
        currency,
      );

      await this.clientService.emitDocuments(
        event,
        COLLECTION_NAME,
        _.chain(documents)
          .filter((it) => !!it.pegaName)
          .slice(0, 100)
          .value(),
      );

      const chartDocuments = await this.marketBuysService.fetchMarketHistogram(
        documents,
      );

      await this.clientService.emitDocuments(
        event,
        CHART_COLLECTION_NAME,
        chartDocuments,
      );
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
