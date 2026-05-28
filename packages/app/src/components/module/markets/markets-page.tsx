import { Bolt, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ViewToggle } from "@/components/module/app-shell/product-shell.tsx";
import { Typography } from "@/components/typography/typography.tsx";
import { usePolymarketMarkets } from "@/hooks/use-polymarket-markets.ts";
import { cn } from "@/lib/utils.ts";
import { marketCategories } from "@/packages/markets/markets-data.ts";
import type { PolymarketMarket } from "@/packages/types/market.types.ts";

export function MarketsPage() {
	const [activeCategory, setActiveCategory] =
		useState<(typeof marketCategories)[number]>("All");
	const [search, setSearch] = useState("");
	const { error, isLoading, markets } = usePolymarketMarkets();

	const normalizedMarkets = useMemo(
		() => markets.map(normalizeMarket),
		[markets],
	);

	const filteredMarkets = useMemo(() => {
		const searchValue = search.trim().toLowerCase();

		return normalizedMarkets.filter((market) => {
			const matchesCategory =
				activeCategory === "All" || market.category === activeCategory;
			const matchesSearch =
				searchValue.length === 0 ||
				market.title.toLowerCase().includes(searchValue);

			return matchesCategory && matchesSearch;
		});
	}, [activeCategory, normalizedMarkets, search]);

	return (
		<DashboardLayout contentClassName="px-5 py-10 sm:px-8">
			<div className="w-full text-white">
				<section className="border-b border-white/10 pb-5">
					<div className="flex items-start justify-between gap-4">
						<div>
							<Typography className="text-white" variant="h2">
								Markets
							</Typography>
							<Typography className="mt-1 text-white/55" variant="bodySm">
								Binary prediction markets - trade YES or NO outcomes
							</Typography>
						</div>
						<ViewToggle />
					</div>

					<div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
						<label className="flex h-10 w-full max-w-[360px] items-center gap-3 text-white/55">
							<Search className="size-5" />
							<input
								className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/55"
								onChange={(event) => setSearch(event.target.value)}
								placeholder="Search markets..."
								type="search"
								value={search}
							/>
						</label>
						<div className="flex flex-wrap gap-3">
							{marketCategories.map((category) => (
								<button
									className={cn(
										"h-9 px-4 text-sm font-medium",
										category === activeCategory
											? "bg-white text-black"
											: "bg-transparent text-white hover:bg-white/8",
									)}
									key={category}
									onClick={() => setActiveCategory(category)}
									type="button"
								>
									{category}
								</button>
							))}
						</div>
					</div>
				</section>

				<section className="grid gap-3 py-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
					{isLoading && (
						<>
							<MarketCardSkeleton />
							<MarketCardSkeleton />
							<MarketCardSkeleton />
							<MarketCardSkeleton />
						</>
					)}

					{!isLoading && error && (
						<div className="border border-danger/40 bg-danger/10 p-5 md:col-span-2 xl:col-span-3 2xl:col-span-4">
							<Typography className="text-danger" variant="h3">
								Unable to load markets
							</Typography>
							<Typography className="mt-2 text-white/60" variant="bodySm">
								{error}
							</Typography>
						</div>
					)}

					{!isLoading && !error && filteredMarkets.length === 0 && (
						<div className="border border-white/10 bg-app-card p-5 md:col-span-2 xl:col-span-3 2xl:col-span-4">
							<Typography className="text-white" variant="h3">
								No markets found
							</Typography>
							<Typography className="mt-2 text-white/55" variant="bodySm">
								Try a different search or category.
							</Typography>
						</div>
					)}

					{!isLoading &&
						!error &&
						filteredMarkets.map((market) => (
							<MarketCard key={market.id} market={market} />
						))}
				</section>
			</div>
		</DashboardLayout>
	);
}

type Market = {
	category: (typeof marketCategories)[number];
	change: string;
	id: string;
	image: string | null;
	no: string;
	positive: boolean;
	title: string;
	volume: string;
	yes: string;
};

function MarketCard({ market }: { market: Market }) {
	return (
		<article className="border border-white/10 bg-app-card p-4">
			{market.image && (
				<img
					alt=""
					className="mb-4 aspect-[16/9] w-full object-cover"
					src={market.image}
				/>
			)}
			<div className="flex items-start justify-between gap-4">
				<div>
					<span className="border border-white/10 bg-white/[0.02] px-2 py-0.5 text-sm text-white">
						{market.category}
					</span>
					<Typography className="mt-4 text-white" variant="h3">
						{market.title}
					</Typography>
				</div>
				<Typography
					className={market.positive ? "text-success" : "text-danger"}
					variant="label"
				>
					{market.positive ? "↗" : "↘"} {market.change}
				</Typography>
			</div>

			<div className="mt-10 grid grid-cols-2 gap-2">
				<OutcomeCard label="YES" value={market.yes} tone="yes" />
				<OutcomeCard label="NO" value={market.no} tone="no" />
			</div>

			<div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
				<Typography className="text-white/55" variant="bodySm">
					Vol: {market.volume}
				</Typography>
				<a
					className="inline-flex items-center gap-3 text-sm font-semibold text-white no-underline hover:text-primary"
					href="/builder"
				>
					<Bolt className="size-5" />
					Trade
				</a>
			</div>
		</article>
	);
}

