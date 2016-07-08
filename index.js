import Demo from './ledger/ledger_demo';
import config from './ledger/config';

const demo = new Demo(config);
demo.start();
