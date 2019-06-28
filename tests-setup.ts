import { use } from 'chai';
import { restore } from 'sinon';
import * as sinonChai from 'sinon-chai';

module.exports = () => {
  use(sinonChai);

  afterEach(() => {
    restore();
  })
};
