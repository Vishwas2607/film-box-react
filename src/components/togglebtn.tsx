import clsx from "clsx";
import { useTheme } from "./themeprovide"
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ToggleThemeBtn() {
    const {theme,toggleTheme} = useTheme();

    const imgClass = clsx(
        "text-2xl "
    )

    const btnClass = clsx(
        " grid place-items-center absolute rounded-full w-[30px] h-[30px] duration-500 ease-in-out left-0 right-0 cursor-pointer",
        {"bg-yellow-500 translate-x-6.5": theme === "light",
        "bg-blue-500 translate-x-0": theme === "dark",
        },
    )

    return <div className="bg-black flex text-white justify-between items-center px-7 h-5 gap-4 relative md:mt-1.5 rounded-2xl border-2 border-white">

        <button onClick={()=>toggleTheme()} className={btnClass} aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
>
        {theme === "light" && <FaSun className={imgClass}/> }
        {theme=== "dark" && <FaMoon className={imgClass}/> }
        </button>
        </div>
}