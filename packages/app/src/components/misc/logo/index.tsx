import { Link } from "@tanstack/react-router";

function Logo() {
    return <Link to="/dashboard" className="flex items-center gap-2">
    <div className="logo cursor-pointer">
        <img src="/images/logo.svg" 
    alt="Uptions Logo"  />
    </div></Link>;
}

export default Logo;