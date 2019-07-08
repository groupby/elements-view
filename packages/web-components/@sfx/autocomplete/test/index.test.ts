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
    console.log('in listen for events')
    // const autocompleteDataReceivedEvent = new CustomEvent('autocomplete_received_results', { detail: [{"title":"Brands","items":[{"label":"Cats"},{"label":"Dogs"}]},{"title":"default","items":[{"label":"Cars"},{"label":"Bikes"}]}],
    // bubbles: true });
    let receivedResultsStub = stub(autocomplete, 'receivedResults');
    let dispatchEvent = stub(window, 'dispatchEvent');
    dispatchEvent('autocompleteDataReceivedEvent', { detail: [{"title":"Brands","items":[{"label":"Cats"},{"label":"Dogs"}]},{"title":"default","items":[{"label":"Cars"},{"label":"Bikes"}]}])
    expect(receivedResultsStub.called).to.equal(true);
  })

  // describe('recievedResults', () => {
  //   let autocompleteDataReceivedEventStub;
  //   beforeEach(() => {
  //     autocompleteDataReceivedEventStub = stub(window, 'autocompleteDataReceivedEvent').returns(false);
  //   })
  //   // let autocomplete: any = {};
  //   // let autocompleteDataReceivedEventSpy;
  //   // const autocompleteDataReceivedEvent = new CustomEvent('autocomplete_received_results', { detail: [{"title":"Brands","items":[{"label":"Cats"},{"label":"Dogs"}]},{"title":"default","items":[{"label":"Cars"},{"label":"Bikes"}]}],
  //   // bubbles: true });
  //   // beforeEach(() => {
  //   //   autocomplete = new Autocomplete();
  //   //   autocompleteDataReceivedEventSpy.spy();
  //   //   window.('')
  //   // })
  //   // it('should get emitted events', () => {

  //   // })
  //   it('should update results array')
  })

