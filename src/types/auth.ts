import type { JWTPayload } from 'jose';

type JWTPayloadData = {
	ver: string;
	email: string;
	tid: string;
	aio: string;
};

export type JWTPayloadCustom = JWTPayload & JWTPayloadData;

export type AuthInfo = {
	uploaderEmail: string;
	sub: string;
};
