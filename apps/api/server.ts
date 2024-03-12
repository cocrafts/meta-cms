import { admin } from 'firebase-admin';
import { json } from 'body-parser';
import cors from 'cors';

import { state } from './util';

export const configure = async (express) => {
	const app = express();
	// app.use(json());
	// app.use(cors());

	app.get('/greeting', (req, res) => {
		return res.status(200).send(`hello world ${state.counter++}!`)
	});

	return app;
};
