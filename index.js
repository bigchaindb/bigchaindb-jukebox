import JukeboxServices from './ledger/services';
import config from './ledger/config';

const service = new JukeboxServices(config);
service.start();


