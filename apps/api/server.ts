import { json } from 'body-parser';
import cors from 'cors';

import { authContext } from './middleware/jwt';
import { auth } from './utils/firebase';
import type { Request, Response } from './utils/helper';

const authContextMiddleware = authContext({
	contextKey: 'decodedToken',
	verifyJwt: async (jwt) => auth.verifyIdToken(jwt),
});

/* eslint-disable-next-line */
export const configure = async (express: any) => {
	const app = express();

	app.use(json());
	app.use(cors());
	app.use(authContextMiddleware);

	app.post('/api/signin', (req: Request, res: Response) => {
		res.json(req.decodedToken);
	});

	return app;
};
