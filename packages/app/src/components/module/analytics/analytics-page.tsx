import { ChevronDown, Info } from "lucide-react";
import type { ReactNode } from "react";

import { ProductShell } from "#/components/module/app-shell/product-shell.tsx";
import { Typography } from "#/components/typography/typography.tsx";
import { cn } from "#/lib/utils.ts";
import {
	analyticsMetrics,
	dailyActivity,
	portfolioMarkers,
	portfolioPath,
	riskMetrics,
	workflowPerformance,
} from "#/packages/analytics/analytics-data.ts";

export function AnalyticsPage() {
	return (
		<ProductShell active="Analytics">
			<section className="border-b border-white/10 px-5 py-5 sm:px-8">
				<div className="flex items-start justify-between gap-4">
					<div>
						<Typography className="text-white" variant="h2">
							Analytics
						</Typography>
						<Typography className="mt-1 text-white/55" variant="bodySm">
							Performance insights and strategy metrics
						</Typography>
					</div>
					<button
						className="mt-3 flex items-center gap-3 text-sm text-white"
						type="button"
					>
						Last 7 days
						<ChevronDown className="size-4 text-white/45" />
					</button>
				</div>
			</section>

			<div className="grid gap-5 px-5 py-5 sm:px-8">
				<MetricGrid />
				<PortfolioCard />
				<div className="grid gap-5 xl:grid-cols-2">
					<WorkflowPerformance />
					<DailyActivity />
				</div>
				<RiskAnalysis />
			</div>
		</ProductShell>
	);
}

function Panel({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<section
			className={cn(
				"rounded-lg border border-white/10 bg-[#151515] p-4 sm:p-5",
				className,
			)}
		>
			{children}
		</section>
	);
}

function MetricGrid() {
	return (
		<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
			{analyticsMetrics.map((metric) => {
				const Icon = metric.icon;

				return (
					<Panel className="min-h-[102px]" key={metric.label}>
						<div className="flex items-start justify-between">
							<div>
								<Typography className="text-white/55" variant="bodySm">
									{metric.label}
								</Typography>
								<Typography className="mt-3 text-white" variant="h2">
									{metric.value}
								</Typography>
								<Typography
									className={cn("mt-1", metric.tone)}
									variant="bodySm"
								>
									{metric.detail}
								</Typography>
							</div>
							<Icon className={cn("size-4", metric.tone)} />
						</div>
					</Panel>
				);
			})}
		</div>
	);
}

function PortfolioCard() {
	return (
		<Panel className="min-h-[395px]">
			<div className="flex items-start justify-between gap-4">
				<div>
					<Typography className="text-white" variant="h3">
						Portfolio Value
					</Typography>
					<Typography className="text-white/55" variant="bodySm">
						With execution timeline markers
					</Typography>
				</div>
				<Typography className="text-white/55" variant="bodySm">
					Current:{" "}
					<span className="text-lg font-bold text-white">$127,340</span>
				</Typography>
			</div>

			<div className="mt-10 flex gap-5 text-sm">
				<Legend color="#00d66f" label="Buy" />
				<Legend color="#ff3b46" label="Sell" />
				<Legend color="#2f80ff" label="Alert" />
			</div>

			<div className="mt-6 overflow-hidden">
				<svg
					aria-label="Portfolio value chart"
					className="h-[245px] w-full"
					fill="none"
					preserveAspectRatio="none"
					role="img"
					viewBox="0 0 1530 260"
				>
					<defs>
						<linearGradient id="portfolio-fill" x1="0" x2="0" y1="0" y2="1">
							<stop offset="0%" stopColor="#2f80ff" stopOpacity="0.24" />
							<stop offset="100%" stopColor="#2f80ff" stopOpacity="0" />
						</linearGradient>
					</defs>
					{[0, 1, 2, 3].map((line) => (
						<path
							d={`M 45 ${55 + line * 48} H 1485`}
							key={line}
							stroke="rgba(255,255,255,0.2)"
							strokeDasharray="4 5"
						/>
					))}
					{[0, 1, 2, 3, 4, 5, 6].map((line) => (
						<path
							d={`M ${45 + line * 240} 55 V 245`}
							key={line}
							stroke="rgba(255,255,255,0.16)"
							strokeDasharray="4 5"
						/>
					))}
					<path
						d={`${portfolioPath} L 1485 245 L 45 245 Z`}
						fill="url(#portfolio-fill)"
					/>
					<path d={portfolioPath} stroke="#2f80ff" strokeWidth="2.4" />
					{portfolioMarkers.map((marker) => (
						<g key={marker.label}>
							<circle
								cx={`${marker.x}%`}
								cy={`${marker.y}%`}
								fill={marker.color}
								r="6"
								stroke="white"
								strokeOpacity="0.65"
								strokeWidth="2"
							/>
							<text
								fill="white"
								fontSize="11"
								textAnchor="middle"
								x={`${marker.x}%`}
								y={`${marker.y - 3}%`}
							>
								{marker.label}
							</text>
						</g>
					))}
					<path d="M 45 245 H 1485" stroke="white" strokeOpacity="0.8" />
					<path d="M 45 55 V 245" stroke="white" strokeOpacity="0.8" />
				</svg>
				<div className="grid grid-cols-7 text-center text-sm text-white">
					{["Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5", "Jan 6", "Jan 7"].map(
						(day) => (
							<span key={day}>{day}</span>
						),
					)}
				</div>
			</div>
		</Panel>
	);
}

