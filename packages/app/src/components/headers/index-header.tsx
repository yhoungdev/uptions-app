import { homepageNavigationItems } from "#/packages/home/homepage-data";
import { Wallet } from "lucide-react";
import Logo from "../misc/logo";
import { ThemeToggle } from "../theme/theme-toggle";
import { Button } from "../ui/button";

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
						<Logo />
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

export default SiteHeader;