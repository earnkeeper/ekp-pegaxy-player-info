import { pageHeader } from '@/util';
import { formHelper } from '@/util/ui/form-helper';
import {
  Button,
  Col,
  collection,
  Container,
  Datatable,
  documents,
  formatCurrency,
  Fragment,
  isBusy,
  removeFormRecord,
  Row,
  UiElement,
} from '@earnkeeper/ekp-sdk';
import { PegaDocument } from './pega.document';
export default function element(): UiElement {
  return Container({
    children: [titleRow(), formRow(), tableRow()],
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

function formRow() {
  return formHelper({
    name: 'players',
    busyWhen: isBusy(collection(PegaDocument)),
    fields: [
      {
        label: 'Player Address',
        name: 'address',
        type: 'string',
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
        data: documents(PegaDocument),
        showExport: true,
        showLastUpdated: true,
        busyWhen: isBusy(collection(PegaDocument)),
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
