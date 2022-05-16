import { titleRow } from '@/util/ui/title-row';
import { Container, UiElement } from '@earnkeeper/ekp-sdk';

export default function element(): UiElement {
  return Container({
    children: [titleRow('bell', 'Market Notifications')],
  });
}
