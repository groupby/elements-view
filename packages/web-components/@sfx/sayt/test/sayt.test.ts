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

      expect(addEventListener).to.be.calledWith(SAYT_EVENT.SAYT_SHOW, sayt.showCorrectSayt);
      expect(addEventListener).to.be.calledWith(SAYT_EVENT.SAYT_HIDE, sayt.hideCorrectSayt);
      expect(addEventListener).to.be.calledWith('click', sayt.processClick);
      expect(addEventListener).to.be.calledWith('keypress', sayt.processKeyPress);
    });
  });


  describe('disconnectedCallback()', () => {
    it('should remove event listeners on the window', () => {
      const removeEventListener = stub(window, 'removeEventListener');

      sayt.disconnectedCallback();

      expect(removeEventListener).to.be.calledWith(SAYT_EVENT.SAYT_SHOW, sayt.showCorrectSayt);
      expect(removeEventListener).to.be.calledWith(SAYT_EVENT.SAYT_HIDE, sayt.hideCorrectSayt);
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

  describe('showCorrectSayt()', () => {
    it('should call showSayt() when event specifies correct searchbar ID ', () => {
      const showSayt = stub(sayt, 'showSayt');
      const isCorrectSayt = stub(sayt, 'isCorrectSayt').returns(true);
      const event = {};

      sayt.showCorrectSayt(event);

      expect(isCorrectSayt).to.be.calledOnceWith(event);
      expect(showSayt).to.be.calledOnce;
    });

    it('should not call showSayt() when event specifies wrong searchbar ID', () => {
      const showSayt = stub(sayt, 'showSayt');
      const isCorrectSayt = stub(sayt, 'isCorrectSayt').returns(false);
      const event = {};

      sayt.showCorrectSayt(event);

      expect(isCorrectSayt).to.be.calledOnceWith(event);
      expect(showSayt).to.not.be.called;
    });
  });

  describe('hideCorrectSayt()', () => {
    it('should call hideSayt() when event specifies correct searchbar ID ', () => {
      const hideSayt = stub(sayt, 'hideSayt');
      const isCorrectSayt = stub(sayt, 'isCorrectSayt').returns(true);
      const event = {};

      sayt.hideCorrectSayt(event);

      expect(isCorrectSayt).to.be.calledOnceWith(event);
      expect(hideSayt).to.be.calledOnce;
    });

    it('should not call hideSayt() when event specifies wrong searchbar ID', () => {
      const hideSayt = stub(sayt, 'hideSayt');
      const isCorrectSayt = stub(sayt, 'isCorrectSayt').returns(false);
      const event = {};

      sayt.hideCorrectSayt(event);

      expect(isCorrectSayt).to.be.calledOnceWith(event);
      expect(hideSayt).to.not.be.called;
    });
  });

  describe('isCorrectSayt()', () => {
    it('should return true if event provides the correct searchbar ID', () => {
      const searchbar = sayt.searchbar = 'some-searchbar-id';
      const event = { detail: { searchbar } };

      const result = sayt.isCorrectSayt(event);

      expect(result).to.be.true;
    });

    it('should return true if event does not provide a searchbar ID', () => {
      const searchbar = sayt.searchbar = 'some-searchbar-id';
      const event = { detail: {} };

      const result = sayt.isCorrectSayt(event);

      expect(result).to.be.true;
    });

    it('should return false if event provides the wrong searchbar ID', () => {
      sayt.searchbar = 'correct-searchbar-id';
      const event = { detail: { searchbar: 'wrong-searchbar-id' } };

      const result = sayt.isCorrectSayt(event);

      expect(result).to.be.false;
    });

    it('should return true if event specifies a searchbar but SAYT has none specified', () => {
      sayt.searchbar = undefined;
      const event = { detail: { searchbar: 'some-searchbar-id' } };

      const result = sayt.isCorrectSayt(event);

      expect(result).to.be.true;
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
