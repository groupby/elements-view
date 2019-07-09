import { expect, spy, stub } from './utils';
import { List } from '../src/list';

describe('List Component', () => {
  it('should exist', () => {
    expect(typeof List).to.equal('function');
  });

  it('should be constructable', () => {
    const list = new List();
    expect(list).to.be.an.instanceof(List);
  });

  let list: any = {};
  beforeEach(() => {
    list = new List();
  })

  describe('Instance properties', () => {
    const properties: string[] = [
      'items',
      'title'
    ];

    describe('All properties', () => {
      properties.forEach((property) => {
        it(`should have \`${property}\``, () => {
          expect(typeof list[property]).to.not.be.undefined;
        });
      });
    });

    describe('title property', () => {
      it('should be of type string', () => {
        expect(list.title).to.be.a('string')
      })
    })

    describe('items property', () => {
      it('should be of type string', () => {
        expect(list.items).to.be.an('array');
      })
    })
 
  });

  describe('render function', () => {
    it('should call a render function', () => {
      const renderStub = stub(list, 'render');
      list.render()
      expect(renderStub.called).to.equal(true);
    });
    // how can I test if title is provided...
    it('testing title', () => {
      list.title = 'Test';
      list.items = ['im in an array', 'array']
      const result = list.render()
      console.log('result object test', result)
      // expect(renderStub.called).to.equal(true);
    });

    it('should return a an object', () => {
      const result = list.render();
      // console.log('result of render call', result)
      expect(result).to.be.an('object');
    })    
    it('object returned should have property type equal to html', () => {
      const renderResult = list.render();
      const renderResultType = renderResult.type
      expect(renderResultType).to.equal('html');
    });
  })
});

