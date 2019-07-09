  import { expect, spy, stub } from './utils';
  import { Autocomplete } from '../src/index';
  
  describe('Autcomplete Component', () => {
    it('should exist', () => {
      expect(typeof Autocomplete).to.equal('function');
    });

    it('should be constructable', () => {
      const autocomplete = new Autocomplete();
      expect(autocomplete).to.be.an.instanceof(Autocomplete);
    });

    let autocomplete: any = {};
    beforeEach(() => {
      autocomplete = new Autocomplete();
    })
  
    // it('should have property results', () => {
    //   expect(autocomplete).to.have.property('results');
    // });
  
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

    // it('should call a connectedCallback function', () => {
    //   const connectedCallbackStub = stub(autocomplete, 'connectedCallback');
    //   autocomplete.connectedCallback();
    //   expect(connectedCallbackStub.called).to.equal(true);
    // });

    it('should add an eventListener to the window in connectedCallback function', () => {
      spy(window, 'addEventListener');
      autocomplete.connectedCallback();
      expect(window.addEventListener).to.have.been.calledwith('autocomplete_received_results', autocomplete.receivedResults);
    });

    // // more specific?
    // it('should add an eventListener to the window in connectedCallback function', () => {
    //   spy(window, 'addEventListener');
    //   autocomplete.connectedCallback();
    //   expect(window.addEventListener('autocomplete_received_results')).to.have.been.called;
    // });

    it('should remove eventListener from the window in connectedCallback function', () => {
      spy(window, 'removeEventListener');
      autocomplete.disconnectedCallback();
      expect(window.removeEventListener).to.have.been.calledwith('autocomplete_received_results', autocomplete.receivedResults);
    });

    // it('should call a disconnectedCallback function', () => {
    //   const disconnectedCallbackStub = stub(autocomplete, 'disconnectedCallback');
    //   autocomplete.disconnectedCallback();
    //   expect(disconnectedCallbackStub.called).to.equal(true);
    // });

    // it('should call a render function', () => {
    //   const renderStub = stub(autocomplete, 'render');
    //   autocomplete.render();
    //   expect(renderStub.called).to.equal(true);
    // });

    describe('Instance properties', () => {
      const properties = [
        'results',
      ];
  
      describe('All properties', () => {
        properties.forEach((property) => {
          it(`should have \`${property}\``, () => {
            expect(typeof autocomplete[property]).to.not.be.undefined;
          });
        });
      });
    });
  
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

    describe('render function', () => {
      it('should return a an object', () => {
        const result = autocomplete.render();
        expect(typeof result).to.equal('object');
      })
      it('object returned should have property type equal to html', () => {
        const renderResult = autocomplete.render();
        const renderResultType = renderResult.type
        expect(renderResultType).to.equal('html');
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

      // it('should set the result property to an array of objects', () => {
      //   window.addEventListener('autocompleteDataReceivedEvent', autocomplete.receivedResults)
      //   const autocompleteDataReceivedEvent = new CustomEvent('autocompleteDataReceivedEvent', {
      //     detail: [{ "title": "Brands", "items": [{ "label": "Cats" }, { "label": "Dogs" }] }, { "title": "default", "items": [{ "label": "Cars" }, { "label": "Bikes" }] }],
      //     bubbles: true
      //   });
      //   window.dispatchEvent(autocompleteDataReceivedEvent);
      //   expect(autocomplete).to.have.deep.property('results', [{ "title": "Brands", "items": [{ "label": "Cats" }, { "label": "Dogs" }] }, { "title": "default", "items": [{ "label": "Cars" }, { "label": "Bikes" }] }])
      // })
    })
  
  })
