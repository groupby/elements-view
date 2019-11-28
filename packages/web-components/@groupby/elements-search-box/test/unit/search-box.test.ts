import { TemplateResult } from 'lit-element';
import {
  SEARCHBOX_CLEAR,
  SEARCHBOX_CLICK,
  SEARCHBOX_INPUT,
  SEARCH_REQUEST,
  UPDATE_SEARCH_TERM,
} from '@groupby/elements-events';
import {
  expect,
  stub,
  itShouldExtendBase,
  itShouldCallParentMethod,
} from '../utils';
import SearchBox from '../../src/search-box';

describe('SearchBox Component', () => {
  let searchbox;
  let searchboxDispatchEvent;
  let eventObject;
  let createCustomEvent;

  beforeEach(() => {
    searchbox = new SearchBox();
    searchboxDispatchEvent = stub(searchbox, 'dispatchEvent');
    eventObject = { some: 'event' };
    createCustomEvent = stub(searchbox, 'createCustomEvent').returns(eventObject);
  });

  itShouldExtendBase(() => searchbox);

  describe('Constructor', () => {
    describe('placeholder property', () => {
      it('should have default value `Type your search`', () => {
        expect(searchbox.placeholder).to.equal('Type your search');
      });
    });

    describe('value property', () => {
      it('should have default value of an empty string', () => {
        expect(searchbox.value).to.equal('');
      });
    });

    describe('searchButton property', () => {
      it('should have default value of false', () => {
        expect(searchbox.searchButton).to.be.false;
      });
    });

    describe('clearButton property', () => {
      it('should have default value of false', () => {
        expect(searchbox.clearButton).to.be.false;
      });
    });

    describe('area property', () => {
      it('should have default value of an empty string', () => {
        expect(searchbox.area).to.equal('');
      });
    });

    describe('collection property', () => {
      it('should have default value of an empty string', () => {
        expect(searchbox.collection).to.equal('');
      });
    });

    describe('group property', () => {
      it('should have default value of an empty string', () => {
        expect(searchbox.group).to.equal('');
      });
    });
  });

  describe('connectCallback', () => {
    itShouldCallParentMethod(() => searchbox, 'connectedCallback');

    it('should add an autocomplete_hover eventListener to the window', () => {
      const windowAddEventListener = stub(window, 'addEventListener');

      searchbox.connectedCallback();

      expect(windowAddEventListener).to.have.been.calledWith(UPDATE_SEARCH_TERM, searchbox.updateSearch);
    });
  });

  describe('disconnectCallback', () => {
    itShouldCallParentMethod(() => searchbox, 'disconnectedCallback');

    it('should remove the autocomplete_hover eventListener from the window', () => {
      const windowRemoveEventListener = stub(window, 'removeEventListener');

      searchbox.disconnectedCallback();

      expect(windowRemoveEventListener).to.have.been.calledWith(
        UPDATE_SEARCH_TERM,
        searchbox.updateSearch
      );
    });
  });

  describe('emitSearchEvent', () => {
    const origin = 'search';

    it('should dispatch a search request event with empty area and collection', () => {
      const query = searchbox.value = 'a';
      searchbox.id = 'some-id';

      searchbox.emitSearchEvent();

      expect(createCustomEvent).to.be.calledWith(SEARCH_REQUEST, {
        query,
        config: {
          area: '',
          collection: '',
        },
        origin,
      });
      expect(searchboxDispatchEvent).to.be.calledWith(eventObject);
    });

    it('should dispatch a search request event with area and collection', () => {
      const query = searchbox.value = 'a';
      const area = searchbox.area = 'some-area';
      const collection = searchbox.collection = 'some-collection';
      searchbox.id = 'some-id';

      searchbox.emitSearchEvent();

      expect(createCustomEvent).to.be.calledWith(SEARCH_REQUEST, {
        query,
        config: {
          area,
          collection,
        },
        origin,
      });
      expect(searchboxDispatchEvent).to.be.calledWith(eventObject);
    });
  });

  describe('emitSearchBoxClearClick', () => {
    it('should dispatch an emitSearchBoxClearClick', () => {
      searchbox.emitSearchBoxClearClick();

      expect(createCustomEvent).to.be.calledWith(SEARCHBOX_CLEAR);
      expect(searchboxDispatchEvent).to.be.calledWith(eventObject);
    });
  });

  describe('updateSearch', () => {
    const term = 'inputText';
    const group = 'some-group';
    let updateSearchTermValue;
    let emitSearchEvent;

    beforeEach(() => {
      updateSearchTermValue = stub(searchbox, 'updateSearchTermValue');
      emitSearchEvent = stub(searchbox, 'emitSearchEvent');
    });

    it('should update the value property with data from the event when the event group matches the component group', () => {
      const inputEvent = new CustomEvent('some-test-type', { detail: { term, group } });
      searchbox.group = group;

      searchbox.updateSearch(inputEvent);

      expect(updateSearchTermValue).to.be.calledWith(term);
    });

    it('should emit a search request if event requests it and group matches', () => {
      const search = true;
      const inputEvent = new CustomEvent('some-test-type', { detail: { term, group, search } });
      searchbox.group = group;

      searchbox.updateSearch(inputEvent);

      expect(emitSearchEvent).to.be.calledOnce;
    });

    it('should not update the value or emit a search when the group in the component and the event do not match', () => {
      const inputEvent = new CustomEvent('some-test-type', { detail: { term, group } });
      searchbox.group = 'different group';

      searchbox.updateSearch(inputEvent);

      expect(updateSearchTermValue).to.not.be.called;
      expect(emitSearchEvent).to.not.be.called;
    });

    it('should not emit a search request if group matches but event does not request it', () => {
      const inputEvent = new CustomEvent('some-test-type', { detail: { term, group } });
      searchbox.group = group;

      searchbox.updateSearch(inputEvent);

      expect(emitSearchEvent).to.not.be.called;
    });

    it('should default the group in the event to an empty string if it is falsey', () => {
      const inputEvent = new CustomEvent('some-test-type', { detail: { term } });

      searchbox.updateSearch(inputEvent);

      expect(updateSearchTermValue).to.be.calledWith(term);
    });

    it('should default the group in the component to an empty string if it is falsey', () => {
      const inputEvent = new CustomEvent('some-test-type', { detail: { term, group: '' } });
      searchbox.group = undefined;

      searchbox.updateSearch(inputEvent);

      expect(updateSearchTermValue).to.be.calledWith(term);
    });
  });

  describe('handleKeydown', () => {
    it('should invoke the emitSearchEvent function if enter is pressed and value property length is greater than 0', () => {
      const emitSearchStub = stub(searchbox, 'emitSearchEvent');
      searchbox.value = 'hello';

      searchbox.handleKeydown({ key: 'Enter' });

      expect(emitSearchStub).to.have.been.called;
    });
  });

  describe('handleInput', () => {
    it('should invoke the updateSearchTermValue function with a value from the event', () => {
      const updateSearchTermValueStub = stub(searchbox, 'updateSearchTermValue');
      const searchTerm = 'dee';

      searchbox.handleInput({ target: { value: searchTerm } });

      expect(updateSearchTermValueStub).to.have.been.calledWith(searchTerm);
    });

    it('should dispatch a search box input event with a value from the event', () => {
      const searchTerm = 'dee';

      searchbox.handleInput({ target: { value: searchTerm } });

      expect(createCustomEvent).to.be.calledWith(
        SEARCHBOX_INPUT,
        { term: searchTerm }
      );
      expect(searchboxDispatchEvent).to.be.calledWith(eventObject);
    });
  });

  describe('updateSearchTermValue', () => {
    it('should set the search term property to the input value', () => {
      const searchTerm = 'catfood';

      searchbox.updateSearchTermValue(searchTerm);

      expect(searchbox.value).to.equal(searchTerm);
    });
  });

  describe('clearSearch', () => {
    it('should set the search term property to an empty string', () => {
      stub(searchbox, 'emitSearchBoxClearClick');

      searchbox.clearSearch();

      expect(searchbox.value).to.equal('');
    });

    it('should invoke the emitSearchBoxClearClick', () => {
      const emitSearchBoxStub = stub(searchbox, 'emitSearchBoxClearClick');

      searchbox.clearSearch();

      expect(emitSearchBoxStub).to.have.been.called;
    });
  });

  describe('clickExposed', () => {
    it('should dispatch a search box clicked event', () => {
      searchbox.clickExposed();

      expect(createCustomEvent).to.be.calledWith(SEARCHBOX_CLICK);
      expect(searchboxDispatchEvent).to.be.calledWith(eventObject);
    });
  });

  describe('createCustomEvent', () => {
    beforeEach(() => {
      createCustomEvent.restore();
    });

    it('should return a CustomEvent with the provided type and detail', () => {
      const type = 'event-type';
      const detail = { a: 1, b: 2 };

      const result = searchbox.createCustomEvent(type, detail);

      expect(result.type).to.equal(type);
      expect(result.detail).to.include(detail);
    });

    it('should return a CustomEvent that bubbles and has a group property', () => {
      const group = searchbox.group = 'group';

      const result = searchbox.createCustomEvent('some-type');

      expect(result.bubbles).to.be.true;
      expect(result.detail.group).to.equal(group);
    });
  });

  describe('render', () => {
    it('should return an instance of TemplateResult', () => {
      const result = searchbox.render();

      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });
});
