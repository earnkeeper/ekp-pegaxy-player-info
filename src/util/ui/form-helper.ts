import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Rpc,
  Select,
} from '@earnkeeper/ekp-sdk';
import _ from 'lodash';

export interface FormHelperProps {
  readonly buttonLabel: string;
  readonly busyWhen: Rpc;
  readonly defaultValue?: any;
  readonly fields: any[];
  readonly multiRecord?: { idField: string };
  readonly name: string;
}

export function formHelper(props: FormHelperProps) {
  const properties = {};
  const fields = props.fields;

  for (const field of fields) {
    properties[field.name] = field.type;
  }

  const cols = _.chain(fields)
    .map((field) => {
      if (field.uielement === 'select') {
        return Select({
          label: field.label,
          name: field.name,
          options: field.options,
          minWidth: field.minWidth,
        });
      } else {
        return Input({
          label: field.label,
          name: field.name,
        });
      }
    })
    .push(
      Button({
        label: props.buttonLabel,
        isSubmit: true,
        busyWhen: props.busyWhen,
      }),
    )
    .map((component) =>
      Col({
        className: 'col-12 col-md-auto my-auto',
        children: [component],
      }),
    )
    .value();

  return Form({
    name: props.name,
    schema: {
      type: 'object',
      properties: properties,
      default: props.defaultValue,
    },
    multiRecord: props.multiRecord,
    children: [
      Row({
        className: 'mb-1',
        children: cols,
      }),
    ],
  });
}
