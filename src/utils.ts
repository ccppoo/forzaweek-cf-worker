import { v4 as UUID_V4 } from 'uuid';

function get_CORS_ALLOW_header(CORS_ALLOW: string) {
	return { 'Access-Control-Allow-Origin': CORS_ALLOW };
}

function getFileKeyFromURL(url: URL): string {
	const requestURLpath = url.pathname;
	const key = requestURLpath.startsWith('/') ? requestURLpath.slice(1) : requestURLpath;
	return key;
}

function generateFileKey(keyPrefix: string, fileExt: string): string {
	const keyName = `${UUID_V4()}.${fileExt}`;
	const fileKey = [keyPrefix, keyName].join('/');

	return fileKey;
}

async function retrieveImageFile(request: Request): Promise<File | undefined> {
	// check it's multipart/form-data
	const contentType = request.headers.get('content-type');
	if (!contentType) return;
	if (!contentType.includes('multipart/form-data')) return;

	const _uploadFile = (await request.formData()).get('file'); // 따로 읽
	if (!_uploadFile) return;
	const uploadFile = _uploadFile as unknown as File; // File 맞음

	return uploadFile;
}

export { get_CORS_ALLOW_header, getFileKeyFromURL, generateFileKey, retrieveImageFile };
