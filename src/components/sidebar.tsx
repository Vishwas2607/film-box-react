import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { FaTimes } from "react-icons/fa";

export default function Sidebar({isOpen,setIsOpen}: {isOpen:boolean, setIsOpen: (value:boolean)=> void}) {

    const sidebarClass = clsx(
        "flex duration-500 ease-in-out bg-gray-200 dark:bg-gray-600 border-r-1 w-[200px] flex-col gap-5 items-end h-full fixed top-0 -left-0.5 z-10",
        {"-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
        },
    )
    const classes = clsx(
            " p-2 pl-3 text-lg hover:bg-violet-400 text-black dark:text-white dark:hover:bg-gray-800 transition duration-500 ease-in-out"
        );

    return (
        <div className={sidebarClass} tabIndex={0}>
            <button onClick={()=>setIsOpen(false)} className="btn btn-sm mr-4 mt-2 btn-ghost text-right text-xl text-black dark:text-white" title="Close-Sidebar" aria-label="Close-Sidebar"><FaTimes/></button>
            <nav role="navigation" aria-label="Sidebar" title="Sidebar" className="flex w-full text-white flex-col gap-4 font-semibold">
                <NavLink to="/" className={({isActive})=> (isActive ? `bg-red-400 dark:bg-gray-800 pointer-events-none ${classes}`: `pointer-events-auto ${classes}`)} onClick={() => setIsOpen(false)} >Home</NavLink>
                <NavLink to="/watchlist" className={({isActive})=> (isActive ? `bg-red-400 dark:bg-gray-800 pointer-events-none ${classes}`: `pointer-events-auto ${classes}`)} onClick={() => setIsOpen(false)} >Watchlist</NavLink>
                <NavLink to="/aboutus" className={({isActive})=> (isActive ? `bg-red-400 dark:bg-gray-800 pointer-events-none ${classes}`: `pointer-events-auto ${classes}`)} onClick={() => setIsOpen(false)} >About Us</NavLink>
            </nav>
        </div>
    )
}