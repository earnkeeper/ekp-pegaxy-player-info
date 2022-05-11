import { pageHeader } from '@/util';
import {
  Col,
  collection,
  Container,
  Datatable,
  DefaultProps,
  documents,
  formatAge,
  formatCurrency,
  formatTemplate,
  Fragment,
  Image,
  isBusy,
  jsonArray,
  Row,
  Rpc,
  Span,
  UiElement,
} from '@earnkeeper/ekp-sdk';
import { MarketBuyDocument } from './market-buys.document';
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
        data: documents(MarketBuyDocument),
        showExport: true,
        showLastUpdated: true,
        busyWhen: isBusy(collection(MarketBuyDocument)),
        columns: [
          {
            id: 'timestamp',
            sortable: true,
            width: '140px',
            format: formatAge('$.timestamp'),
          },
          {
            id: 'pegaName',
            sortable: true,
            width: '300px',
            cell: Row({
              children: [
                Col({
                  className: 'col-auto pr-0',
                  children: [
                    Image({
                      height: '32px',
                      src: formatTemplate(
                        'https://cdn.pegaxy.io/data/pega/{{ pegaAvatarId }}',
                        { pegaAvatarId: '$.pegaAvatarId' },
                      ),
                    }),
                  ],
                }),
                Col({
                  className: 'col-auto my-auto font-medium-1',
                  children: [Span({ content: '$.pegaName' })],
                }),
              ],
            }),
          },
          {
            id: 'buyer',
            sortable: true,
          },
          {
            id: 'pegaId',
            sortable: true,
            width: '100px',
            right: true,
          },
          {
            id: 'priceFiat',
            sortable: true,
            width: '140px',
            right: true,
            format: formatCurrency('$.priceFiat', '$.fiatSymbol'),
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
