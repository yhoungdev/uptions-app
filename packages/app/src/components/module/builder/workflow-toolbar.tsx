import { ChevronDown, Play, Redo2, Undo2, Wallet, X } from "lucide-react";

import { Typography } from "#/components/typography/typography.tsx";
import { Button } from "#/components/ui/button.tsx";

export function WorkflowToolbar() {
	return (
		<header className="flex h-[68px] shrink-0 items-center justify-between border-b border-white/10 bg-[#111111] px-5">
			<Typography className="text-white" variant="h3">
				Untitled Workflow
			</Typography>

			<div className="flex items-center gap-6">
				<div className="hidden items-center gap-4 text-white/60 sm:flex">
					<Button
						aria-label="Undo"
						className="size-8 rounded-full border-0 bg-transparent text-white/70 hover:bg-white/8 hover:text-white"
						size="icon"
						type="button"
						variant="ghost"
					>
						<Undo2 className="size-4" />
					</Button>
					<Button
						aria-label="Redo"
						className="size-8 rounded-full border-0 bg-transparent text-white/40 hover:bg-white/8 hover:text-white"
						size="icon"
						type="button"
						variant="ghost"
					>
						<Redo2 className="size-4" />
					</Button>
				</div>

				<Button
					className="hidden h-9 gap-2 rounded-full border-0 bg-transparent px-2 text-sm font-medium text-white hover:bg-white/8 md:inline-flex"
					type="button"
					variant="ghost"
				>
					105%
					<ChevronDown className="size-4" />
				</Button>

				<Button
					className="h-9 rounded-full border-0 bg-transparent px-2 text-sm font-medium text-white hover:bg-white/8"
					type="button"
					variant="ghost"
				>
					<Play className="size-4" />
					Test Run
				</Button>

				<Button className="h-10 rounded-full bg-[#ff5a1f] px-6 text-sm font-semibold text-white shadow-none hover:bg-[#e94c14]">
					<Wallet className="size-4 md:hidden" />
					<span className="hidden md:inline">Publish</span>
				</Button>

				<a
					aria-label="Close builder"
					className="hidden text-white/60 no-underline hover:text-white sm:block"
					href="/dashboard"
				>
					<X className="size-5" />
				</a>
			</div>
		</header>
	);
}
