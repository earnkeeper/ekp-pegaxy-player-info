import { Col, Row } from '@earnkeeper/ekp-sdk';
import { pageHeader } from './page-header';

export function titleRow(iconName: string, title: string) {
  return Row({
    className: 'mb-2',
    children: [
      Col({
        className: 'col-auto',
        children: [pageHeader(iconName, title)],
      }),
    ],
  });
}
