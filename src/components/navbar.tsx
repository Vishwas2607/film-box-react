import clsx from "clsx";
import { NavLink } from "react-router-dom";

export function navLinkClass(isActive: boolean) {
  return clsx(
    "text-lg font-semibold hover:text-gray-300 transition-colors",
    isActive ? "text-gray-300 pointer-events-none border-b-2 " : "text-white pointer-events-auto"
  );
}


export default function Navbar() {
    return (
        <nav role="navigation" aria-label="Main Navigation" className="hidden justify-center items-center gap-4 font-semibold text-white md:inline-flex">
            <NavLink to="/" className={({isActive})=> navLinkClass(isActive)} >Home</NavLink>
            <NavLink to="/watchlist" className={({isActive})=> navLinkClass(isActive)} >Watchlist</NavLink>
            <NavLink to="/aboutus" className={({isActive})=> navLinkClass(isActive)}>About Us</NavLink>
        </nav>
    )
}