import { json } from 'body-parser';
import cors from 'cors';

import { verifyToken } from './middleware/verifyToken';

export const configure = async (express) => {
	const app = express();
	app.use(json());
	app.use(cors());

	app.post('/api/signin', verifyToken, (req, res) => {
		res.json(req.decodedToken);
	});

	return app;
};