function OutcomeCard({
	label,
	tone,
	value,
}: {
	label: string;
	tone: "no" | "yes";
	value: string;
}) {
	return (
		<div
			className={cn(
				"border p-3",
				tone === "yes"
					? "border-success/45 bg-success/8"
					: "border-danger/45 bg-danger/10",
			)}
		>
			<Typography className="text-white/55" variant="caption">
				{label}
			</Typography>
			<Typography
				className={cn(
					"mt-1 text-2xl font-bold",
					tone === "yes" ? "text-success" : "text-danger",
				)}
				variant="h2"
			>
				{value}
			</Typography>
		</div>
	);
}

function MarketCardSkeleton() {
	return (
		<article className="border border-white/10 bg-app-card p-4">
			<div className="aspect-[16/9] w-full animate-pulse bg-white/8" />
			<div className="mt-4 h-5 w-24 animate-pulse bg-white/8" />
			<div className="mt-4 h-7 w-4/5 animate-pulse bg-white/8" />
			<div className="mt-10 grid grid-cols-2 gap-2">
				<div className="h-[82px] animate-pulse border border-white/10 bg-white/8" />
				<div className="h-[82px] animate-pulse border border-white/10 bg-white/8" />
			</div>
			<div className="mt-5 h-5 w-32 animate-pulse bg-white/8" />
		</article>
	);
}

function normalizeMarket(market: PolymarketMarket): Market {
	const [yesPrice, noPrice] = parsePricePair(market.outcomePrices);
	const change = market.oneDayPriceChange ?? market.oneWeekPriceChange ?? 0;

	return {
		category: getMarketCategory(market),
		change: formatChange(change),
		id: market.id,
		image: market.image ?? market.icon ?? null,
		no: formatPrice(noPrice ?? getNoPrice(market)),
		positive: change >= 0,
		title: market.question ?? market.title ?? "Untitled market",
		volume: formatCompactCurrency(market.volumeNum ?? market.volume),
		yes: formatPrice(yesPrice ?? market.lastTradePrice ?? market.bestBid),
	};
}

function parsePricePair(value: PolymarketMarket["outcomePrices"]) {
	const prices = parseStringArray(value).map((price) => Number(price));

	return [
		Number.isFinite(prices[0]) ? prices[0] : null,
		Number.isFinite(prices[1]) ? prices[1] : null,
	] as const;
}

function parseStringArray(value: string | string[] | undefined) {
	if (Array.isArray(value)) {
		return value;
	}

	if (!value) {
		return [];
	}

	try {
		const parsed = JSON.parse(value);

		return Array.isArray(parsed) ? parsed.map(String) : [];
	} catch {
		return [];
	}
}

function getNoPrice(market: PolymarketMarket) {
	if (typeof market.lastTradePrice === "number") {
		return 1 - market.lastTradePrice;
	}

	if (typeof market.bestAsk === "number") {
		return 1 - market.bestAsk;
	}

	return undefined;
}

function getMarketCategory(
	market: PolymarketMarket,
): (typeof marketCategories)[number] {
	const feeType = market.feeType?.toLowerCase() ?? "";
	const text = `${market.question ?? ""} ${market.title ?? ""}`.toLowerCase();

	if (feeType.includes("crypto") || text.includes("bitcoin")) {
		return "Crypto";
	}

	if (
		feeType.includes("sports") ||
		text.includes("nba") ||
		text.includes("nhl")
	) {
		return "Sports";
	}

	if (
		text.includes("president") ||
		text.includes("trump") ||
		text.includes("election")
	) {
		return "Politics";
	}

	if (
		text.includes("fed") ||
		text.includes("rate") ||
		text.includes("inflation") ||
		text.includes("recession")
	) {
		return "Economics";
	}

	return "All";
}

function formatPrice(value: number | undefined) {
	if (typeof value !== "number" || !Number.isFinite(value)) {
		return "$0.00";
	}

	return `$${value.toFixed(value < 0.01 ? 3 : 2)}`;
}

function formatChange(value: number) {
	const percentage = value * 100;
	const sign = percentage >= 0 ? "+" : "";

	return `${sign}${percentage.toFixed(1)}%`;
}

function formatCompactCurrency(value: number | string | undefined) {
	const numberValue =
		typeof value === "string" ? Number.parseFloat(value) : value;

	if (typeof numberValue !== "number" || !Number.isFinite(numberValue)) {
		return "$0";
	}

	return new Intl.NumberFormat("en-US", {
		compactDisplay: "short",
		currency: "USD",
		maximumFractionDigits: 1,
		notation: "compact",
		style: "currency",
	}).format(numberValue);
}
