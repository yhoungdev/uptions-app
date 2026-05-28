export type QueryValue = boolean | null | number | string | undefined;

export type RequestOptions = Omit<RequestInit, "body" | "method"> & {
	body?: unknown;
	query?: Record<string, QueryValue | QueryValue[]>;
	timeoutMs?: number;
};

export type ApiServiceConfig = {
	baseUrl?: string;
	getAccessToken?: () => Promise<string | undefined> | string | undefined;
	headers?: HeadersInit;
	timeoutMs?: number;
};

export type HttpMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";

export type ApiResponse<TData> = {
	message: string;
	data: TData;
	status_code: number;
};

export type WaitlistRequest = {
	email: string;
};

export type WaitlistResponse = {
	email: string;
};
