  import { expect, spy, stub } from './utils';
  import { Autocomplete } from '../src/index';
  import Base from '@sfx/base';
  import { TemplateResult } from 'lit-element';
  
  describe('Autcomplete Component', () => {
    let autocomplete;
    beforeEach(() => {
      autocomplete = new Autocomplete();
    })

    describe('extends base', () => {
      it('should extend the Base class', () => {
        expect(autocomplete).to.be.an.instanceof(Base)
      })
    })

    it('should add an eventListener to the window in connectedCallback function', () => {
      spy(window, 'addEventListener');
      autocomplete.connectedCallback();
      expect(window.addEventListener).to.have.been.calledWith('autocomplete_received_results', autocomplete.receivedResults);
    });

    it('should remove eventListener from the window in connectedCallback function', () => {
      spy(window, 'removeEventListener');
      autocomplete.disconnectedCallback();
      expect(window.removeEventListener).to.have.been.calledWith('autocomplete_received_results', autocomplete.receivedResults);
    });

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

    // test that property has default value


    describe('connectedCallback', () => {
      it('should call its super connectedCallback', () => {
        const baseConnectedCallbackStub = stub(Base.prototype, 'connectedCallback')
        autocomplete.connectedCallback();
        expect(baseConnectedCallbackStub).to.have.been.called;
      })
    });

    describe('disconnectedCallback', () => {
      it('should call its super connectedCallback', () => {
        const baseDisconnectedCallbackStub = stub(Base.prototype, 'disconnectedCallback')
        autocomplete.disconnectedCallback();
        expect(baseDisconnectedCallbackStub).to.have.been.called;
      })
    });

    describe('render function', () => {
      it('should return an instance of TemplateResult', () => {
        const result = autocomplete.render();
        expect(result).to.be.an.instanceof(TemplateResult);
      })
    })
  
    describe('receivedResults', () => {
      it('should update the results property in response to data received', () => {
        const detail = [{ "title": "Brands", "items": [{ "label": "Cats" }, { "label": "Dogs" }] }, { "title": "default", "items": [{ "label": "Cars" }, { "label": "Bikes" }] }]
          autocomplete.receivedResults({detail})
        expect(autocomplete.results).to.deep.equal(detail);
      })
      // it('should be bound to autocomplete', () => {
      //   const receivedResults = spy(autocomplete, 'receivedResults');
      //   receivedResults({detail:['b']})
      //   expect(receivedResults.firstCall.thisValue).to.equal(autocomplete);
      // })
    })
  
  })
