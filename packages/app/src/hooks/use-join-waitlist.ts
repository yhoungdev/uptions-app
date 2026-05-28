import { useMutation } from "@tanstack/react-query";
import { waitlistService } from "@/services/waitlist.service.ts";

export function useJoinWaitlist() {
	return useMutation({
		mutationFn: waitlistService.joinWaitlist,
	});
}
