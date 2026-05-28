import { API_ROUTES } from "@/constant/api-routes.ts";
import type {
	ApiResponse,
	WaitlistRequest,
	WaitlistResponse,
} from "@/packages/types/api.types.ts";
import { uptionsRequest } from "./api.service.ts";

export class WaitlistService {
	joinWaitlist(payload: WaitlistRequest) {
		return uptionsRequest.POST<ApiResponse<WaitlistResponse>, WaitlistRequest>(
			API_ROUTES.users.waitlist,
			payload,
		);
	}
}

export const waitlistService = new WaitlistService();
