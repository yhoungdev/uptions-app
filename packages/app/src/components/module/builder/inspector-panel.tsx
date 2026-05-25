import { DraftingCompass } from "lucide-react";

import { Typography } from "@/components/typography/typography.tsx";
import type { WorkflowBlock } from "@/packages/builder/builder-data.ts";
import { workflowBlockTone } from "@/packages/builder/builder-data.ts";

type InspectorPanelProps = {
	selectedBlock?: WorkflowBlock;
};

export function InspectorPanel({ selectedBlock }: InspectorPanelProps) {
	return (
		<aside className="hidden min-h-0 w-[300px] border-l border-white/10 bg-builder-panel xl:flex xl:flex-col">
			{selectedBlock ? (
				<div className="p-6">
					<Typography className="text-white" variant="h3">
						Configure Node
					</Typography>
					<div className="mt-8  border border-white/10 bg-white/[0.03] p-4">
						<Typography className="text-white/45" variant="caption">
							{workflowBlockTone[selectedBlock.kind].label}
						</Typography>
						<Typography className="mt-2 text-white" variant="h3">
							{selectedBlock.title}
						</Typography>
						<Typography className="mt-3 text-white/55" variant="bodySm">
							{selectedBlock.description}
						</Typography>
						<div className="mt-6">
							<Typography className="text-white/45" variant="caption">
								Value
							</Typography>
							<div className="mt-2  border border-white/10 bg-black/30 px-3 py-3 text-sm text-white">
								{selectedBlock.value}
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="grid flex-1 place-items-center px-8 text-center">
					<div>
						<DraftingCompass className="mx-auto size-12 text-white" />
						<Typography className="mt-8 text-white" variant="h3">
							Select Node To Configure
						</Typography>
						<Typography className="mt-3 text-white/45" variant="body">
							Or drag blocks from the library
						</Typography>
					</div>
				</div>
			)}
		</aside>
	);
}