function Legend({ color, label }: { color: string; label: string }) {
	return (
		<span className="flex items-center gap-2 text-white/55">
			<span className="size-3 rounded-full" style={{ background: color }} />
			{label}
		</span>
	);
}

function WorkflowPerformance() {
	return (
		<Panel className="min-h-[372px]">
			<div className="flex items-center justify-between">
				<Typography className="text-white" variant="h3">
					Workflow Performance
				</Typography>
				<Typography className="text-white/45" variant="bodySm">
					5 workflows
				</Typography>
			</div>
			<div className="mt-8 grid gap-2">
				{workflowPerformance.map((item) => (
					<div
						className="flex items-center justify-between rounded-md border border-white/8 bg-white/[0.01] px-3 py-3"
						key={item.name}
					>
						<div>
							<div className="flex items-center gap-2">
								<Typography className="text-white" variant="label">
									{item.name}
								</Typography>
								{item.status ? (
									<span className="rounded bg-[#ff3038]/15 px-1.5 text-xs text-[#ff3038]">
										{item.status}
									</span>
								) : null}
							</div>
							<Typography className="mt-2 text-white/55" variant="bodySm">
								{item.trades} <span className="px-2">•</span> {item.winRate}{" "}
								<span className="px-2">•</span>{" "}
								<span
									className={
										item.positive ? "text-[#00d66f]" : "text-[#ff3038]"
									}
								>
									{item.average}
								</span>
							</Typography>
						</div>
						<Typography
							className={item.positive ? "text-[#00d66f]" : "text-[#ff3038]"}
							variant="label"
						>
							{item.return}
						</Typography>
					</div>
				))}
			</div>
		</Panel>
	);
}

function DailyActivity() {
	return (
		<Panel className="min-h-[372px]">
			<Typography className="text-white" variant="h3">
				Daily Activity
			</Typography>
			<div className="mt-10 h-[245px] px-8">
				<div className="flex h-full items-end gap-7 border-b border-l border-white/80 bg-[linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] bg-[length:100%_25%,16.66%_100%] px-2">
					{dailyActivity.map((item) => (
						<div
							className="flex flex-1 flex-col items-center gap-2"
							key={item.day}
						>
							<div
								className="w-full bg-[#8759f4]"
								style={{ height: `${(item.value / 20) * 100}%` }}
							/>
							<span className="-mb-6 text-sm text-white">{item.day}</span>
						</div>
					))}
				</div>
			</div>
			<div className="mt-10 flex justify-center gap-5 text-sm text-white/55">
				<Legend color="#2f80ff" label="Automated" />
				<Legend color="#a855f7" label="Manual" />
			</div>
		</Panel>
	);
}

function RiskAnalysis() {
	return (
		<Panel>
			<div className="flex items-center gap-2">
				<Typography className="text-white" variant="h3">
					Risk Analysis
				</Typography>
				<Info className="size-4 text-white/55" />
			</div>
			<div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
				{riskMetrics.map((metric) => (
					<div key={metric.label}>
						<div className="flex items-center justify-between gap-4">
							<Typography className="text-white/55" variant="bodySm">
								{metric.label}
							</Typography>
							<span
								className={cn(
									"rounded-md border px-2 text-xs",
									metric.status === "excellent"
										? "border-[#00d66f]/30 bg-[#00d66f]/10 text-[#00d66f]"
										: "border-[#2f80ff]/30 bg-[#2f80ff]/10 text-[#2f80ff]",
								)}
							>
								{metric.status}
							</span>
						</div>
						<Typography className="mt-3 text-white" variant="h2">
							{metric.value}
						</Typography>
						<Typography className="text-white/55" variant="bodySm">
							{metric.target}
						</Typography>
						<div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
							<div
								className={cn("h-full rounded-full", metric.tone)}
								style={{ width: `${metric.progress}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</Panel>
	);
}
