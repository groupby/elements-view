// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { Base } from '@sfx/base';
import {
  customElement,
} from 'lit-element';

@customElement('dummy-component')
export default class DummyComponent extends Base {
  constructor() {
    super();
  }
}

export { DummyComponent };
