import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils.ts";

const typographyVariants = {
	hero: "text-[clamp(2.5rem,7vw,4.75rem)] font-semibold leading-[0.99] tracking-[-0.065em]",
	h1: "text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-4xl",
	h2: "text-2xl font-semibold leading-tight tracking-[-0.04em]",
	h3: "text-xl font-semibold leading-tight tracking-[-0.03em]",
	body: "text-base leading-7",
	bodySm: "text-sm leading-6",
	caption: "text-xs leading-5",
	label: "text-sm font-medium leading-none",
} as const;

type TypographyVariant = keyof typeof typographyVariants;

const defaultElementByVariant: Record<TypographyVariant, ElementType> = {
	hero: "h1",
	h1: "h1",
	h2: "h2",
	h3: "h3",
	body: "p",
	bodySm: "p",
	caption: "p",
	label: "span",
};

type TypographyProps<T extends ElementType> = {
	as?: T;
	children: ReactNode;
	className?: string;
	variant?: TypographyVariant;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Typography<T extends ElementType = "p">({
	as,
	children,
	className,
	variant = "body",
	...props
}: TypographyProps<T>) {
	const Component = as ?? defaultElementByVariant[variant];

	return (
		<Component
			className={cn(typographyVariants[variant], className)}
			{...props}
		>
			{children}
		</Component>
	);
}
