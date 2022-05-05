import {
  Button,
  Card,
  Col,
  collection,
  Container,
  Datatable,
  documents,
  Fragment,
  GridTile,
  Image,
  Input,
  isBusy,
  PageHeaderTile,
  Row,
  Span,
  UiElement,
} from '@earnkeeper/ekp-sdk';
import { imageLabelCell } from '../../../util/ui/imageLabelCell';
import { InfoDocument } from './info.document';
export default function element(): UiElement {
  return Container({
    children: [
      titleRow(),
      Span({
        className: 'd-block mt-1 mb-2',
        content: 'Player Identity',
      }),
      tableRow(),
    ],
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
            children: [
              PageHeaderTile({
                title: 'Player Info',
                icon: 'cil-info',
              }),
            ],
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
        defaultSortFieldId: 'name',
        data: documents(InfoDocument),
        pointerOnHover: true,
        showExport: true,
        showLastUpdated: true,
        busyWhen: isBusy(collection(InfoDocument)),
        defaultView: {
          xs: 'grid',
          lg: 'column',
        },
        gridView: {
          tileWidth: [12, 6, 4, 3],
          tile: GridTile({
            image: Image({
              className: 'card-img-top',
              src: '$.cardArtUrl',
            }),
            details: [
              {
                label: 'Name',
                value: '$.name',
              },
              {
                label: 'God',
                value: '$.god',
              },
              {
                label: 'Rarity',
                value: '$.rarity',
              },
              {
                label: 'Mana',
                value: '$.mana',
              },
              {
                label: 'Type',
                value: '$.type',
              },
              {
                label: 'Set',
                value: '$.set',
              },
            ],
          }),
        },

        columns: [
          {
            id: 'name',
            searchable: true,
            sortable: true,
            cell: imageLabelCell('$.cardArtUrl', '$.name'),
          },
          {
            id: 'god',
            sortable: true,
            width: '140px',
          },
          {
            id: 'rarity',
            sortable: true,
            width: '140px',
          },
          {
            id: 'set',
            sortable: true,
            width: '140px',
          },
          {
            id: 'type',
            sortable: true,
            width: '140px',
          },
          {
            id: 'mana',
            sortable: true,
            width: '80px',
          },
          {
            id: 'health',
            sortable: true,
            width: '80px',
          },
          {
            id: 'attack',
            sortable: true,
            width: '80px',
          },
        ],
      }),
    ],
  });
}
