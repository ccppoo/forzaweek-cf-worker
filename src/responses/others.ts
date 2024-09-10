export function createOptionResponse(corsAllow: string) {
	const corsHeaders = {
		'Access-Control-Allow-Origin': corsAllow,
		'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, authorization',
		'Access-Control-Max-Age': '86400',
		'content-type': 'text/plain; charset=utf-8',
	};
	return new Response(undefined, { headers: corsHeaders, status: 204 });
}
