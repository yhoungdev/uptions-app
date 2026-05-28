import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/components/errors/api.error.ts";
import type { PolymarketMarketsQuery } from "@/packages/types/market.types.ts";
import { marketService } from "@/services/market.service.ts";

const polymarketMarketsQueryKey = ["polymarket", "markets"] as const;

export function usePolymarketMarkets(query: PolymarketMarketsQuery = {}) {
	const marketsQuery = useQuery({
		queryFn: ({ signal }) => marketService.fetchMarketData(query, { signal }),
		queryKey: [polymarketMarketsQueryKey, query],
	});

	return {
		error:
			marketsQuery.error instanceof ApiError
				? marketsQuery.error.message
				: marketsQuery.error
					? "Unable to fetch markets"
					: null,
		isLoading: marketsQuery.isLoading,
		markets: marketsQuery.data?.data ?? [],
		refetch: marketsQuery.refetch,
	};
}
