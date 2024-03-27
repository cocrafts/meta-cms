import type { Request as OriginalRequest } from 'express';
import type { Response as OriginalResponse } from 'express';
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export type Request = OriginalRequest & {
	decodedToken: DecodedIdToken;
};

export type Response = OriginalResponse;
