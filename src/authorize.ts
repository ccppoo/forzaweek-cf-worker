import { Env } from '@/env';

import type { AuthInfo, CustomMetadata } from '@/types';

export function matchesOriginalUploader(metadata: CustomMetadata, authInfo: AuthInfo): boolean {
	// authorize
	return metadata.sub == authInfo.sub && metadata.email == authInfo.email;
}

export async function isAuthorizedUser(
	env: Env,
	fileKey: string,
	authInfo: AuthInfo
): Promise<boolean> {
	const objectHead = await env.forzacdnBucket.head(fileKey);
	const _metadata = objectHead?.customMetadata as CustomMetadata;

	return matchesOriginalUploader(_metadata, authInfo);
}
