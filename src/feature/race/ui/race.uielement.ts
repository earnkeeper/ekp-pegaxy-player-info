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
  Row,
  Span,
  UiElement,
} from '@earnkeeper/ekp-sdk';
import { RaceDocument } from './race.document';
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
            children: [
              pageHeader('user', 'Player Info'),
              Span({
                className: 'mb-2',
                content: '0xd68962B0084596A00a227dFCC56A8245aA0679b1',
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function formRow() {
  return formHelper({
    name: 'players',
    busyWhen: isBusy(collection(RaceDocument)),
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
        data: documents(RaceDocument),
        showExport: true,
        showLastUpdated: true,
        busyWhen: isBusy(collection(RaceDocument)),
        columns: [
          {
            id: 'address',
            sortable: true,
            searchable: true,
            width:'150px',
          },
          {
            id: 'name',
            sortable: true,
            searchable: true,
            width:'150px',
          },
          {
            id: 'cost',
            title: 'Cost',
            sortable: true,
            grow: 0,
            format: formatCurrency('$.cost', '$.fiatSymbol'),
            width:'100px',
          },
          {
            id: 'marketValue',
            title: 'Market Value',
            sortable: true,
            grow: 0,
            format: formatCurrency('$.marketValue', '$.fiatSymbol'),
            width:'100px',
          },
          {
            id: 'placeRate',
            title: 'Place Rate',
            sortable: true,
            right: true,
            width:'150px',
          },
          {
            id: 'totalRaces',
            title: 'Total Races',
            sortable: true,
            right: true,
            width:'100px',
          },
          {
            id: 'earned',
            title: 'Total Earned',
            sortable: true,
            right: true,
            width:'100px',
            format: formatCurrency('$.earned', '$.fiatSymbol'),
          },
        ],
      }),
    ],
  });
}
