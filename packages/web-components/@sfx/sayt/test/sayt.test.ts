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
    it('should change the hidden property if the show property has changed', () => {
      sayt.hidden = true;
      sayt.show = true;

      sayt.updated(new Map([['show', false]]));

      expect(sayt.hidden).to.equal(false);
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
