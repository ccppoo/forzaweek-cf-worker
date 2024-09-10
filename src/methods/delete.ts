import { Env } from '@/env';
import type { AuthInfo, CustomMetadata } from '@/types';
import { BAD_RESPONSE, GOOD_RESPONSE } from '@/responses';
import { isAuthorizedUser } from '@/authorize';
import { get_CORS_ALLOW_header, getFileKeyFromURL } from '@/utils';

export async function deleteImageFromServer(
	request: Request,
	env: Env,
	authInfo: AuthInfo
): Promise<Response> {
	const corsAllow = get_CORS_ALLOW_header(env.CORS_ALLOW);

	const fileKey = getFileKeyFromURL(new URL(request.url));

	const isAuthorized = await isAuthorizedUser(env, fileKey, authInfo);
	if (!isAuthorized) return BAD_RESPONSE.UNAUTHORIZED();

	try {
		await env.forzacdnBucket.delete(fileKey);
	} catch (error) {
		// TODO: add log why failed
		// 어차피 클라이언트 입장에서는 URL 잊고 살면 그만이니깐 서버 에러 코드로 보내지 않는다
	}

	return GOOD_RESPONSE.CONTENT_DELETED(corsAllow);
}
