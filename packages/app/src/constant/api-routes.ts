const API_VERSION = "/api/v1";

const route = (path: string) => `${API_VERSION}${path}`;

export const API_ROUTES = {
	polymarket: {
		markets: route("/polymarket/markets"),
	},
	users: {
		waitlist: route("/users/waitlist"),
	},
} as const;
