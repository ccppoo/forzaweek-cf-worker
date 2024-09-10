import type { ImageUploadSuccessResponse, ImageUploadFailResponse } from '@/types';

function createSuccessResponse(
	filePublicURL: string,
	timestamp: number,
	size: number
): ImageUploadSuccessResponse {
	return {
		code: 2000,
		aliveUntil: 1,
		name: 'asd',
		remoteURL: filePublicURL,
		size: size,
		time: timestamp,
	};
}

const CONTENT_DELETED = (corsAllow: object) =>
	new Response(null, { headers: { ...corsAllow }, status: 204 });

export { createSuccessResponse, CONTENT_DELETED };
