import { expect, sinon, spy, stub } from '../utils';
import { TemplateResult, LitElement } from 'lit-element';
import { PRODUCTS_EVENT } from '@sfx/products';
import Sayt from '../../src/sayt';
import { SAYT_EVENT } from '../../src/events';
import { AUTOCOMPLETE_RECEIVED_RESULTS_EVENT } from '../../../autocomplete/src/events';

describe('Sayt Component', () => {
  let sayt;

  beforeEach(() => {
    sayt = new Sayt();
  });

  describe('Constructor', () => {
    it('should extend the LitElement class', () => {
      expect(sayt).to.be.an.instanceof(LitElement);
    });

    describe('hideAutocomplete property', () => {
      it('should have default value of false', () => {
        expect(sayt.hideAutocomplete).to.be.false;
      });
    });

    describe('hideProducts property', () => {
      it('should have default value of false', () => {
        expect(sayt.hideProducts).to.be.false;
      });
    });
  });

  describe('connectedCallback()', () => {
    it('should register event listeners to the window', () => {
      const addEventListener = stub(window, 'addEventListener');
      const setSearchboxListener = stub(sayt, 'setSearchboxListener');
      const searchbox = sayt.searchbox = '';

      sayt.connectedCallback();

      expect(addEventListener).to.be.calledWith(SAYT_EVENT.SAYT_SHOW, sayt.showCorrectSayt);
      expect(addEventListener).to.be.calledWith(SAYT_EVENT.SAYT_HIDE, sayt.hideCorrectSayt);
      expect(addEventListener).to.be.calledWith('click', sayt.processClick);
      expect(addEventListener).to.be.calledWith('keydown', sayt.processKeyEvent);
      expect(addEventListener).to.be.calledWith(AUTOCOMPLETE_RECEIVED_RESULTS_EVENT, sayt.showCorrectSayt);
      expect(addEventListener).to.be.calledWith(PRODUCTS_EVENT, sayt.showCorrectSayt);
      expect(setSearchboxListener).to.be.calledWith(searchbox, 'add');
    });
  });

  describe('disconnectedCallback()', () => {
    it('should remove event listeners on the window', () => {
      const removeEventListener = stub(window, 'removeEventListener');
      const setSearchboxListener = stub(sayt, 'setSearchboxListener');
      const searchbox = sayt.searchbox = '';

      sayt.disconnectedCallback();

      expect(removeEventListener).to.be.calledWith(SAYT_EVENT.SAYT_SHOW, sayt.showCorrectSayt);
      expect(removeEventListener).to.be.calledWith(AUTOCOMPLETE_RECEIVED_RESULTS_EVENT, sayt.showCorrectSayt);
      expect(removeEventListener).to.be.calledWith(PRODUCTS_EVENT, sayt.showCorrectSayt);
      expect(removeEventListener).to.be.calledWith(SAYT_EVENT.SAYT_HIDE, sayt.hideCorrectSayt);
      expect(removeEventListener).to.be.calledWith('click', sayt.processClick);
      expect(removeEventListener).to.be.calledWith('keydown', sayt.processKeyEvent);
      expect(setSearchboxListener).to.be.calledWith(searchbox, 'remove');
    });
  });

  describe('updated()', () => {
    describe('visible', () => {
      it('should change the hidden property if the visible property has changed', () => {
        sayt.hidden = true;
        sayt.visible = true;

        sayt.updated(new Map([['visible', true]]));

        expect(sayt.hidden).to.be.false;
      });
    });

    describe('searchbox', () => {
      it('should replace event listener', () => {
        const setSearchboxListener = stub(sayt, 'setSearchboxListener');
        const newSearchbox = sayt.searchbox = 'searchbox1';
        const oldSearchbox = '';

        sayt.updated(new Map([['searchbox', oldSearchbox]]));

        expect(setSearchboxListener).to.be.calledWith(oldSearchbox, 'remove');
        expect(setSearchboxListener).to.be.calledWith(newSearchbox, 'add');
      });
    });
  });

  describe('setSearchboxListener()', () => {
    it('should add an event listener if provided an `add` paramater and an input ID and it exists on the page', () => {
      const searchboxAddEventListener = spy();
      const windowAddEventListener = stub(window, 'addEventListener');
      const getElementById = stub(document, 'getElementById').returns({ addEventListener: searchboxAddEventListener });
      const searchboxId = sayt.searchbox = 'searchbox1';

      sayt.setSearchboxListener(searchboxId, 'add');

      expect(getElementById).to.be.calledWith(searchboxId);
      expect(searchboxAddEventListener).to.be.calledWith('input', sayt.processSearchboxInput);
      expect(windowAddEventListener).to.not.be.calledWith('sfx::searchbox_change');
    });

    it('should remove an event listener if provided a `remove` paramater and an input ID and it exists on the page', () => {
      const searchboxRemoveEventListener = spy();
      const windowRemoveEventListener = stub(window, 'removeEventListener');
      const getElementById = stub(document, 'getElementById').returns({ removeEventListener: searchboxRemoveEventListener });
      const searchboxId = sayt.searchbox = 'searchbox1';

      sayt.setSearchboxListener(searchboxId, 'remove');

      expect(getElementById).to.be.calledWith(searchboxId);
      expect(searchboxRemoveEventListener).to.be.calledWith('input', sayt.processSearchboxInput);
      expect(windowRemoveEventListener).to.not.be.calledWith('sfx::searchbox_change');
    });

    it('should not register listeners if the searchbox does not exist', () => {
      const windowAddEventListener = stub(window, 'addEventListener');
      const getElementById = stub(document, 'getElementById').returns(null);
      const searchboxId = sayt.searchbox = 'searchbox1';

      sayt.setSearchboxListener(searchboxId, 'add');

      // It is implicitly tested that input is not being listened for because there is no element to attach it to
      expect(windowAddEventListener).to.not.be.calledWith('sfx::searchbox_change');
    });

    it('should add event listener to window if element exists and searchbox ID is empty', () => {
      const searchboxAddEventListener = spy();
      const windowAddEventListener = stub(window, 'addEventListener');
      const getElementById = stub(document, 'getElementById').returns({ addEventListener: searchboxAddEventListener });

      sayt.setSearchboxListener('', 'add');

      expect(windowAddEventListener).to.be.calledWith('sfx::searchbox_change', sayt.processSfxSearchboxChange);
      expect(searchboxAddEventListener).to.not.be.calledWith('input');
    });

    it('should remove event listener to window if element exists and searchbox ID is empty', () => {
      const searchboxRemoveEventListener = spy();
      const windowRemoveEventListener = stub(window, 'removeEventListener');
      const getElementById = stub(document, 'getElementById').returns({ removeEventListener: searchboxRemoveEventListener });

      sayt.setSearchboxListener('', 'remove');

      expect(windowRemoveEventListener).to.be.calledWith('sfx::searchbox_change', sayt.processSfxSearchboxChange);
      expect(searchboxRemoveEventListener).to.not.be.calledWith('input');
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
      const event = { detail: {} };
      sayt.searchbox = 'some-searchbox-id';

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

  describe('requestSayt()', () => {
    const query = 'test';
    let dispatchEvent;
    let hideSayt;

    beforeEach(() => {
      dispatchEvent = stub(window, 'dispatchEvent');
      hideSayt = stub(sayt, 'hideSayt');
    });

    it('should hide the sayt container if there are not enough characters in a searchbox query', () => {
      sayt.minSearchLength = 6;

      sayt.requestSayt(query);

      expect(hideSayt).to.be.called;
      expect(dispatchEvent).to.not.be.called;
    });

    it('should not hide the sayt if the query meets the minimum search length', () => {
      sayt.minSearchLength = 4;

      sayt.requestSayt(query);

      expect(hideSayt).to.not.be.called;
    });

    it('should send an event to request sayt results if the query string is long enough', () => {
      const event = new CustomEvent('sfx::autocomplete_fetch_data',{
        detail: { query },
        bubbles: true,
      });
      sayt.minSearchLength = 3;

      sayt.requestSayt(query);

      expect(dispatchEvent).to.be.calledWith(event);
    });

    it('should include a searchbox in the dispatched event if it is provided', () => {
      const searchbox = 'testBox'
      const event = new CustomEvent('sfx::autocomplete_fetch_data',{
        detail: { query, searchbox },
        bubbles: true,
      });
      sayt.minSearchLength = 3;

      sayt.requestSayt(query);

      expect(dispatchEvent).to.be.calledWith(event);
    });
  });

  describe('processClick()', () => {
    let node: any;
    let event: any;

    beforeEach(() => {
      node = {};
      event = { target: node };
    });

    it('should hide SAYT if the event target is nowhere relevant', () => {
      stub(sayt, 'contains').returns(false);
      stub(sayt, 'nodeInSearchbox').returns(false);
      stub(sayt, 'hideSayt');

      sayt.processClick(event);

      expect(sayt.contains).to.be.calledWith(sinon.match.same(node));
      expect(sayt.hideSayt).to.be.called;
    });

    it('should not hide SAYT if the event target is contained by SAYT', () => {
      stub(sayt, 'contains').returns(true);
      stub(sayt, 'hideSayt');

      sayt.processClick(event);

      expect(sayt.contains).to.be.calledWith(node);
      expect(sayt.hideSayt).to.not.be.called;
    });

    it('should not hide SAYT if the event target is the provided search box', () => {
      stub(sayt, 'contains').returns(false);
      stub(sayt, 'nodeInSearchbox').returns(true);
      stub(sayt, 'hideSayt');

      sayt.processClick(event);

      expect(sayt.contains).to.be.calledWith(node);
      expect(sayt.nodeInSearchbox).to.be.calledWith(node);
      expect(sayt.hideSayt).to.not.be.called;
    });
  });

  describe('clickCloseSayt()', () => {
    it('should close SAYT', () => {
      const hideSayt = stub(sayt, 'hideSayt');
      const event = { preventDefault: () => null };

      sayt.clickCloseSayt(event);

      expect(hideSayt).to.be.calledOnce;
    });

    it('should prevent the default event action', () => {
      const preventDefault = spy();
      const event = { preventDefault };
      stub(sayt, 'hideSayt');

      sayt.clickCloseSayt(event);

      expect(preventDefault).to.be.called;
    });
  });

  describe('nodeInSearchbox()', () => {
    it('should return true if given node is contained in the search box', () => {
      const searchbox = {
        contains: spy(() => true),
      };
      const getElementById = stub(document, 'getElementById').returns(searchbox);
      sayt.searchbox = 'searchbox-id';

      const result = sayt.nodeInSearchbox('node');

      expect(getElementById).to.be.calledWith('searchbox-id');
      expect(searchbox.contains).to.be.calledWith('node');
      expect(result).to.be.true;
    });

    it('should return false if given node is not contained in the search box', () => {
      const searchbox = {
        contains: stub().returns(false),
      };
      const getElementById = stub(document, 'getElementById').returns(searchbox);
      sayt.searchbox = 'searchbox-id';

      const result = sayt.nodeInSearchbox('node');

      expect(getElementById).to.be.calledWith('searchbox-id');
      expect(searchbox.contains).to.be.calledWith('node');
      expect(result).to.be.false;
    });

    it('should return false if there is no search box on the page', () => {
      const getElementById = stub(document, 'getElementById').returns(null);
      sayt.searchbox = 'searchbox-id';

      const result = sayt.nodeInSearchbox('node');

      expect(result).to.be.false;
      expect(getElementById).to.be.calledWith('searchbox-id');
    });

    it('should return false if this.searchbox is not set', () => {
      sayt.searchbox = undefined;

      const result = sayt.nodeInSearchbox('node');

      expect(result).to.be.false;
    });
  });

  describe('processKeyEvent()', () => {
    it('should hide SAYT when pressing escape', () => {
      const event: any = { key: "Escape" };
      const hideSayt = stub(sayt, 'hideSayt');

      sayt.processKeyEvent(event);

      expect(hideSayt).to.be.called;
    });

    it('should not hide SAYT when pressing any character other than escape', () => {
      const event: any = { key: "j" };
      const event2: any = { key: "Enter" };
      const event3: any = { key: "Space" };
      const hideSayt = stub(sayt, 'hideSayt');

      sayt.processKeyEvent(event);
      sayt.processKeyEvent(event2);
      sayt.processKeyEvent(event3);

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
