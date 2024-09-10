const INTERNAL_SERVER_ERROR = () =>
	new Response('Internal Server Error', {
		status: 500,
	});

const SERVICE_UNAVAILABLE = () =>
	new Response('Service Unavailable', {
		status: 503,
	});

export { INTERNAL_SERVER_ERROR, SERVICE_UNAVAILABLE };
