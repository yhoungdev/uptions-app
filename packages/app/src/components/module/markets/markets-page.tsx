import { Bolt, Search } from "lucide-react";
import { DashboardLayout } from "#/components/layout/dashboard-layout";
import { ViewToggle } from "#/components/module/app-shell/product-shell.tsx";
import { Typography } from "#/components/typography/typography.tsx";
import { cn } from "#/lib/utils.ts";
import { marketCategories, markets } from "#/packages/markets/markets-data.ts";

export function MarketsPage() {
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
								placeholder="Search markets..."
								type="search"
							/>
						</label>
						<div className="flex flex-wrap gap-3">
							{marketCategories.map((category) => (
								<button
									className={cn(
										"h-9 rounded-md px-4 text-sm font-medium",
										category === "All"
											? "bg-white text-black"
											: "bg-transparent text-white hover:bg-white/8",
									)}
									key={category}
									type="button"
								>
									{category}
								</button>
							))}
						</div>
					</div>
				</section>

				<section className="grid gap-3 py-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
					{markets.map((market) => (
						<MarketCard key={market.id} market={market} />
					))}
				</section>
			</div>
		</DashboardLayout>
	);
}

type Market = (typeof markets)[number];

function MarketCard({ market }: { market: Market }) {
	return (
		<article className=" border border-white/10 bg-[#151515] p-4">
			<div className="flex items-start justify-between gap-4">
				<div>
					<span className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-0.5 text-sm text-white">
						{market.category}
					</span>
					<Typography className="mt-4 text-white" variant="h3">
						{market.title}
					</Typography>
				</div>
				<Typography
					className={market.positive ? "text-[#00d66f]" : "text-[#ff3b46]"}
					variant="label"
				>
					{market.positive ? "↗" : "↘"} {market.change}
				</Typography>
			</div>

			<div className="mt-10 grid grid-cols-2 gap-2">
				<OutcomeCard label="YES" value={market.yes} tone="yes" />
				<OutcomeCard label="NO" value={market.no} tone="no" />
			</div>

			<Sparkline path={market.path} />

			<div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
				<Typography className="text-white/55" variant="bodySm">
					Vol: {market.volume}
				</Typography>
				<a
					className="inline-flex items-center gap-3 text-sm font-semibold text-white no-underline hover:text-[#ff5a1f]"
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
				" border p-3",
				tone === "yes"
					? "border-[#00d66f]/45 bg-[#00d66f]/8"
					: "border-[#ff3b46]/45 bg-[#ff3b46]/10",
			)}
		>
			
			<Typography className="text-white/55" variant="caption">
				{label}
			</Typography>
			<Typography
				className={cn(
					"mt-1 text-2xl font-bold",
					tone === "yes" ? "text-[#00d66f]" : "text-[#ff646b]",
				)}
				variant="h2"
			>
				{value}
			</Typography>
		</div>
	);
}

function Sparkline({ path }: { path: string }) {
	return (
		<svg
			aria-label="Market price history"
			className="mt-7 h-[58px] w-full"
			fill="none"
			preserveAspectRatio="none"
			role="img"
			viewBox="0 0 565 70"
		>
			<path d={`${path} L 565 70 L 0 70 Z`} fill="#2f80ff" opacity="0.14" />
			<path d={path} stroke="#2f80ff" strokeWidth="2.2" />
		</svg>
	);
}
