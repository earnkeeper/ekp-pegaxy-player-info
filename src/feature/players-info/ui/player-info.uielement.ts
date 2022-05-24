import { pageHeader } from '@/util';
import {
  Button,
  Col,
  collection,
  Container,
  Datatable,
  documents,
  formatCurrency,
  formatTemplate,
  Fragment,
  isBusy,
  navigate,
  path,
  removeFormRecord,
  Row,
  sum,
  UiElement,
} from '@earnkeeper/ekp-sdk';
import { PlayerInfoDocument } from './player-info.document';
export default function element(): UiElement {
  return Container({
    children: [titleRow()],
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
            children: [pageHeader('Player Info', 'Player Info')],
          }),
        ],
      }),
    ],
  });
}

