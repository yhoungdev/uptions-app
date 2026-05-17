import { ArrowUpRight, Plus, Wallet, XCircle } from "lucide-react";

import { ThemeToggle } from "#/components/theme/theme-toggle.tsx";
import { Typography } from "#/components/typography/typography.tsx";
import { Button } from "#/components/ui/button.tsx";
import { cn } from "#/lib/utils.ts";
import {
	automationStatus,
	automations,
	recentAlerts,
} from "#/packages/dashboard/dashboard-data.ts";
import {
	dashboardActions,
	dashboardNavigationItems,
} from "#/packages/navigation/dashboard-navigation.ts";

export function Dashboard() {
	return (
		<main className="min-h-screen bg-[var(--dashboard-bg)] text-[var(--app-fg)]">
			<DashboardHeader />
			<div className="mx-auto grid w-full max-w-[1500px] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_330px] lg:gap-8 lg:py-14">
				<AutomationSection />
				<AlertsSection />
			</div>
		</main>
	);
}

function DashboardHeader() {
	const NotificationsIcon = dashboardActions.notificationsIcon;

	return (
		<header className="sticky top-0 z-30 border-b border-[var(--app-border)] bg-[var(--dashboard-bg)]/95 backdrop-blur">
			<div className="mx-auto flex h-16 w-full max-w-[1500px] items-center justify-between px-5 sm:px-8">
				<a
					aria-label="Uptions home"
					className="text-2xl font-extrabold tracking-[-0.04em] text-[var(--brand)] no-underline hover:text-[var(--brand)]"
					href="/"
				>
					uptions
				</a>

				<nav
					aria-label="Dashboard navigation"
					className="hidden items-center gap-9 md:flex"
				>
					{dashboardNavigationItems.map((item) => {
						const Icon = item.icon;

						return (
							<a
								className="inline-flex items-center gap-2 text-xs font-medium text-[var(--app-muted-fg)] no-underline transition hover:text-[var(--app-fg)]"
								href={item.href}
								key={item.label}
							>
								<Icon className="size-3.5" />
								{item.label}
							</a>
						);
					})}
				</nav>

				<div className="flex items-center gap-3">
					<Button
						aria-label={dashboardActions.notificationsLabel}
						className="size-9 rounded-full border-0 bg-transparent text-[var(--app-muted-fg)] hover:bg-[var(--app-muted)] hover:text-[var(--app-fg)]"
						size="icon"
						type="button"
						variant="ghost"
					>
						<NotificationsIcon className="size-4" />
					</Button>
					<ThemeToggle />
					<Button className="h-9 rounded-full bg-[#ff5a1f] px-5 text-xs font-semibold text-white shadow-none hover:bg-[#e94c14]">
						<Wallet className="size-3.5" />
						{dashboardActions.walletLabel}
					</Button>
				</div>
			</div>
		</header>
	);
}

function AutomationSection() {
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

type Automation = (typeof automations)[number];

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
				<Toggle enabled={automation.enabled} />
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
				<CardMetric label="Last Triggered" value={automation.lastTriggered} />
				<CardMetric label="PnL Impact" value={automation.pnlImpact} />
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

function Toggle({ enabled }: { enabled: boolean }) {
	return (
		<span
			className={cn(
				"mt-1 flex h-3.5 w-6 items-center rounded-full px-0.5",
				enabled
					? "justify-end bg-[#ff5a1f]"
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
			className="flex min-h-[170px] flex-col items-center justify-center rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] p-5 text-center transition hover:border-[#ff5a1f] hover:bg-[var(--app-muted)]"
			href="/builder"
		>
			<Plus className="size-8 text-[#ff5a1f]" />
			<Typography className="mt-6 text-[var(--app-fg)]" variant="h3">
				New Automation
			</Typography>
			<Typography className="mt-2 text-[var(--app-muted-fg)]" variant="caption">
				Start something new
			</Typography>
		</a>
	);
}

function AlertsSection() {
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

type RecentAlert = (typeof recentAlerts)[number];

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
				<AlertAction tone="primary">Buy</AlertAction>
				<AlertAction>Sell</AlertAction>
				<AlertAction tone="muted">Ignore</AlertAction>
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
	tone?: "default" | "muted" | "primary";
}) {
	return (
		<Button
			className={cn(
				"h-8 rounded-full px-3 text-xs font-semibold shadow-none",
				tone === "primary" && "bg-[#ff5a1f] text-white hover:bg-[#e94c14]",
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
