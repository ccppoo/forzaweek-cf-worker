import { BAD_RESPONSE, SERVER_ERROR, createOptionResponse } from '@/responses';
import { Env } from '@/env';
import { uploadImageToServer } from '@/methods/post';
import { deleteImageFromServer } from '@/methods/delete';
import { verifyAuthentication } from '@/jwt';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		switch (request.method) {
			case 'POST':
				break;
			case 'DELETE':
				break;
			case 'OPTIONS': {
				return createOptionResponse(env.CORS_ALLOW);
			}
			default:
				return BAD_RESPONSE.METHOD_NOT_ALLOWED();
		}

		const authInfo = await verifyAuthentication(request, env);

		if (!authInfo) return BAD_RESPONSE.UNAUTHORIZED();

		try {
			switch (request.method) {
				case 'POST': {
					return await uploadImageToServer(request, env, authInfo);
				}
				case 'DELETE': {
					return await deleteImageFromServer(request, env, authInfo);
				}
			}
		} catch (error) {
			// TODO: add logging, notification message for management
			console.log(`error : ${error}`);
		}

		return SERVER_ERROR.INTERNAL_SERVER_ERROR();
	},
};
