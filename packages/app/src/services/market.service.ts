import { API_ROUTES } from "@/constant/api-routes.ts";
import type {
	ApiResponse,
	RequestOptions,
} from "@/packages/types/api.types.ts";
import type {
	PolymarketMarket,
	PolymarketMarketsQuery,
} from "@/packages/types/market.types.ts";
import { uptionsRequest } from "./api.service";

export class MarketService {
	fetchMarketData(
		query: PolymarketMarketsQuery = {},
		options?: Omit<RequestOptions, "query">,
	) {
		return uptionsRequest.GET<ApiResponse<PolymarketMarket[]>>(
			API_ROUTES.polymarket.markets,
			{
				...options,
				query: {
					active: true,
					archived: false,
					closed: false,
					limit: 24,
					...query,
				},
			},
		);
	}
}

export const marketService = new MarketService();
