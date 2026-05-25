import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/headers/index-header.tsx";
import { Typography } from "@/components/typography/typography.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { strategySteps } from "@/packages/home/homepage-data.ts";
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

function HeroSection() {
	return (
		<section className="border-b border-[var(--app-border)] bg-[var(--app-surface)]">
			<div className="mx-auto flex min-h-[490px] max-w-[1040px] flex-col items-center justify-center px-6 py-20 text-center">
				<Typography
					className="max-w-[710px] text-[var(--app-fg)] font-normal"
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
					<Button>Join Waitlist</Button>
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
									"grid size-8 place-items-center  text-xs font-bold transition",
									isActive
										? "bg-primary text-primary-foreground"
										: "bg-app-inverse text-app-muted-fg",
								].join(" ")}
							>
								{step.id}
							</span>
							{step.id < strategySteps.length ? (
								<span
									className={[
										"mt-4 h-16 w-px transition",
										isActive ? "bg-primary" : "bg-app-inverse",
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
