// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import {
  customElement,
} from 'lit-element';
import Base from '../../src/base';

@customElement('dummy-component')
export default class DummyComponent extends Base {}

export { DummyComponent };
