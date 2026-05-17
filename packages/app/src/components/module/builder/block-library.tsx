import { GripVertical, Search } from "lucide-react";

import { Typography } from "#/components/typography/typography.tsx";
import { cn } from "#/lib/utils.ts";
import type { WorkflowBlock } from "#/packages/builder/builder-data.ts";
import {
	workflowBlockGroups,
	workflowBlockTone,
} from "#/packages/builder/builder-data.ts";

export function BlockLibrary() {
	return (
		<aside className="flex min-h-0 w-full flex-col border-r border-white/10 bg-[#111111] lg:w-[294px]">
			<div className="flex h-[68px] shrink-0 items-center border-b border-white/10 px-4">
				<Typography className="text-white" variant="h3">
					Blocks
				</Typography>
			</div>
			<div className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
				<label className="flex h-12 items-center gap-3 rounded-xl bg-white/8 px-4 text-white/55">
					<Search className="size-4" />
					<input
						className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/70"
						placeholder="Search"
						type="search"
					/>
				</label>

				<div className="mt-6 grid gap-6">
					{workflowBlockGroups.map((group) => (
						<section className="grid gap-3" key={group.kind}>
							<Typography className="text-white/45" variant="caption">
								{group.title}
							</Typography>
							<div className="grid gap-3">
								{group.blocks.map((block) => (
									<BlockLibraryItem block={block} key={block.id} />
								))}
							</div>
						</section>
					))}
				</div>
			</div>
		</aside>
	);
}

function BlockLibraryItem({ block }: { block: WorkflowBlock }) {
	const tone = workflowBlockTone[block.kind];
	const Icon = block.icon;

	return (
		<button
			className="flex min-h-[54px] cursor-grab items-center gap-3 rounded-lg border bg-transparent px-3 py-3 text-left active:cursor-grabbing"
			draggable
			onDragStart={(event) => {
				event.dataTransfer.setData("application/uptions-block", block.id);
				event.dataTransfer.effectAllowed = "move";
			}}
			style={{
				backgroundColor: tone.glow,
				borderColor: tone.border,
			}}
			type="button"
		>
			<GripVertical className="size-4 shrink-0 text-white/35" />
			<span
				className={cn(
					"grid size-5 shrink-0 place-items-center rounded-full",
					tone.icon,
				)}
			>
				<Icon className="size-3.5" />
			</span>
			<span className="min-w-0">
				<Typography className="truncate text-white" variant="label">
					{block.title}
				</Typography>
				<Typography className="mt-1 truncate text-white/55" variant="caption">
					{block.description}
				</Typography>
			</span>
		</button>
	);
}
