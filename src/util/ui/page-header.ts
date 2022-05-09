import { Col, Icon, Row, Span } from '@earnkeeper/ekp-sdk';

export function pageHeader(iconName: string, title: string) {
  return Row({
    className: 'mb-2',
    children: [
      Col({
        className: 'col-auto my-auto',
        children: [
          Icon({
            name: iconName,
          }),
        ],
      }),
      Col({
        className: 'col-auto my-auto pl-0',
        children: [
          Span({
            className: 'font-medium-5',
            content: title,
          }),
        ],
      }),
    ],
  });
}
