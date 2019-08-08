import { expect, spy, stub } from './utils';
import { TemplateResult } from 'lit-element';
import Sayt from '../src/sayt';
import { SAYT_EVENT } from '../src/events';
import { AUTOCOMPLETE_RECEIVED_RESULTS_EVENT } from '../../autocomplete/src/events';

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
      expect(addEventListener).to.be.calledWith(AUTOCOMPLETE_RECEIVED_RESULTS_EVENT, sayt.showCorrectSayt);
    });
  });


  describe('disconnectedCallback()', () => {
    it('should remove event listeners on the window', () => {
      const removeEventListener = stub(window, 'removeEventListener');

      sayt.disconnectedCallback();

      expect(removeEventListener).to.be.calledWith(SAYT_EVENT.SAYT_SHOW, sayt.showCorrectSayt);
      expect(removeEventListener).to.be.calledWith(AUTOCOMPLETE_RECEIVED_RESULTS_EVENT, sayt.showCorrectSayt);
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

  describe('showCorrectSayt()', () => {
    it('should call showSayt() when event specifies correct searchbox ID ', () => {
      const showSayt = stub(sayt, 'showSayt');
      const isCorrectSayt = stub(sayt, 'isCorrectSayt').returns(true);
      const event = {};

      sayt.showCorrectSayt(event);

      expect(isCorrectSayt).to.be.calledOnceWith(event);
      expect(showSayt).to.be.calledOnce;
    });

    it('should not call showSayt() when event specifies wrong searchbox ID', () => {
      const showSayt = stub(sayt, 'showSayt');
      const isCorrectSayt = stub(sayt, 'isCorrectSayt').returns(false);
      const event = {};

      sayt.showCorrectSayt(event);

      expect(isCorrectSayt).to.be.calledOnceWith(event);
      expect(showSayt).to.not.be.called;
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
    it('should call hideSayt() when event specifies correct searchbox ID ', () => {
      const hideSayt = stub(sayt, 'hideSayt');
      const isCorrectSayt = stub(sayt, 'isCorrectSayt').returns(true);
      const event = {};

      sayt.hideCorrectSayt(event);

      expect(isCorrectSayt).to.be.calledOnceWith(event);
      expect(hideSayt).to.be.calledOnce;
    });

    it('should not call hideSayt() when event specifies wrong searchbox ID', () => {
      const hideSayt = stub(sayt, 'hideSayt');
      const isCorrectSayt = stub(sayt, 'isCorrectSayt').returns(false);
      const event = {};

      sayt.hideCorrectSayt(event);

      expect(isCorrectSayt).to.be.calledOnceWith(event);
      expect(hideSayt).to.not.be.called;
    });
  });

  describe('isCorrectSayt()', () => {
    it('should return true if event provides the correct searchbox ID', () => {
      const searchbox = sayt.searchbox = 'some-searchbox-id';
      const event = { detail: { searchbox } };

      const result = sayt.isCorrectSayt(event);

      expect(result).to.be.true;
    });

    it('should return true if event does not provide a searchbox ID', () => {
      sayt.searchbox = 'some-searchbox-id';
      const event = { detail: {} };

      const result = sayt.isCorrectSayt(event);

      expect(result).to.be.true;
    });

    it('should return false if event provides the wrong searchbox ID', () => {
      sayt.searchbox = 'correct-searchbox-id';
      const event = { detail: { searchbox: 'wrong-searchbox-id' } };

      const result = sayt.isCorrectSayt(event);

      expect(result).to.be.false;
    });

    it('should return true if event specifies a searchbox but SAYT has none specified', () => {
      sayt.searchbox = undefined;
      const event = { detail: { searchbox: 'some-searchbox-id' } };

      const result = sayt.isCorrectSayt(event);

      expect(result).to.be.true;
    });

    it('should not error if passed an event without a detail attribute', () => {
      const event = {};
      const callback = () => sayt.isCorrectSayt(event);

      expect(callback).to.not.throw();
    });
  });

  describe('processClick()', () => {
    let node: any = 'some-node';
    let event: any;

    beforeEach(() => {
      event = { target: node };
    });

    it('should hide SAYT if the event target is nowhere relevant', () => {
      stub(sayt, 'contains').returns(false);
      stub(sayt, 'nodeInSearchBar').returns(false);
      stub(sayt, 'hideSayt');

      sayt.processClick(event);

      expect(sayt.contains).to.be.calledWith(node);
      expect(sayt.hideSayt).to.be.called;
    });

    it('should not SAYT if the event target is contained by SAYT', () => {
      stub(sayt, 'contains').returns(true);
      stub(sayt, 'hideSayt');

      sayt.processClick(event);

      expect(sayt.contains).to.be.calledWith(node);
      expect(sayt.hideSayt).to.not.be.called;
    });

    it('should not hide SAYT if the event target is the provided search box', () => {
      stub(sayt, 'contains').returns(false);
      stub(sayt, 'nodeInSearchBar').returns(true);
      stub(sayt, 'hideSayt');

      sayt.processClick(event);

      expect(sayt.contains).to.be.calledWith(node);
      expect(sayt.nodeInSearchBar).to.be.calledWith(node);
      expect(sayt.hideSayt).to.not.be.called;
    });
  });

  describe('clickCloseSayt()', () => {
    it('should close SAYT when activated', () => {
      const hideSayt = stub(sayt, 'hideSayt');
      const event = { preventDefault: () => null };

      sayt.clickCloseSayt(event);

      expect(hideSayt).to.be.calledOnce;
    });

    it('should prevent the default event action when activated', () => {
      stub(sayt, 'hideSayt');
      const preventDefault = spy();
      const event = { preventDefault };

      sayt.clickCloseSayt(event);

      expect(preventDefault).to.be.calledOnce;
    });
  });

  describe('nodeInSearchBar()', () => {
    it('should return true if given node is contained in the search bar', () => {
      const searchbox = {
        contains: spy(() => true),
      };
      const getElementById = stub(document, 'getElementById').callsFake(() => searchbox);
      sayt.searchbox = 'searchbox-id';

      const result = sayt.nodeInSearchBar('node');

      expect(getElementById).to.be.calledWith('searchbox-id');
      expect(searchbox.contains).to.be.calledWith('node');
      expect(result).to.be.true;
    });

    it('should return false if given node is not contained in the search bar', () => {
      const searchbox = {
        contains: stub().returns(false),
      };
      const getElementById = stub(document, 'getElementById').callsFake(() => searchbox);
      sayt.searchbox = 'searchbox-id';

      const result = sayt.nodeInSearchBar('node');

      expect(getElementById).to.be.calledWith('searchbox-id');
      expect(searchbox.contains).to.be.calledWith('node');
      expect(result).to.be.false;
    });

    it('should return false if there is no search bar on the page', () => {
      const getElementById = stub(document, 'getElementById').returns(null);
      sayt.searchbox = 'searchbox-id';

      const result = sayt.nodeInSearchBar('node');

      expect(result).to.be.false;
      expect(getElementById).to.be.calledWith('searchbox-id');
    });

    it('should return false if this.searchbox is not set', () => {
      sayt.searchbox = undefined;

      const result = sayt.nodeInSearchBar('node');

      expect(result).to.be.false;
    });
  });

  describe('processKeyPress()', () => {
    it('should hide SAYT when pressing escape', () => {
      const event: any = { key: "Escape" };
      const hideSayt = stub(sayt, 'hideSayt');

      sayt.processKeyPress(event);

      expect(hideSayt).to.be.called;
    });

    it('should not hide SAYT when pressing any character other than escape', () => {
      const event: any = { key: "j" };
      const event2: any = { key: "Enter" };
      const event3: any = { key: "Space" };
      const hideSayt = stub(sayt, 'hideSayt');

      sayt.processKeyPress(event);
      sayt.processKeyPress(event2);
      sayt.processKeyPress(event3);

      expect(hideSayt).to.not.be.called;
    });
  });

  describe('render()', () => {
    it('should return an instance of TemplateResult', () => {
      const result = sayt.render();

      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });
});
