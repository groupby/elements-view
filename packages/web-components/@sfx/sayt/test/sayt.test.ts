import { expect, spy, stub } from './utils';
import Sayt from '../src/sayt';
import { SAYT_EVENT } from '../src/events';

describe('Sayt Component', () => {
  let sayt;

  beforeEach(() => {
    sayt = new Sayt();
  });

  describe('connectedCallback()', () => {
    it('should register event listeners to the window', () => {
      const addEventListener = stub(window, 'addEventListener');

      sayt.connectedCallback();

      expect(addEventListener).to.be.calledWith(SAYT_EVENT.SAYT_SHOW, sayt.handleVisibilityEvent);
      expect(addEventListener).to.be.calledWith(SAYT_EVENT.SAYT_HIDE, sayt.handleVisibilityEvent);
    });
  });


  describe('disconnectedCallback()', () => {
    it('should remove event listeners on the window', () => {
      const removeEventListener = stub(window, 'removeEventListener');

      sayt.disconnectedCallback();

      expect(removeEventListener).to.be.calledWith(SAYT_EVENT.SAYT_SHOW, sayt.handleVisibilityEvent);
      expect(removeEventListener).to.be.calledWith(SAYT_EVENT.SAYT_HIDE, sayt.handleVisibilityEvent);
    });
  });

  describe('updated()', () => {
    it('should change the hidden property if the visible property has changed', () => {
      sayt.hidden = true;
      sayt.visible = true;

      sayt.updated(new Map([['visible', true]]));

      expect(sayt.hidden).to.be.false;
    });
  });

  describe('handleVisibilityEvent()', () => {
    it('should set the visible prop to true when receiving a SAYT_SHOW event', () => {
      const dispatchedEvent = new CustomEvent(SAYT_EVENT.SAYT_SHOW, { detail: 'test' });

      sayt.handleVisibilityEvent(dispatchedEvent);

      expect(sayt.visible).to.be.true;
    });

    it('should set the visible prop to false when receiving a SAYT_HIDE event', () => {
      const dispatchedEvent = new CustomEvent(SAYT_EVENT.SAYT_HIDE, { detail: 'test' });
      sayt.hidden = false;
      sayt.visible = true;

      sayt.handleVisibilityEvent(dispatchedEvent);

      expect(sayt.visible).to.be.false;
    });
  });

  describe('render()', () => {
    it('should call a render function', () => {
      const renderStub = stub(sayt, 'render').returns('component has rendered');
      expect(sayt.render()).to.equal('component has rendered');
      expect(renderStub).to.be.calledOnce;
    });
  });
});
