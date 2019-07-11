import { expect } from './utils';
import { List } from '../src/list';
import Base from '@sfx/base';
import { TemplateResult } from 'lit-element';

describe('List component', () => {
  it('should extend Base', () => {
    const list = new List();
    expect(list).to.be.an.instanceof(Base);
  });

  let list: any = {};
  beforeEach(() => {
    list = new List();
  });

  describe('title property', () => {
    it('should default to an empty string', () => {
      expect(list.title).to.equal('');
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

