import { pageHeader } from '@/util';
import { statsCard } from '@/util/stats-card';
import { formHelper } from '@/util/ui/form-helper';
import {
  Button,
  Card,
  Col,
  collection,
  commify,
  Container,
  Datatable,
  documents,
  formatCurrency,
  formatTimeToNow,
  Fragment,
  isBusy,
  path,
  removeFormRecord,
  Row,
  Span,
  sum,
  UiElement,
} from '@earnkeeper/ekp-sdk';
import { PlayerDocument } from './player.document';
export default function element(): UiElement {
  return Container({
    children: [titleRow(), statsRow(), formRow(), tableRow()],
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
            children: [pageHeader('user', 'Player Stats')],
          }),
        ],
      }),
    ],
  });
}

function statsRow() {
  return Row({
    className: 'mt-2',
    context: `${path(PlayerDocument)}[0]`,
    children: [
      Col({
        className: 'col-auto',
        children: [statsCard('Total Cost', formatCurrency(sum('$.cost'), '$.fiatSymbol'))],
      }),
      Col({
        className: 'col-auto',
        children: [
          statsCard('Total Market Value', formatCurrency(sum('$.marketValue'), '$.fiatSymbol')),
        ],
      }),
      Col({
        className: 'col-auto',
        children: [
          statsCard('Total Earned in 24H', formatCurrency(sum('$.earnedLast24Hours'), '$.fiatSymbol')),
        ],
      }),
    ],
  });
}

function formRow() {
  return formHelper({
    name: 'players',
    busyWhen: isBusy(collection(PlayerDocument)),
    fields: [
      {
        label: 'Player Address',
        name: 'address',
        type: 'string',
        width: '400px',
      },
    ],
    buttonLabel: 'Add',
    multiRecord: {
      idField: 'address',
    },
  });
}

export function tableRow() {
  return Fragment({
    children: [
      Datatable({
        defaultSortFieldId: 'timestamp',
        defaultSortAsc: false,
        data: documents(PlayerDocument),
        showExport: true,
        showLastUpdated: true,
        busyWhen: isBusy(collection(PlayerDocument)),
        columns: [
          {
            id: 'address',
            sortable: true,
            searchable: true,
          },
          {
            id: 'earnVisFiat',
            title: 'Earned',
            sortable: true,
            grow: 0,
            format: formatCurrency('$.earnedVisFiat', '$.fiatSymbol'),
          },
          {
            id: 'pegasOwned',
            title: 'Pegas',
            sortable: true,
            right: true,
            grow: 0,
          },
          {
            id: 'cost',
            title: 'Cost',
            sortable: true,
            width:'80px',
            format: formatCurrency('$.cost', '$.fiatSymbol'),
          },
        
          {
            id: 'marketValue',
            title: 'Market Value',
            sortable: true,
            width: '80px',
            format: formatCurrency('$.marketValue', '$.fiatSymbol'),
          },
          {
            id: 'earnedLast24Hours',
            title: 'Earned 24H',
            sortable: true,
            width: '80px',
            format: formatCurrency('$.earnedLast24Hours', '$.fiatSymbol'),
          },
          {
            id: 'actions',
            width: '60px',
            title: '',
            cell: Button({
              icon: 'cil-delete',
              size: 'sm',
              color: 'flat-primary',
              onClick: removeFormRecord('players', 'address', '$.address'),
              tooltip: 'Remove player',
            }),
          },
        ],
      }),
    ],
  });
}

