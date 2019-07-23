import { expect, stub } from './utils';
import { TemplateResult } from 'lit-element';
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

      expect(addEventListener).to.be.calledWith(SAYT_EVENT.SAYT_SHOW, sayt.showSayt);
      expect(addEventListener).to.be.calledWith(SAYT_EVENT.SAYT_HIDE, sayt.hideSayt);
    });
  });


  describe('disconnectedCallback()', () => {
    it('should remove event listeners on the window', () => {
      const removeEventListener = stub(window, 'removeEventListener');

      sayt.disconnectedCallback();

      expect(removeEventListener).to.be.calledWith(SAYT_EVENT.SAYT_SHOW, sayt.showSayt);
      expect(removeEventListener).to.be.calledWith(SAYT_EVENT.SAYT_HIDE, sayt.hideSayt);
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

  describe('showSayt()', () => {
    it('should set the visible prop to true', () => {
      sayt.visible = false;

      sayt.showSayt();

      expect(sayt.visible).to.be.true;
    });
  });

  describe('hideSayt()', () => {
    it('should set the visible prop to false', () => {
      sayt.hidden = false;
      sayt.visible = true;

      sayt.hideSayt();

      expect(sayt.visible).to.be.false;
    });
  });

  describe('render', () => {
    it('should return an instance of TemplateResult', () => {
      const result = sayt.render();

      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });
});
