import { Plus } from "lucide-react";

import { Typography } from "#/components/typography/typography.tsx";
import { cn } from "#/lib/utils.ts";
import {
	automationStatus,
	automations,
} from "#/packages/dashboard/dashboard-data.ts";

type Automation = (typeof automations)[number];

const automationMetrics = [
	{ key: "lastTriggered", label: "Last Triggered" },
	{ key: "pnlImpact", label: "PnL Impact" },
] as const;

export function AutomationSection() {
	return (
		<section className="min-w-0">
			<Typography className="mb-8 text-[var(--app-fg)]" variant="h2">
				Active Automations
			</Typography>
			<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
				{automations.map((automation) => (
					<AutomationCard automation={automation} key={automation.id} />
				))}
				<NewAutomationCard />
			</div>
		</section>
	);
}

function AutomationCard({ automation }: { automation: Automation }) {
	const isActive = automation.status === automationStatus.active;

	return (
		<article className="min-h-[170px] rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] p-5">
			<div className="flex items-start justify-between gap-4">
				<Typography
					as="h3"
					className="truncate text-[var(--app-fg)]"
					variant="h3"
				>
					{automation.name}
				</Typography>
				<AutomationToggle enabled={automation.enabled} />
			</div>

			<div className="mt-5 border-b border-[var(--app-border)] pb-5">
				<span
					className={cn(
						"inline-flex h-6 items-center px-3 text-xs font-semibold text-black",
						isActive ? "bg-[#1ecb63]" : "bg-[#13b85d]",
					)}
				>
					{automation.status}
				</span>
			</div>

			<div className="mt-5 grid gap-3">
				{automationMetrics.map(({ key, label }) => (
					<CardMetric key={key} label={label} value={automation[key]} />
				))}
			</div>
		</article>
	);
}

function CardMetric({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-center justify-between gap-4">
			<Typography className="text-[var(--app-muted-fg)]" variant="caption">
				{label}
			</Typography>
			<Typography
				className="font-medium text-[var(--app-fg)]"
				variant="caption"
			>
				{value}
			</Typography>
		</div>
	);
}

function AutomationToggle({ enabled }: { enabled: boolean }) {
	return (
		<span
			className={cn(
				"mt-1 flex h-3.5 w-6 items-center rounded-full px-0.5",
				enabled
					? "justify-end bg-primary"
					: "justify-start bg-[var(--app-muted)]",
			)}
		>
			<span className="size-2 rounded-full bg-[var(--dashboard-bg)]" />
		</span>
	);
}

function NewAutomationCard() {
	return (
		<a
			className="flex min-h-[170px] flex-col items-center justify-center rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] p-5 text-center transition hover:border-primary hover:bg-[var(--app-muted)]"
			href="/builder"
		>
			<Plus className="size-8 text-primary" />
			<Typography className="mt-6 text-[var(--app-fg)]" variant="h3">
				New Automation
			</Typography>
			<Typography className="mt-2 text-[var(--app-muted-fg)]" variant="caption">
				Start something new
			</Typography>
		</a>
	);
}
