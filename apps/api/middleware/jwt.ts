import type { NextFunction, Request, Response } from 'express';

type AuthContextMiddlewareOptions = {
	verifyJwt: (jwt: string) => Promise<unknown>;
	contextKey: string;
};

export const authContext = ({
	verifyJwt,
	contextKey,
}: AuthContextMiddlewareOptions) => {
	return async (req: Request, _res: Response, next: NextFunction) => {
		const { authorization } = req.headers;
		const tokenParts = authorization?.split(' ');
		const idToken = tokenParts?.[1];

		if (idToken) req[contextKey] = await verifyJwt(idToken);
		next();
	};
};
