import { TemplateResult } from 'lit-element';
import { expect, itShouldExtendBase } from '../utils';
import List from '../../src/list';

describe('List component', () => {
  let list;

  beforeEach(() => {
    list = new List();
  });

  itShouldExtendBase(() => list);

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
