import { chai, sinon } from './utils';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);

afterEach(() => {
  sinon.restore();
});
