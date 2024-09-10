const UNAUTHORIZED = () =>
	new Response('Unauthorized', {
		status: 401,
	});

const FORBIDDEN = () =>
	new Response('Forbidden', {
		status: 403,
	});

const METHOD_NOT_ALLOWED = () =>
	new Response('Method Not Allowed', {
		status: 405,
		headers: {
			Allow: 'POST, DELETE, OPTIONS',
		},
	});

export { UNAUTHORIZED, FORBIDDEN, METHOD_NOT_ALLOWED };
