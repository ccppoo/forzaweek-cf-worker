import { Env } from '@/env';
import type { AuthInfo } from '@/types';
import { BAD_RESPONSE } from '@/responses';
import { createSuccessResponse } from '@/responses/good';
import { get_CORS_ALLOW_header, generateFileKey, retrieveImageFile } from '@/utils';

export async function uploadImageToServer(
	request: Request,
	env: Env,
	authInfo: AuthInfo
): Promise<Response> {
	const imageFile: File | undefined = await retrieveImageFile(request);
	if (!imageFile) return BAD_RESPONSE.FORBIDDEN();

	const [fileName, ext] = imageFile.type.split('/');

	const fileKey = generateFileKey(env.USER_UPLOAD_KEY_PATH, ext);

	// 대부분의 시간이 put object에 쓰임 - 실제로 클라우드 상에서 얼마나 걸릴지 모르겠음
	const putObject = await env.forzacdnBucket.put(fileKey, imageFile, {
		httpMetadata: {},
		customMetadata: authInfo,
	});
	const timestamp = new Date(putObject.uploaded).getTime();
	const filePublicURL: string = `${env.URL_BASE}/${putObject.key}`;
	const resp = createSuccessResponse(filePublicURL, timestamp, putObject.size);
	const corsAllow = get_CORS_ALLOW_header(env.CORS_ALLOW);
	return Response.json(resp, {
		headers: { ...corsAllow },
	});
}
