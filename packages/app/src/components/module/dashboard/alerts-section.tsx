import { ArrowUpRight, XCircle } from "lucide-react";

import { Typography } from "#/components/typography/typography.tsx";
import { Button } from "#/components/ui/button.tsx";
import { cn } from "#/lib/utils.ts";
import { recentAlerts } from "#/packages/dashboard/dashboard-data.ts";

type RecentAlert = (typeof recentAlerts)[number];
type AlertActionTone = "default" | "muted" | "primary";

const alertActions: Array<{ label: string; tone?: AlertActionTone }> = [
	{ label: "Buy", tone: "primary" },
	{ label: "Sell" },
	{ label: "Ignore", tone: "muted" },
];

export function AlertsSection() {
	return (
		<aside className="min-w-0">
			<Typography className="mb-8 text-[var(--app-fg)]" variant="h2">
				Recent Alerts
			</Typography>
			<div className="grid gap-5">
				{recentAlerts.map((alert) => (
					<AlertCard alert={alert} key={alert.id} />
				))}
			</div>
		</aside>
	);
}

function AlertCard({ alert }: { alert: RecentAlert }) {
	return (
		<article className="rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] p-5">
			<div className="flex items-start justify-between gap-4">
				<div>
					<Typography className="text-[var(--app-fg)]" variant="label">
						{alert.asset}
					</Typography>
					<Typography className="mt-4 text-[var(--app-fg)]" variant="caption">
						{alert.change}
					</Typography>
					<Typography
						className="mt-2 text-[var(--app-muted-fg)]"
						variant="caption"
					>
						{alert.strategy}
					</Typography>
				</div>
				<XCircle className="size-4 text-[var(--app-muted-fg)]" />
			</div>

			<div className="mt-5 grid grid-cols-3 gap-2">
				{alertActions.map((action) => (
					<AlertAction key={action.label} tone={action.tone}>
						{action.label}
					</AlertAction>
				))}
			</div>

			<Typography className="mt-6 text-[var(--app-muted-fg)]" variant="caption">
				{alert.time}
			</Typography>
		</article>
	);
}

function AlertAction({
	children,
	tone = "default",
}: {
	children: string;
	tone?: AlertActionTone;
}) {
	return (
		<Button
			className={cn(
				"h-8 rounded-full px-3 text-xs font-semibold shadow-none",
				tone === "primary" && "bg-primary text-white hover:bg-primary/90",
				tone === "default" && "bg-white text-black hover:bg-white/90",
				tone === "muted" &&
					"bg-[#2a2d31] text-white hover:bg-[#35393e] dark:bg-[#2a2d31]",
			)}
		>
			{tone === "primary" ? <ArrowUpRight className="size-3" /> : null}
			{children}
		</Button>
	);
}
