import { Activity } from "lucide-react";

import { cn } from "#/lib/utils.ts";
import { executionItems } from "#/packages/home/homepage-data.ts";

export function ExecutionPreview() {
	return (
		<div className="flex items-center justify-center md:min-h-[500px]">
			<div className="w-full max-w-[540px] rounded-[48px] border border-black/5 bg-white px-9 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.06)]">
				<div className="rounded-2xl border border-black/10 bg-[#fbfaf8] p-6">
					<div className="flex items-center justify-between border-b border-black/[0.06] pb-5">
						<div>
							<p className="text-sm font-semibold text-[#7b766f]">
								Strategy status
							</p>
							<h3 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-black">
								Protected execution
							</h3>
						</div>
						<span className="grid size-11 place-items-center rounded-full bg-[#ff5a1f] text-white">
							<Activity className="size-5" />
						</span>
					</div>

					<div className="mt-6 grid gap-4">
						{executionItems.map((item) => {
							const Icon = item.icon;

							return (
								<div
									className="flex items-center justify-between rounded-xl border border-black/[0.06] bg-white p-4"
									key={item.label}
								>
									<div className="flex items-center gap-3">
										<span
											className={cn(
												"grid size-10 place-items-center rounded-full border",
												item.tone,
											)}
										>
											<Icon className="size-5" />
										</span>
										<p className="text-sm font-bold text-black">{item.label}</p>
									</div>
									<p className="text-sm font-semibold text-[#7b766f]">
										{item.value}
									</p>
								</div>
							);
						})}
					</div>

					<div className="mt-6 h-2 overflow-hidden rounded-full bg-black/5">
						<div className="h-full w-[82%] rounded-full bg-[#ff5a1f]" />
					</div>
				</div>
			</div>
		</div>
	);
}
