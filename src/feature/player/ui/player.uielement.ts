import { pageHeader } from '@/util';
import { statsCard } from '@/util/stats-card';
import { formHelper } from '@/util/ui/form-helper';
import {
  Button,
  Col,
  collection,
  Container,
  Datatable,
  documents,
  formatCurrency,
  formatPercent,
  formatTemplate,
  Fragment,
  isBusy,
  path,
  Row,
  Span,
  sum,
  UiElement,
} from '@earnkeeper/ekp-sdk';
import { PegaDocument } from './pega.document';
export default function element(): UiElement {
  return Container({
    children: [titleRow(),statsRow(), formRow(), tableRow()],
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
function statsRow() {
  return Row({
    className: 'mt-2',
    children: [
      Col({
        className: 'col-auto',
        children: [
          statsCard(
            'Total Cost',
            formatCurrency(
              sum(`${path(PegaDocument)}.*.cost`),
              `${path(PegaDocument)}.0.fiatSymbol`,
            ),
          ),
        ],
      }),
      Col({
        className: 'col-auto',
        children: [
          statsCard(
            'Total Market Value ',
            formatCurrency(
              sum(`${path(PegaDocument)}.*.marketValue`),
              `${path(PegaDocument)}.0.fiatSymbol`,
            ),
          ),
        ],
      }),
      Col({
        className: 'col-auto',
        children: [
          statsCard(
            'Total Earned',
            formatCurrency(
              sum(`${path(PegaDocument)}.*.earned`),
              `${path(PegaDocument)}.0.fiatSymbol`,
            ),
          ),
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
            id: 'pegaId',
            title: 'Id',
            sortable: true,
            searchable: true,
            format: formatTemplate('#{{ id }}', { id: '$.pegaId' }),
            width:'100px',
          },
          {
            id: 'name',
            sortable: true,
            searchable: true,
            width:'200px',
          },
          {
            id: 'cost',
            title: 'Cost',
            sortable: true,
            format: formatCurrency('$.cost', '$.fiatSymbol'),
            width:'120px',
          },
          {
            id: 'marketValue',
            title: 'Market Value',
            sortable: true,
            format: formatCurrency('$.marketValue', '$.fiatSymbol'),
            width:'120px',
          },
          {
            id: 'placeRate',
            title: 'Place Rate',
            sortable: true,
            format: formatPercent('$.placeRate'),
            width:'120px',
          },
          {
            id: 'totalRaces',
            title: 'Total Races',
            sortable: true,
            width:'120px',
          },
          {
            id: 'earned',
            title: 'Total Earned',
            sortable: true,
            width:'120px',
            format: formatCurrency('$.earned', '$.fiatSymbol'),
          },
        ],
      }),
    ],
  });
}
