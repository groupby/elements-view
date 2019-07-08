  import { expect, spy, stub } from './utils';
  import { Autocomplete } from '../src/index';
  
  describe('Autcomplete Component', () => {
    let autocomplete: any = {};
    beforeEach(() => {
      autocomplete = new Autocomplete();
    })
  
    it('should have property results', () => {
      expect(autocomplete).to.have.property('results');
    });
  
    it('should expose methods', () => {
      const methods = [
        'receivedResults'
      ];
      methods.forEach((method) => {
        it(`should expose: ${method}()`, () => {
          expect(autocomplete[method]).to.be.a('function');
        });
      })
    })
  
    it('should call methods in response to events', () => {
      let receivedResultsStub = stub(autocomplete, 'receivedResults')
      window.addEventListener('autocompleteDataReceivedEvent', receivedResultsStub)
      const autocompleteDataReceivedEvent = new CustomEvent('autocompleteDataReceivedEvent', {
        detail: [{ "title": "Brands", "items": [{ "label": "Cats" }, { "label": "Dogs" }] }, { "title": "default", "items": [{ "label": "Cars" }, { "label": "Bikes" }] }],
        bubbles: true
      });
      window.dispatchEvent(autocompleteDataReceivedEvent);
      expect(receivedResultsStub.called).to.equal(true);
      receivedResultsStub.restore();
    })
  
  
    describe('HTML', () => {
      it('should call a render function', () => {
        const renderStub = stub(autocomplete, 'render');
        autocomplete.render()
        expect(renderStub.called).to.equal(true);
      });
  
      it('should render the sfx-list element', () => {
        autocomplete.render()
        expect()
      })
    })
  
  
    describe('receivedResults', () => {
      it('should update the results property in response to data received', () => {
        window.addEventListener('autocompleteDataReceivedEvent', autocomplete.receivedResults)
        const autocompleteDataReceivedEvent = new CustomEvent('autocompleteDataReceivedEvent', {
          detail: [{ "title": "Brands", "items": [{ "label": "Cats" }, { "label": "Dogs" }] }, { "title": "default", "items": [{ "label": "Cars" }, { "label": "Bikes" }] }],
          bubbles: true
        });
        window.dispatchEvent(autocompleteDataReceivedEvent);
        expect(autocomplete).to.have.deep.property('results', [{ "title": "Brands", "items": [{ "label": "Cats" }, { "label": "Dogs" }] }, { "title": "default", "items": [{ "label": "Cars" }, { "label": "Bikes" }] }])
      })
    })
  
  })
