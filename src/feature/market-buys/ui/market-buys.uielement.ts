import { pageHeader } from '@/util';
import {
  Card,
  Col,
  collection,
  Container,
  Datatable,
  documents,
  Fragment,
  GridTile,
  Image,
  isBusy,
  Row,
  Span,
  UiElement,
} from '@earnkeeper/ekp-sdk';
import { imageLabelCell } from '../../../util/ui/image-label-cell';
import { MarketBuyDocument } from './market-buys.document';
export default function element(): UiElement {
  return Container({
    children: [titleRow(), cardsRow(), tableRow()],
  });
}

function titleRow() {
  return Fragment({
    children: [
      Row({
        className: 'mb-2',
        children: [
          Col({
            className: 'col-auto',
            children: [pageHeader('cil-cart', 'Market Buys')],
          }),
        ],
      }),
    ],
  });
}
function cardsRow() {
  return Card({
    className: 'mt-2',
    children: [
      Col({
        className: 'col-4 col-md-auto',
        children: [
          Span({
            className: 'd-block mt-1 mb-2',
            content: 'Volume Chart',
          }),
        ],
      }),
    ],
  });
}

export function tableRow() {
  return Fragment({
    children: [
      Datatable({
        defaultSortFieldId: 'timestamp',
        data: documents(MarketBuyDocument),
        pointerOnHover: true,
        showExport: true,
        showLastUpdated: true,
        busyWhen: isBusy(collection(MarketBuyDocument)),
        defaultView: {
          xs: 'grid',
          lg: 'column',
        },
        gridView: {
          tileWidth: [12, 6, 4, 3],
          tile: GridTile({
            details: [
              {
                label: 'Timestamp',
                value: '$.timestamp',
              },
              {
                label: 'Pega Name',
                value: '$.pegaName',
              },
              {
                label: 'Buyer',
                value: '$.buyer',
              },
              {
                label: 'Pega ID',
                value: '$.pegaId',
              },
              {
                label: 'price Fiat',
                value: '$.priceFiat',
              }
            ],
          }),
        },

        columns: [
          {
            id: 'timestamp',
            sortable: true,
            width: '140px',
          },
          {
            id: 'pegaName',
            sortable: true,
            width: '140px',
          },
          {
            id: 'buyer',
            sortable: true,
            width: '400px',
          },
          {
            id: 'pegaId',
            sortable: true,
            width: '100px',
          },
          {
            id: 'priceFiat',
            sortable: true,
            width: '140px',
          },
         
        ],
      }),
    ],
  });
}
