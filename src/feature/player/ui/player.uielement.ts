import { pageHeader } from '@/util';
import { statsCard } from '@/util/stats-card';
import {
  Col,
  collection,
  Container,
  Datatable,
  DefaultProps,
  documents,
  formatCurrency,
  formatPercent,
  formatTemplate,
  Fragment,
  isBusy,
  path,
  Row,
  Rpc,
  Span,
  sum,
  UiElement,
} from '@earnkeeper/ekp-sdk';
import raceUi from '../../race/ui/race.uielement';
import { PegaDocument } from './pega.document';
export default function element(): UiElement {
  return Container({
    children: [
      titleRow(),
      Tabs({
        children: [
          {
            label: 'Pegas',
            children: [statsRow(), tableRow()],
          },
          {
            label: 'Races',
            children: [raceUi()],
          },
        ],
      }),
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
              pageHeader('user', 'Player Info'),
              Span({
                className: 'mb-2',
                content: `${path(PegaDocument)}.0.playerAddress`,
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
            width: '100px',
          },
          {
            id: 'name',
            sortable: true,
            searchable: true,
            minWidth: '300px',
          },
          {
            id: 'cost',
            title: 'Cost',
            sortable: true,
            format: formatCurrency('$.cost', '$.fiatSymbol'),
            width: '120px',
            right: true,
          },
          {
            id: 'marketValue',
            title: 'Value',
            sortable: true,
            format: formatCurrency('$.marketValue', '$.fiatSymbol'),
            width: '120px',
            right: true,
          },
          {
            id: 'placeRate',
            title: 'Places',
            sortable: true,
            format: formatPercent('$.placeRate'),
            width: '120px',
            right: true,
          },
          {
            id: 'totalRaces',
            title: 'Races',
            sortable: true,
            width: '120px',
            right: true,
          },
          {
            id: 'earned',
            title: 'Earned',
            sortable: true,
            width: '120px',
            format: formatCurrency('$.earned', '$.fiatSymbol'),
            right: true,
          },
        ],
      }),
    ],
  });
}

export function Tabs(props: TabsProps): UiElement {
  return {
    _type: 'Tabs',
    props: props,
  };
}

export interface TabsProps extends DefaultProps {
  readonly children: Tab[];
}

export type Tab = Readonly<{
  label: string | Rpc;
  children: UiElement[];
}>;
