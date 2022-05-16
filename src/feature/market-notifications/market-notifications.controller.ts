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
import { MarketNotificationsService } from './market-notifications.service';
import { MarketNotificationDocument } from './ui/market-notifications.document';
import page from './ui/market-notifications.uielement';

const COLLECTION_NAME = collection(MarketNotificationDocument);
const PATH = 'market-notifications';

@Injectable()
export class MarketNotificationsController extends AbstractController {
  constructor(
    clientService: ClientService,
    private marketNotificationsService: MarketNotificationsService,
    private apmService: ApmService,
  ) {
    super(clientService);
  }

  async onClientConnected(event: ClientConnectedEvent) {
    await this.clientService.emitMenu(event, {
      id: PATH,
      title: 'Market Notifications',
      navLink: PATH,
      icon: 'bell',
    });

    await this.clientService.emitPage(event, {
      id: PATH,
      element: page(),
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

    // @ts-ignore
    const connectedAddress = event.state.client.connectedAddress;

    await this.clientService.emitBusy(event, COLLECTION_NAME);

    try {
      const documents = await this.marketNotificationsService.getDocuments(
        connectedAddress,
        currency,
      );

      await this.clientService.emitDocuments(event, COLLECTION_NAME, documents);
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
