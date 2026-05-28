import type { ReactNode } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { cn } from "@/lib/utils.ts";

type CustomModalProps = {
	children: ReactNode;
	className?: string;
	description?: string;
	title: string;
	trigger: ReactNode;
};

export function CustomModal({
	children,
	className,
	description,
	title,
	trigger,
}: CustomModalProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent
				className={cn(
					"border-app-border bg-app-surface text-app-fg sm:max-w-[430px]",
					className,
				)}
			>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description ? (
						<DialogDescription className="text-app-muted-fg">
							{description}
						</DialogDescription>
					) : null}
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
}
