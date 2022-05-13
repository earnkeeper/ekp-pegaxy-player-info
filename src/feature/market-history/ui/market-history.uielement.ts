import { pageHeader } from '@/util';
import {
  Badge,
  Col,
  collection,
  Container,
  Datatable,
  DefaultProps,
  documents,
  formatAge,
  formatCurrency,
  formatMaskAddress,
  formatTemplate,
  Fragment,
  isBusy,
  jsonArray,
  Row,
  Rpc,
  Span,
  UiElement,
} from '@earnkeeper/ekp-sdk';
import { MarketHistoryDocument } from './market-history.document';
export default function element(): UiElement {
  return Container({
    children: [titleRow(), chartRow(), tableRow()],
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
            children: [pageHeader('bar-chart-2', 'Market History')],
          }),
        ],
      }),
    ],
  });
}
function chartRow() {
  return Chart({
    title: 'Price & Volume History',
    height: 200,
    type: 'line',
    data: documents('PegaxyMarketChart'),
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: { show: false },
        type: 'datetime',
      },
      yaxis: [
        {
          labels: { show: false },
        },
        {
          labels: { show: false },
          opposite: true,
        },
      ],
      labels: {
        method: 'map',
        params: [jsonArray('$.PegaxyMarketChart.*'), '$.timestamp'],
      },
      stroke: {
        width: [0, 4],
        curve: 'smooth',
      },
    },
    series: [
      {
        name: 'Volume',
        type: 'column',
        data: {
          method: 'map',
          params: [jsonArray('$.PegaxyMarketChart.*'), '$.count'],
        },
      },
      {
        name: 'Price',
        type: 'line',
        data: {
          method: 'map',
          params: [jsonArray('$.PegaxyMarketChart.*'), '$.price'],
        },
      },
    ],
  });
}

export function tableRow() {
  return Fragment({
    children: [
      Datatable({
        defaultSortFieldId: 'timestamp',
        defaultSortAsc: false,
        data: documents(MarketHistoryDocument),
        showExport: true,
        showLastUpdated: true,
        busyWhen: isBusy(collection(MarketHistoryDocument)),
        columns: [
          {
            id: 'timestamp',
            sortable: true,
            width: '140px',
            format: formatAge('$.timestamp'),
          },
          {
            id: 'pegaId',
            title: 'Id',
            format: formatTemplate('#{{ id }}', { id: '$.pegaId' }),
            width: '130px',
            sortable: true,
            searchable: true,
          },
          {
            id: 'pegaName',
            title: 'Name',
            sortable: true,
            width: '300px',
          },
          {
            id: 'buyer',
            sortable: true,
            format: formatMaskAddress('$.buyer'),
            width: '160px',
          },
          {
            id: 'priceFiat',
            title: 'Cost',
            sortable: true,
            format: formatCurrency('$.priceFiat', '$.fiatSymbol'),
          },
          {
            id: 'bloodline',
            sortable: true,
            searchable: true,
          },
          {
            id: 'breedType',
            title: 'breed',
            sortable: true,
            searchable: true,
          },
          {
            id: 'gender',
            sortable: true,
            searchable: true,
          },
        ],
      }),
    ],
  });
}

function Chart(props?: ChartProps): UiElement {
  return {
    _type: 'Chart',
    props,
  };
}

type ChartProps = Readonly<{
  title: string;
  type?: string;
  height?: number;
  busyWhen?: Rpc;
  data?: Rpc;
  series: SeriesProp[];
  options?: any;
}> &
  DefaultProps;

type SeriesProp = Readonly<{
  name: string | Rpc;
  type?: string;
  data: Rpc;
}>;
