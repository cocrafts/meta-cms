import { json } from 'body-parser';
import cors from 'cors';

import { checkToken } from './middleware/checkToken';

export const configure = async (express) => {
	const app = express();
	app.use(json());
	app.use(cors());

	app.post('/api/signin', checkToken, (req, res) => {
		res.json(req.decodedToken);
	});

	return app;
};
