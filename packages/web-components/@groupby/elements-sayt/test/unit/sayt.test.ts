import { TemplateResult } from 'lit-element';
import * as Debounce from 'debounce';
import {
  AUTOCOMPLETE_ACTIVE_TERM,
  AUTOCOMPLETE_REQUEST,
  AUTOCOMPLETE_RESPONSE,
  SAYT_HIDE,
  SAYT_SHOW,
  SAYT_PRODUCTS_REQUEST,
  SAYT_PRODUCTS_RESPONSE,
  SEARCHBOX_INPUT,
  UPDATE_SEARCH_TERM,
} from '@groupby/elements-events';
import {
  expect,
  sinon,
  spy,
  stub,
  itShouldExtendBase,
  itShouldCallParentMethod,
} from '../utils';
import Sayt from '../../src/sayt';

describe('Sayt Component', () => {
  let sayt;

  beforeEach(() => {
    sayt = new Sayt();
  });

  itShouldExtendBase(() => sayt);

  describe('Constructor', () => {
    it('should call setDebouncedMethods()', () => {
      const setDebounce = stub(Sayt.prototype, 'setDebouncedMethods');

      sayt = new Sayt();

      expect(setDebounce).to.be.called;
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

    describe('visible property', () => {
      it('should have default value of false', () => {
        expect(sayt.visible).to.be.false;
      });
    });

    describe('searchbox property', () => {
      it('should have default value of an empty string', () => {
        expect(sayt.searchbox).to.equal('');
      });
    });

    describe('group property', () => {
      it('should have default value of an empty string', () => {
        expect(sayt.group).to.equal('');
      });
    });

    describe('closeText property', () => {
      it('should have default value of Close', () => {
        expect(sayt.closeText).to.equal('Close');
      });
    });

    describe('showCloseButton property', () => {
      it('should have default value of false', () => {
        expect(sayt.showCloseButton).to.be.false;
      });
    });

    describe('minSearchLength property', () => {
      it('should have default value of 3', () => {
        expect(sayt.minSearchLength).to.equal(3);
      });
    });

    describe('debounce property', () => {
      it('should have default value of 300', () => {
        expect(sayt.debounce).to.equal(300);
      });
    });

    describe('area property', () => {
      it('should have default value of an empty string', () => {
        expect(sayt.area).to.equal('');
      });
    });

    describe('collection property', () => {
      it('should have default value of an empty string', () => {
        expect(sayt.collection).to.equal('');
      });
    });
  });

  describe('connectedCallback()', () => {
    itShouldCallParentMethod(() => sayt, 'connectedCallback');

    it('should register event listeners to the window', () => {
      const addEventListener = stub(window, 'addEventListener');
      const saytAddEventListener = stub(sayt, 'addEventListener');
      const setSearchboxListener = stub(sayt, 'setSearchboxListener');
      const searchbox = sayt.searchbox = '';

      sayt.connectedCallback();

      expect(addEventListener).to.be.calledWith(SAYT_SHOW, sayt.showCorrectSayt);
      expect(addEventListener).to.be.calledWith(SAYT_HIDE, sayt.hideCorrectSayt);
      expect(addEventListener).to.be.calledWith('click', sayt.processClick);
      expect(addEventListener).to.be.calledWith('keydown', sayt.processKeyEvent);
      expect(addEventListener).to.be.calledWith(AUTOCOMPLETE_RESPONSE, sayt.showCorrectSayt);
      expect(addEventListener).to.be.calledWith(SAYT_PRODUCTS_RESPONSE, sayt.showCorrectSayt);
      expect(saytAddEventListener).to.be.calledWith(AUTOCOMPLETE_ACTIVE_TERM, sayt.handleAutocompleteTermHover);
      expect(saytAddEventListener).to.be.calledWith('keydown', sayt.changeSelection);
      expect(setSearchboxListener).to.be.calledWith(searchbox, 'add');
    });

    it('should register event listeners to the component', () => {
      const addEventListener = stub(sayt, 'addEventListener');

      sayt.connectedCallback();

      expect(addEventListener).to.be.calledWith(AUTOCOMPLETE_ACTIVE_TERM, sayt.handleAutocompleteTermHover);
    });

    it('should set the ARIA attributes for the paired searchbox', () => {
      const setInitialSearchboxAttributes = stub(sayt, 'setInitialSearchboxAttributes');

      sayt.connectedCallback();

      expect(setInitialSearchboxAttributes).to.be.called;
    });
  });

  describe('disconnectedCallback()', () => {
    itShouldCallParentMethod(() => sayt, 'disconnectedCallback');

    it('should remove event listeners on the window', () => {
      const removeEventListener = stub(window, 'removeEventListener');
      const saytRemoveEventListener = stub(sayt, 'removeEventListener');
      const setSearchboxListener = stub(sayt, 'setSearchboxListener');
      const searchbox = sayt.searchbox = '';

      sayt.disconnectedCallback();

      expect(removeEventListener).to.be.calledWith(SAYT_SHOW, sayt.showCorrectSayt);
      expect(removeEventListener).to.be.calledWith(AUTOCOMPLETE_RESPONSE, sayt.showCorrectSayt);
      expect(removeEventListener).to.be.calledWith(SAYT_PRODUCTS_RESPONSE, sayt.showCorrectSayt);
      expect(removeEventListener).to.be.calledWith(SAYT_HIDE, sayt.hideCorrectSayt);
      expect(removeEventListener).to.be.calledWith('click', sayt.processClick);
      expect(removeEventListener).to.be.calledWith('keydown', sayt.processKeyEvent);
      expect(saytRemoveEventListener).to.be.calledWith(AUTOCOMPLETE_ACTIVE_TERM, sayt.handleAutocompleteTermHover);
      expect(saytRemoveEventListener).to.be.calledWith('keydown', sayt.changeSelection);
      expect(setSearchboxListener).to.be.calledWith(searchbox, 'remove');
    });

    it('should remove event listeners to the component', () => {
      const removeEventListener = stub(sayt, 'removeEventListener');

      sayt.disconnectedCallback();

      expect(removeEventListener).to.be.calledWith(AUTOCOMPLETE_ACTIVE_TERM, sayt.handleAutocompleteTermHover);
    });

    it('should remove the ARIA attributes for the paired searchbox', () => {
      const removeSearchboxAttributes = stub(sayt, 'removeSearchboxAttributes');

      sayt.disconnectedCallback();

      expect(removeSearchboxAttributes).to.be.called;
    });
  });

  describe('updated()', () => {
    describe('visible', () => {
      beforeEach(() => {
        sayt.hidden = true;
        sayt.visible = true;
      });

      it('should change the hidden property if the visible property has changed', () => {
        sayt.updated(new Map([['visible', true]]));

        expect(sayt.hidden).to.be.false;
      });

      it('should update the aria-expanded attribute on the paired searchbox if it exists', () => {
        const setAttribute = spy();
        sayt.searchbox = 'searchbox';
        stub(document, 'getElementById').withArgs(sayt.searchbox).returns({ setAttribute });

        sayt.updated(new Map([['visible', true]]));

        expect(setAttribute).to.be.calledWith('aria-expanded', String(sayt.visible));
      });
    });

    describe('hideAutocomplete', () => {
      it('should remove and then add ARIA attributes to the paired searchbox', () => {
        const removeSearchboxAttributes = stub(sayt, 'removeSearchboxAttributes');
        const setInitialSearchboxAttributes = stub(sayt, 'setInitialSearchboxAttributes');

        sayt.updated(new Map([['hideAutocomplete', true]]));

        sinon.assert.callOrder(removeSearchboxAttributes, setInitialSearchboxAttributes);
        expect(removeSearchboxAttributes).to.be.calledWith(sayt.searchbox);
        expect(setInitialSearchboxAttributes).to.be.calledWith(sayt.searchbox);
      });
    });

    describe('searchbox', () => {
      const newSearchbox = 'searchbox1';
      const oldSearchbox = 'searchbox0';

      beforeEach(() => {
        sayt.searchbox = newSearchbox;
      });

      it('should replace event listener', () => {
        const setSearchboxListener = stub(sayt, 'setSearchboxListener');

        sayt.updated(new Map([['searchbox', oldSearchbox]]));

        expect(setSearchboxListener).to.be.calledWith(oldSearchbox, 'remove');
        expect(setSearchboxListener).to.be.calledWith(newSearchbox, 'add');
      });

      it('should remove ARIA attributes from the old searchbox', () => {
        const removeSearchboxAttributes = stub(sayt, 'removeSearchboxAttributes');

        sayt.updated(new Map([['searchbox', oldSearchbox]]));

        expect(removeSearchboxAttributes).to.be.calledWith(oldSearchbox);
      });

      it('should add ARIA attributes to a new searchbox', () => {
        const setInitialSearchboxAttributes = stub(sayt, 'setInitialSearchboxAttributes');

        sayt.updated(new Map([['searchbox', oldSearchbox]]));

        expect(setInitialSearchboxAttributes).to.be.called;
      });
    });

    describe('debounce', () => {
      it('should update debounce property', () => {
        const setDebounce = stub(sayt, 'setDebouncedMethods');
        const oldDebounceTime = 0;

        sayt.updated(new Map([['debounce', oldDebounceTime]]));

        expect(setDebounce).to.be.called;
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
      expect(searchboxAddEventListener).to.be.calledWith('keydown', sayt.changeSelection);
      expect(windowAddEventListener).to.not.be.calledWith(SEARCHBOX_INPUT);
    });

    it('should remove an event listener if provided a `remove` paramater and an input ID and it exists on the page', () => {
      const searchboxRemoveEventListener = spy();
      const windowRemoveEventListener = stub(window, 'removeEventListener');
      const getElementById = stub(document, 'getElementById').returns({ removeEventListener: searchboxRemoveEventListener });
      const searchboxId = sayt.searchbox = 'searchbox1';

      sayt.setSearchboxListener(searchboxId, 'remove');

      expect(getElementById).to.be.calledWith(searchboxId);
      expect(searchboxRemoveEventListener).to.be.calledWith('input', sayt.processSearchboxInput);
      expect(searchboxRemoveEventListener).to.be.calledWith('keydown', sayt.changeSelection);
      expect(windowRemoveEventListener).to.not.be.calledWith(SEARCHBOX_INPUT);
    });

    it('should not register listeners if the searchbox does not exist', () => {
      const windowAddEventListener = stub(window, 'addEventListener');
      stub(document, 'getElementById').returns(null);
      const searchboxId = sayt.searchbox = 'searchbox1';

      sayt.setSearchboxListener(searchboxId, 'add');

      // It is implicitly tested that input is not being listened for because there is no element to attach it to
      expect(windowAddEventListener).to.not.be.calledWith(SEARCHBOX_INPUT);
    });

    it('should add event listener to window if element exists and searchbox ID is empty', () => {
      const searchboxAddEventListener = spy();
      const windowAddEventListener = stub(window, 'addEventListener');
      stub(document, 'getElementById').returns({ addEventListener: searchboxAddEventListener });

      sayt.setSearchboxListener('', 'add');

      expect(windowAddEventListener).to.be.calledWith(SEARCHBOX_INPUT, sayt.processElementsSearchboxChange);
      expect(searchboxAddEventListener).to.not.be.calledWith('input');
    });

    it('should remove event listener to window if element exists and searchbox ID is empty', () => {
      const searchboxRemoveEventListener = spy();
      const windowRemoveEventListener = stub(window, 'removeEventListener');
      stub(document, 'getElementById').returns({ removeEventListener: searchboxRemoveEventListener });

      sayt.setSearchboxListener('', 'remove');

      expect(windowRemoveEventListener).to.be.calledWith(SEARCHBOX_INPUT, sayt.processElementsSearchboxChange);
      expect(searchboxRemoveEventListener).to.not.be.calledWith('input');
    });
  });

  describe('setInitialSearchboxAttributes()', () => {
    const searchbox = 'searchbox';
    let getAttribute;
    let setAttribute;
    let getElementById;

    beforeEach(() => {
      getAttribute = stub();
      getAttribute.withArgs('aria-controls').returns('');
      getAttribute.withArgs('role').returns('');
      setAttribute = spy();
      getElementById = stub(document, 'getElementById').withArgs(searchbox).returns({ getAttribute, setAttribute });
    });

    it('should set autocomplete to off', () => {
      sayt.setInitialSearchboxAttributes(searchbox);

      expect(setAttribute).to.be.calledWith('autocomplete', 'off');
    });

    it('should set aria-expanded to the value of visible', () => {
      sayt.visible = true;

      sayt.setInitialSearchboxAttributes(searchbox);

      expect(setAttribute).to.be.calledWith('aria-expanded', 'true');
    });

    it('should add the ID of the autocomplete component to aria-controls', () => {
      sayt.setInitialSearchboxAttributes(searchbox);

      expect(setAttribute).to.be.calledWith('aria-controls', sayt.autocompleteId);
    });

    it('should not add the ID of the autocomplete component to aria-controls if autocomplete is hidden', () => {
      sayt.hideAutocomplete = true;

      sayt.setInitialSearchboxAttributes(searchbox);

      expect(setAttribute).to.not.be.calledWith('aria-controls', sayt.autocompleteId);
    });

    it('should not remove existing aria-controls values', () => {
      getAttribute.withArgs('aria-controls').returns('otherid otherotherid');

      sayt.setInitialSearchboxAttributes(searchbox);

      expect(setAttribute).to.be.calledWith('aria-controls', `otherid otherotherid ${sayt.autocompleteId}`);
    });

    it('should not duplicate aria-controls values', () => {
      getAttribute.withArgs('aria-controls').returns(`${sayt.autocompleteId} otherid`);

      sayt.setInitialSearchboxAttributes(searchbox);

      expect(setAttribute).to.not.be.calledWith('aria-controls', sinon.match(new RegExp(`${sayt.autocompleteId}.*${sayt.autocompleteId}`)));
    });

    it('should add combobox role', () => {
      sayt.setInitialSearchboxAttributes(searchbox);

      expect(setAttribute).to.be.calledWith('role', 'combobox');
    });

    it('should not remove existing roles', () => {
      getAttribute.withArgs('role').returns('widget');

      sayt.setInitialSearchboxAttributes(searchbox);

      expect(setAttribute).to.be.calledWith('role', 'combobox widget');
    });

    it('should not duplicate roles', () => {
      getAttribute.withArgs('role').returns('combobox widget');

      sayt.setInitialSearchboxAttributes(searchbox);

      expect(setAttribute).to.not.be.calledWith('role', sinon.match(new RegExp('combobox.*combobox')));
    });

    it('should not throw when no searchbox ID is given', () => {
      const callback = () => sayt.setInitialSearchboxAttributes('');

      expect(callback).to.not.throw();
    });

    it('should not throw when no searchbox exists', () => {
      getElementById.withArgs(searchbox).returns(null);

      const callback = () => sayt.setInitialSearchboxAttributes(searchbox);

      expect(callback).to.not.throw();
    });
  });

  describe('removeSearchboxAttributes()', () => {
    const searchbox = 'searchbox';
    let getAttribute;
    let removeAttribute;
    let setAttribute;
    let getElementById;

    beforeEach(() => {
      getAttribute = stub();
      getAttribute.withArgs('aria-controls').returns(`${sayt.autocompleteId} otherid`);
      getAttribute.withArgs('role').returns('combobox widget');
      removeAttribute = stub();
      setAttribute = spy();
      getElementById = stub(document, 'getElementById')
        .withArgs(searchbox)
        .returns({ getAttribute, setAttribute, removeAttribute });
    });

    it('should remove the autocomplete attribute', () => {
      sayt.removeSearchboxAttributes(searchbox);

      expect(removeAttribute).to.be.calledWith('autocomplete');
    });

    it('should remove the aria-expanded attribute', () => {
      sayt.removeSearchboxAttributes(searchbox);

      expect(removeAttribute).to.be.calledWith('aria-expanded');
    });

    it('should only remove the ID of the autocomplete component from aria-controls', () => {
      sayt.removeSearchboxAttributes(searchbox);

      expect(setAttribute).to.be.calledWith('aria-controls', 'otherid');
    });

    it('should only remove the combobox role', () => {
      sayt.removeSearchboxAttributes(searchbox);

      expect(setAttribute).to.be.calledWith('role', 'widget');
    });

    it('should not throw when no searchbox ID is given', () => {
      const callback = () => sayt.removeSearchboxAttributes('');

      expect(callback).to.not.throw();
    });

    it('should not throw when no searchbox exists', () => {
      getElementById.withArgs(searchbox).returns(null);

      const callback = () => sayt.removeSearchboxAttributes(searchbox);

      expect(callback).to.not.throw();
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
    let showSayt;
    let event;

    beforeEach(() => {
      showSayt = stub(sayt, 'showSayt');
      event = { a: 'a' };
    });

    it('should call showSayt() when event specifies correct searchbox ID ', () => {
      const isCorrectSayt = stub(sayt, 'isCorrectSayt').returns(true);

      sayt.showCorrectSayt(event);

      expect(isCorrectSayt).to.be.calledOnceWith(event);
      expect(showSayt).to.be.calledOnce;
    });

    it('should not call showSayt() when event specifies wrong searchbox ID', () => {
      const isCorrectSayt = stub(sayt, 'isCorrectSayt').returns(false);

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

    it('should clear all requests for SAYT products', () => {
      const debouncedRequestSaytProductsClear = stub(sayt.debouncedRequestSaytProducts, 'clear');

      sayt.hideSayt();

      expect(debouncedRequestSaytProductsClear).to.be.called;
    });
  });

  describe('hideCorrectSayt()', () => {
    let hideSayt;
    let event;

    beforeEach(() => {
      hideSayt = stub(sayt, 'hideSayt');
      event = { a: 'a' };
    });

    it('should call hideSayt() when event specifies correct searchbox ID ', () => {
      const isCorrectSayt = stub(sayt, 'isCorrectSayt').returns(true);

      sayt.hideCorrectSayt(event);

      expect(isCorrectSayt).to.be.calledOnceWith(event);
      expect(hideSayt).to.be.calledOnce;
    });

    it('should not call hideSayt() when event specifies wrong searchbox ID', () => {
      const isCorrectSayt = stub(sayt, 'isCorrectSayt').returns(false);

      sayt.hideCorrectSayt(event);

      expect(isCorrectSayt).to.be.calledOnceWith(event);
      expect(hideSayt).to.not.be.called;
    });
  });

  describe('requestSayt()', () => {
    let dispatchEvent;
    let query;

    beforeEach(() => {
      query = 'some-query';
      sayt.minSearchLength = 3;
      dispatchEvent = stub(sayt, 'dispatchEvent');
    });

    it('should not dispatch an event if query length is sufficiently short', () => {
      query = 'ab';

      sayt.requestSayt(query);

      expect(dispatchEvent).to.not.be.called;
    });

    it('should request sayt autocomplete terms and products', () => {
      const debouncedRequestSaytAutocompleteTerms = stub(sayt, 'debouncedRequestSaytAutocompleteTerms');
      const debouncedRequestSaytProducts = stub(sayt, 'debouncedRequestSaytProducts');

      sayt.requestSayt(query);

      expect(debouncedRequestSaytAutocompleteTerms).to.be.calledWith(query);
      expect(debouncedRequestSaytProducts).to.be.calledWith(query);
    });
  });

  describe('setDebouncedMethods()', () => {
    it('should set debounced methods for requestSaytAutocompleteTerms() and requestSaytProducts()', () => {
      const debounce = stub(Debounce, 'debounce');
      const delay = sayt.debounce = 200;
      const debouncedRequestSaytAutocompleteTerms = () => 123;
      const debouncedRequestSaytProducts = () => 456;
      debounce.withArgs(sayt.requestSaytAutocompleteTerms, delay, false).returns(debouncedRequestSaytAutocompleteTerms);
      debounce.withArgs(sayt.requestSaytProducts, delay, false).returns(debouncedRequestSaytProducts);

      sayt.setDebouncedMethods();

      expect(sayt.debouncedRequestSaytAutocompleteTerms).to.equal(debouncedRequestSaytAutocompleteTerms);
      expect(sayt.debouncedRequestSaytProducts).to.equal(debouncedRequestSaytProducts);
    });
  });

  describe('handleAutocompleteTermHover()', () => {
    let isCorrectSayt;

    beforeEach(() => {
      isCorrectSayt = stub(sayt, 'isCorrectSayt');
    });

    it('should call debouncedRequestSaytProducts() with the event query if the event and component groups match', () => {
      const group = sayt.group = 'group';
      const debouncedRequestSaytProducts = stub(sayt, 'debouncedRequestSaytProducts');
      const query = 'some-query';
      const event = { detail: { query, group } };
      isCorrectSayt.returns(true);

      sayt.handleAutocompleteTermHover(event);
      sayt.debouncedRequestSaytProducts.flush();

      expect(debouncedRequestSaytProducts).to.be.calledWith(query);
    });

    it('should not call debouncedRequestSaytProducts() with the event query if the event and component groups do not match', () => {
      const debouncedRequestSaytProducts = stub(sayt, 'debouncedRequestSaytProducts');
      const query = 'some-query';
      const event = { detail: { query, group: 'other-group' } };
      sayt.group = 'group';
      isCorrectSayt.returns(false);

      sayt.handleAutocompleteTermHover(event);
      sayt.debouncedRequestSaytProducts.flush();

      expect(debouncedRequestSaytProducts).to.not.be.called;
    });
  });

  describe('dispatchRequestEvent()', () => {
    it('should dispatch an event with a payload that includes the query, the group property, and config', () => {
      const eventName = 'some-event-name';
      const group = sayt.group = 'some-group-name';
      const area = sayt.area = 'some-area';
      const collection = sayt.collection = 'some-collection';
      const query = 'some-query';
      const eventObj = { a: 'a' };
      const customEvent = stub(window, 'CustomEvent').returns(eventObj);
      const dispatchEvent = stub(sayt, 'dispatchEvent');

      sayt.dispatchRequestEvent(eventName, query);

      expect(customEvent).to.be.calledWith(eventName, {
        detail: {
          query,
          group,
          config: {
            area,
            collection,
          },
        },
        bubbles: true,
      });
      expect(dispatchEvent).to.be.calledWith(eventObj);
    });
  });

  describe('requestSaytAutocompleteTerms()', () => {
    it('should dispatch an autocomplete request event with the query', () => {
      const dispatchRequestEvent = stub(sayt, 'dispatchRequestEvent');
      const query = 'some-query';

      sayt.requestSaytAutocompleteTerms(query);
      // invoke debounced function immediately
      sayt.debouncedRequestSaytAutocompleteTerms.flush();

      expect(dispatchRequestEvent).to.be.calledWith(AUTOCOMPLETE_REQUEST, query);
    });
  });

  describe('requestSaytProducts()', () => {
    it('should dispatch a products request event with the query', () => {
      const query = 'some-query';
      const dispatchRequestEvent = stub(sayt, 'dispatchRequestEvent');

      sayt.requestSaytProducts(query);
      // invoke debounced function immediately
      sayt.debouncedRequestSaytProducts.flush();

      expect(dispatchRequestEvent).to.be.calledWith(SAYT_PRODUCTS_REQUEST, query);
    });
  });

  describe('processSearchboxInput()', () => {
    it('should trigger a Sayt request', () => {
      const value = 'some-value';
      const event = {
        target: { value },
      };
      const requestSayt = stub(sayt, 'requestSayt');

      sayt.processSearchboxInput(event);

      expect(requestSayt).to.be.calledWith(value);
    });
  });

  describe('processElementsSearchboxChange()', () => {
    let term;
    let event;
    let isCorrectSayt;
    let requestSayt;

    beforeEach(() => {
      term = 'some-term';
      event = { detail: { term } };
      isCorrectSayt = stub(sayt, 'isCorrectSayt');
      requestSayt = stub(sayt, 'requestSayt');
    });

    it('should trigger a Sayt request if the event and component groups match', () => {
      isCorrectSayt.returns(true);

      sayt.processElementsSearchboxChange(event);

      expect(requestSayt).to.be.calledWith(term);
    });

    it('should not trigger a Sayt request if the event and component groups do not match', () => {
      isCorrectSayt.returns(false);

      sayt.processElementsSearchboxChange(event);

      expect(requestSayt).to.not.be.called;
    });
  });

  describe('isCorrectSayt()', () => {
    it('should return true if the event provides the correct group name', () => {
      const group = sayt.group = 'some-group-name';
      const event = { detail: { group } };

      const result = sayt.isCorrectSayt(event);

      expect(result).to.be.true;
    });

    it('should return false if the event provides the wrong group name', () => {
      const event = { detail: { group: 'wrong-group-name' } };
      sayt.group = 'correct-group-name';

      const result = sayt.isCorrectSayt(event);

      expect(result).to.be.false;
    });

    it('should use an empty string for comparison if the event group name is undefined', () => {
      const event = { detail: {} };
      sayt.group = '';

      const result = sayt.isCorrectSayt(event);

      expect(result).to.be.true;
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

  describe('updateSearchTerm()', () => {
    const newSearchTerm = 'new value';
    let receivedEvent;

    beforeEach(() => {
      receivedEvent = { detail: { newSearchTerm }};
    });

    it('should update its searchbox directly', () => {
      const searchbox = { value: 'old value' };
      const searchboxId = sayt.searchbox = 'searchbox-id';
      stub(document, 'getElementById').withArgs(searchboxId).returns(searchbox);

      sayt.updateSearchTerm(receivedEvent);

      expect(searchbox.value).to.equal(newSearchTerm);
    });

    it('should emit a searchbox update event if it has no searchbox', () => {
      const group = sayt.group = 'sayt-group';
      const payload = {
        group,
        term: newSearchTerm,
      }
      const dispatchElementsEvent = stub(sayt, 'dispatchElementsEvent');
      sayt.searchbox = undefined;

      sayt.updateSearchTerm(receivedEvent);

      expect(dispatchElementsEvent).to.be.calledWith(UPDATE_SEARCH_TERM, payload);
    });

    it('should reject non-string values for the new search term');
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
    ['Escape', 'Esc'].forEach((key) => {
      describe(key, () => {
        it('should hide SAYT', () => {
          const event: any = { key };
          const hideSayt = stub(sayt, 'hideSayt');

          sayt.processKeyEvent(event);

          expect(hideSayt).to.be.called;
        });
      });
    });

    it('should not do anything when any other key is pressed', () => {
      const event: any = { key: 'j' };
      const event2: any = { key: 'Enter' };
      const event3: any = { key: 'Space' };
      const hideSayt = stub(sayt, 'hideSayt');

      sayt.processKeyEvent(event);
      sayt.processKeyEvent(event2);
      sayt.processKeyEvent(event3);

      expect(hideSayt).to.not.be.called;
    });
  });

  describe('changeSelection()', () => {
    ['ArrowUp', 'Up'].forEach((key) => {
      describe(key, () => {
        it('should select the previous autocomplete item', () => {
          const selectPreviousAutocompleteTerm = stub(sayt, 'selectPreviousAutocompleteTerm');
          const event: any = { key };

          sayt.changeSelection(event);

          expect(selectPreviousAutocompleteTerm).to.be.called;
        });
      });
    });

    ['ArrowDown', 'Down'].forEach((key) => {
      describe(key, () => {
        it('should select the previous autocomplete item', () => {
          const selectNextAutocompleteTerm = stub(sayt, 'selectNextAutocompleteTerm');
          const event: any = { key };

          sayt.changeSelection(event);

          expect(selectNextAutocompleteTerm).to.be.called;
        });
      });
    });
  });

  describe('selectPreviousAutocompleteTerm()', () => {
    const searchbox = 'a-selected';
    const selectedId = 'selected';
    let selectPrevious;
    let setAttribute;

    beforeEach(() => {
      selectPrevious = spy();
      setAttribute = spy();
      sayt.searchbox = searchbox;
      sayt.visible = true;
      stub(sayt, 'querySelector')
        .withArgs('[data-gbe-ref="autocomplete"]')
        .returns({ selectedId, selectPrevious });
      stub(document, 'getElementById').withArgs(searchbox).returns({ setAttribute });
    });

    it('should make the component visible', () => {
      const showSayt = stub(sayt, 'showSayt');
      sayt.visible = false;

      sayt.selectPreviousAutocompleteTerm();

      expect(showSayt).to.be.called;
    });

    it('should select the previous autocomplete item', () => {
      sayt.selectPreviousAutocompleteTerm();

      expect(selectPrevious).to.be.called;
    });

    it('should set the aria-activedescendant attribute on the searchbox', () => {
      sayt.selectPreviousAutocompleteTerm();

      expect(setAttribute).to.be.calledWith('aria-activedescendant', selectedId);
    });

    it('should not throw when there is no autocomplete', () => {
      sayt.querySelector.restore();
      stub(sayt, 'querySelector')
        .withArgs('[data-gbe-ref="autocomplete"]')
        .returns(null);

      const callback = () => sayt.selectPreviousAutocompleteTerm();

      expect(callback).to.not.throw();
    });

    it('should not throw when the searchbox property is not set', () => {
      sayt.searchbox = '';

      const callback = () => sayt.selectPreviousAutocompleteTerm();

      expect(callback).to.not.throw();
    });

    it('should not throw when there is no searchbox', () => {
      (document.getElementById as any).restore();
      stub(document, 'getElementById')
        .withArgs(searchbox)
        .returns(null);

      const callback = () => sayt.selectPreviousAutocompleteTerm();

      expect(callback).to.not.throw();
    });
  });

  describe('selectNextAutocompleteTerm()', () => {
    const searchbox = 'a-selected';
    const selectedId = 'selected';
    let selectNext;
    let setAttribute;

    beforeEach(() => {
      selectNext = spy();
      setAttribute = spy();
      sayt.searchbox = searchbox;
      sayt.visible = true;
      stub(sayt, 'querySelector')
        .withArgs('[data-gbe-ref="autocomplete"]')
        .returns({ selectedId, selectNext });
      stub(document, 'getElementById').withArgs(searchbox).returns({ setAttribute });
    });

    it('should make the component visible', () => {
      const showSayt = stub(sayt, 'showSayt');
      sayt.visible = false;

      sayt.selectNextAutocompleteTerm();

      expect(showSayt).to.be.called;
    });

    it('should select the next autocomplete item', () => {
      sayt.selectNextAutocompleteTerm();

      expect(selectNext).to.be.called;
    });

    it('should set the aria-activedescendant attribute on the searchbox', () => {
      sayt.selectNextAutocompleteTerm();

      expect(setAttribute).to.be.calledWith('aria-activedescendant', selectedId);
    });

    it('should not throw when there is no autocomplete', () => {
      sayt.querySelector.restore();
      stub(sayt, 'querySelector')
        .withArgs('[data-gbe-ref="autocomplete"]')
        .returns(null);

      const callback = () => sayt.selectNextAutocompleteTerm();

      expect(callback).to.not.throw();
    });

    it('should not throw when the searchbox property is not set', () => {
      sayt.searchbox = '';

      const callback = () => sayt.selectNextAutocompleteTerm();

      expect(callback).to.not.throw();
    });

    it('should not throw when there is no searchbox', () => {
      (document.getElementById as any).restore();
      stub(document, 'getElementById')
        .withArgs(searchbox)
        .returns(null);

      const callback = () => sayt.selectNextAutocompleteTerm();

      expect(callback).to.not.throw();
    });
  });

  describe('render()', () => {
    it('should return an instance of TemplateResult', () => {
      const result = sayt.render();

      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });
});
