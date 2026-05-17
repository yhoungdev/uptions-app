import { ArrowRight, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { ThemeToggle } from "#/components/theme/theme-toggle.tsx";
import { Typography } from "#/components/typography/typography.tsx";
import { Button } from "#/components/ui/button.tsx";
import { cn } from "#/lib/utils.ts";
import {
	homepageNavigationItems,
	strategySteps,
} from "#/packages/home/homepage-data.ts";
import { AlertsPreview } from "./previews/alerts-preview.tsx";
import { BuilderPreview } from "./previews/builder-preview.tsx";
import { ExecutionPreview } from "./previews/execution-preview.tsx";

export function Homepage() {
	return (
		<main className="min-h-screen bg-[var(--marketing-bg)] text-[var(--app-fg)]">
			<SiteHeader />
			<HeroSection />
			<StrategySection />
		</main>
	);
}

function SiteHeader() {
	return (
		<header className="sticky top-0 z-30 border-b border-[var(--app-border)] bg-[var(--app-surface)]/95 backdrop-blur">
			<div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8">
				<div className="flex items-center gap-9">
					<a
						aria-label="Uptions home"
						className="text-xl font-extrabold tracking-[-0.02em] text-[var(--app-fg)] no-underline hover:text-[var(--app-fg)]"
						href="/"
					>
						uptions
					</a>
					<nav
						aria-label="Primary navigation"
						className="hidden items-center gap-9 md:flex"
					>
						{homepageNavigationItems.map((item) => (
							<a
								className="text-sm font-medium text-[var(--app-muted-fg)] no-underline transition hover:text-[var(--app-fg)]"
								href={item.href}
								key={item.label}
							>
								{item.label}
							</a>
						))}
					</nav>
				</div>

				<div className="flex items-center gap-3">
					<ThemeToggle />
					<Button className="h-9 rounded-none bg-[#ff5a1f] px-5 text-xs font-semibold text-white shadow-none hover:bg-[#e94c14]">
						<Wallet className="size-3.5" />
						Connect Wallet
					</Button>
				</div>
			</div>
		</header>
	);
}

function HeroSection() {
	return (
		<section className="border-b border-[var(--app-border)] bg-[var(--app-surface)]">
			<div className="mx-auto flex min-h-[490px] max-w-[1040px] flex-col items-center justify-center px-6 py-20 text-center">
				<Typography
					className="max-w-[710px] text-[var(--app-fg)]"
					variant="hero"
				>
					Automate Prediction Market Strategies Easily.
				</Typography>
				<Typography
					className="mt-7 max-w-[620px] text-[var(--app-muted-fg)]"
					variant="bodySm"
				>
					Design trading approach visually, by using a comprehensive suite of
					tools to receive instant alerts and execute complex strategies with,
					speed, and reliability, all within the our platform.
				</Typography>
				<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Button className="h-10 rounded-none bg-[#ff5a1f] px-6 text-xs font-semibold text-white shadow-none hover:bg-[#e94c14]">
						<Wallet className="size-3.5" />
						Connect Wallet
					</Button>
					<Button
						className="h-10 rounded-none border-[var(--app-fg)] bg-[var(--app-surface)] px-6 text-xs font-semibold text-[var(--app-fg)] shadow-none hover:bg-[var(--app-fg)] hover:text-[var(--app-bg)]"
						variant="outline"
					>
						View Demo
						<ArrowRight className="size-3.5" />
					</Button>
				</div>
			</div>
		</section>
	);
}

function StrategySection() {
	const sectionRef = useRef<HTMLElement>(null);
	const [activeStep, setActiveStep] = useState(1);

	useEffect(() => {
		const updateActiveStep = () => {
			const section = sectionRef.current;

			if (!section) {
				return;
			}

			const rect = section.getBoundingClientRect();
			const scrollableDistance = rect.height - window.innerHeight;
			const progress = Math.min(
				1,
				Math.max(0, Math.abs(Math.min(0, rect.top)) / scrollableDistance),
			);

			setActiveStep(
				Math.min(strategySteps.length, Math.floor(progress * 3) + 1),
			);
		};

		updateActiveStep();

		window.addEventListener("scroll", updateActiveStep, { passive: true });
		window.addEventListener("resize", updateActiveStep);

		return () => {
			window.removeEventListener("scroll", updateActiveStep);
			window.removeEventListener("resize", updateActiveStep);
		};
	}, []);

	return (
		<section
			className="relative min-h-[300vh] bg-[var(--marketing-bg)]"
			id="product"
			ref={sectionRef}
		>
			<div className="sticky top-16 mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1220px] items-center gap-x-16 gap-y-12 px-6 py-10 md:grid-cols-[minmax(260px,390px)_minmax(420px,1fr)] md:px-10">
				<StepList activeStep={activeStep} />
				<StepPreview activeStep={activeStep} />
			</div>
		</section>
	);
}

type StepListProps = {
	activeStep: number;
};

function StepList({ activeStep }: StepListProps) {
	return (
		<ol className="grid content-center gap-10">
			{strategySteps.map((step) => {
				const isActive = step.id === activeStep;

				return (
					<li className="grid grid-cols-[40px_1fr] gap-5" key={step.id}>
						<div className="flex flex-col items-center">
							<span
								className={[
									"grid size-8 place-items-center rounded-full text-xs font-bold transition",
									isActive
										? "bg-[#ff5a1f] text-white"
										: "bg-white text-[#b6b2ac]",
								].join(" ")}
							>
								{step.id}
							</span>
							{step.id < strategySteps.length ? (
								<span
									className={[
										"mt-4 h-16 w-px transition",
										isActive ? "bg-[#ff5a1f]" : "bg-white",
									].join(" ")}
								/>
							) : null}
						</div>
						<div
							className={cn(
								"transition duration-300",
								isActive ? "opacity-100" : "opacity-35",
							)}
						>
							<h2
								className={cn(
									"text-xl font-bold tracking-[-0.03em] transition",
									isActive
										? "text-[var(--app-fg)]"
										: "text-[var(--app-muted-fg)]",
								)}
							>
								{step.title}
							</h2>
							<Typography
								className="mt-3 max-w-[265px] text-[var(--app-muted-fg)]"
								variant="body"
							>
								{step.description}
							</Typography>
						</div>
					</li>
				);
			})}
		</ol>
	);
}

function StepPreview({ activeStep }: StepListProps) {
	return (
		<div className="relative min-h-[540px]">
			<PreviewPane active={activeStep === 1}>
				<BuilderPreview />
			</PreviewPane>
			<PreviewPane active={activeStep === 2}>
				<AlertsPreview />
			</PreviewPane>
			<PreviewPane active={activeStep === 3}>
				<ExecutionPreview />
			</PreviewPane>
		</div>
	);
}

type PreviewPaneProps = {
	active: boolean;
	children: ReactNode;
};

function PreviewPane({ active, children }: PreviewPaneProps) {
	return (
		<div
			className={cn(
				"absolute inset-0 grid place-items-center transition duration-500",
				active
					? "translate-y-0 opacity-100"
					: "pointer-events-none translate-y-4 opacity-0",
			)}
		>
			{children}
		</div>
	);
}
