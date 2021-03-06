/**
 * Created by pb on 14/04/2017.
 */
import auth from '../auth';
import socket from '../socket';
import Connections from './Connections';
import Rooms from './Rooms';
import Users from './Users';
import Tracks from './Tracks';
import {syncDatabaseSchema} from '../data/schema';

import _debug from 'debug';

const debug = _debug('soundbounce:server');

export default class Server {
	constructor(expressApp) {
		this.app = expressApp;
	}

	init() {
		debug('Begin server init...');
		const {app} = this;

		socket(app);
		auth(app);
		syncDatabaseSchema(() => {
			app.rooms = new Rooms(app);
			app.users = new Users();
			app.tracks = new Tracks();
			app.connections = new Connections(app);
			app.ready();
			debug('Server init OK');
		});
	}
}
