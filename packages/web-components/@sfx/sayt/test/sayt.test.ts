import { expect, spy, stub } from './utils';
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
      expect(addEventListener).to.be.calledWith('click', sayt.processClick);
      expect(addEventListener).to.be.calledWith('keypress', sayt.processKeyPress);
    });
  });


  describe('disconnectedCallback()', () => {
    it('should remove event listeners on the window', () => {
      const removeEventListener = stub(window, 'removeEventListener');

      sayt.disconnectedCallback();

      expect(removeEventListener).to.be.calledWith(SAYT_EVENT.SAYT_SHOW, sayt.showSayt);
      expect(removeEventListener).to.be.calledWith(SAYT_EVENT.SAYT_HIDE, sayt.hideSayt);
      expect(removeEventListener).to.be.calledWith('click', sayt.processClick);
      expect(removeEventListener).to.be.calledWith('keypress', sayt.processKeyPress);
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

  describe('hideCorrectSayt()', () => {
    it('should call hideSayt() when provided ID matches stored searchbar ID', () => {
      const hideSayt = stub(sayt, 'hideSayt');
      const searchbar = sayt.searchbar = 'some-searchbar-id'
      const event = { detail: { searchbar } };

      sayt.hideCorrectSayt(event);

      expect(hideSayt).to.be.calledOnce;
    });

    it('should call hideSayt() when no searchbar ID is provided', () => {
      const hideSayt = stub(sayt, 'hideSayt');
      const event = { detail: {} };

      sayt.hideCorrectSayt(event);

      expect(hideSayt).to.be.calledOnce;
    });

    it('should not call hideSayt() when the wrong searchbar ID is provided', () => {
      const hideSayt = stub(sayt, 'hideSayt');
      sayt.searchbar = 'correct-searchbar-id';
      const event = { detail: { searchbar: 'wrong-searchbar-id' } };

      sayt.hideCorrectSayt(event);

      expect(hideSayt).to.not.be.called;
    });
  });

  describe('render()', () => {
    it('should return an instance of TemplateResult', () => {
      const result = sayt.render();

      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });

  describe('processClick()', () => {
    let node: any = 'some-node';
    let event: Event;

    beforeEach(() => {
      event = {
        target: node,
      } as Event;
      sayt.nodeInSearchBar = () => false;
    });

    it('should hide SAYT if the event target is nowhere relevant', () => {
      sayt.contains = stub().returns(false);
      sayt.hideSayt = spy();

      sayt.processClick(event);

      expect(sayt.contains).to.be.calledWith(node);
      expect(sayt.hideSayt).to.be.called;
    });

    it('should not SAYT if the event target is contained by SAYT', () => {
      sayt.contains = stub().returns(true);
      sayt.hideSayt = spy();

      sayt.processClick(event);

      expect(sayt.contains).to.be.calledWith(node);
      expect(sayt.hideSayt).to.not.be.called;
    });

    it('should not hide SAYT if the event target is the provided search box', () => {
      sayt.contains = stub().returns(false);
      sayt.nodeInSearchBar = stub().returns(true);
      sayt.hideSayt = spy();

      sayt.processClick(event);

      expect(sayt.contains).to.be.calledWith(node);
      expect(sayt.nodeInSearchBar).to.be.calledWith(node);
      expect(sayt.hideSayt).to.not.be.called;
    });
  });

  describe('nodeInSearchBar()', () => {
    it('should return true if given node is contained in the search bar', () => {
      const searchbar = {
        contains: stub().returns(true),
      };
      const querySelector = stub(document, 'querySelector').callsFake(() => searchbar);
      sayt.searchbar = 'searchbar-id';

      const result = sayt.nodeInSearchBar('node');

      expect(querySelector).to.be.calledWith('#searchbar-id');
      expect(searchbar.contains).to.be.calledWith('node');
      expect(result).to.equal(true);
    });

    it('should return false if given node is not contained in the search bar', () => {
      const searchbar = {
        contains: stub().returns(false),
      };
      const querySelector = stub(document, 'querySelector').callsFake(() => searchbar);
      sayt.searchbar = 'searchbar-id';

      const result = sayt.nodeInSearchBar('node');

      expect(querySelector).to.be.calledWith('#searchbar-id');
      expect(searchbar.contains).to.be.calledWith('node');
      expect(result).to.equal(false);
    });

    it('should return false if there is no search bar can be found', () => {
      const querySelector = stub(document, 'querySelector').returns(null);

      const result = sayt.nodeInSearchBar('node');

      expect(result).to.be.false;
    });
  });

  describe('processKeyPress()', () => {
    it('should exist as a function', () => {
      expect(sayt.processKeyPress).to.be.a('function');
    });

    it('should hide SAYT when pressing escape', () => {
      const event = { key: "Escape" } as KeyboardEvent;
      sayt.hideSayt = spy();

      sayt.processKeyPress(event);

      expect(sayt.hideSayt).to.be.called;
    });

    it('should not hide SAYT when pressing any character other than escape', () => {
      const event = { key: "j" } as KeyboardEvent;
      const event2 = { key: "Enter" } as KeyboardEvent;
      const event3 = { key: "Space" } as KeyboardEvent;
      sayt.hideSayt = spy();

      sayt.processKeyPress(event);
      sayt.processKeyPress(event2);
      sayt.processKeyPress(event3);

      expect(sayt.hideSayt).to.not.be.called;
    });
  });
});
