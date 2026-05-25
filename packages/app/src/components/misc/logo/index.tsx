import { Link } from "@tanstack/react-router";

import { useTheme } from "@/components/theme/theme-provider.tsx";

function Logo() {
	const { theme } = useTheme();
	const logoSrc =
		theme === "light" ? "/images/logo-dark.svg" : "/images/logo.svg";

	return (
		<Link className="flex items-center gap-2" to="/dashboard">
			<div className="logo flex h-[22px] w-[80px] cursor-pointer items-center">
				<img
					alt="Uptions Logo"
					className="block h-[22px] w-[80px] object-contain"
					height={22}
					src={logoSrc}
					width={80}
				/>
			</div>
		</Link>
	);
}

export default Logo;
