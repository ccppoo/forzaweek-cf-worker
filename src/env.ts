export interface Env {
	TOKEN_ISSUER: string;
	TOKEN_AUDIENCE: string;
	URL_BASE: string;
	forzacdnBucket: R2Bucket;
	CORS_ALLOW: string;
	USER_UPLOAD_KEY_PATH: string;
}
