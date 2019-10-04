import { TemplateResult, LitElement } from 'lit-element';
import { expect } from '../utils';
import List from '../../src/list';

describe('List component', () => {
  let list;

  beforeEach(() => {
    list = new List();
  });

  it('should extend Base', () => {
    expect(list).to.be.an.instanceof(LitElement);
  });

  describe('caption property', () => {
    it('should default to an empty string', () => {
      expect(list.caption).to.equal('');
    });
  });

  describe('items property', () => {
    it('should default to an empty array', () => {
      expect(list.items).to.deep.equal([]);
    });
  });

  describe('render function', () => {
    it('should return an instance of TemplateResult', () => {
      const result = list.render();

      expect(result).to.be.an.instanceof(TemplateResult);
    });
  });
});
