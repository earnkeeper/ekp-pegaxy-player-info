import { pageHeader } from '@/util';
import { statsCard } from '@/util/stats-card';
import { formHelper } from '@/util/ui/form-helper';
import {
  Col,
  collection,
  Container,
  Datatable,
  documents,
  formatCurrency,
  Fragment,
  isBusy,
  path,
  Row,
  Span,
  sum,
  UiElement,
} from '@earnkeeper/ekp-sdk';
import { RaceDocument } from './race.document';
export default function element(): UiElement {
  return Container({
    children: [titleRow(), statsRow(), tableRow()],
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
                content: `${path(RaceDocument)}.0.playerAddress`,
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
            'Total Earned',
            formatCurrency(
              sum(`${path(RaceDocument)}.*.earned`),
              `${path(RaceDocument)}.0.fiatSymbol`,
            ),
          ),
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
        defaultSortAsc: false,
        data: documents(RaceDocument),
        showExport: true,
        showLastUpdated: true,
        busyWhen: isBusy(collection(RaceDocument)),
        columns: [
          {
            id: 'raceDate',
            title: 'Date',
            sortable: true,
            searchable: true,
            width: '180px',
          },
          {
            id: 'raceId',
            title: 'Race',
            sortable: true,
            searchable: true,
            width: '150px',
          },
          {
            id: 'position',
            title: 'Position',
            sortable: true,
            grow: 0,
            width: '100px',
          },
          {
            id: 'earned',
            title: 'Total Earned',
            sortable: true,
            right: true,
            width: '100px',
            format: formatCurrency('$.earned', '$.fiatSymbol'),
          },
          {
            id: 'class',
            sortable: true,
            grow: 0,
            width: '100px',
          },
          {
            id: 'distance',
            sortable: true,
            right: true,
            width: '100px',
          },
        ],
      }),
    ],
  });
}
