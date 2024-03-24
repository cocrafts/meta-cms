import { json } from 'body-parser';
import cors from 'cors';

import { prepareAuthContext } from './middleware/verifyToken';

export const configure = async (express) => {
	const app = express();
	app.use(json());
	app.use(cors());
	app.use(prepareAuthContext);

	app.post('/api/signin', (req, res) => {
		res.json(req.decodedToken);
	});

	return app;
};
