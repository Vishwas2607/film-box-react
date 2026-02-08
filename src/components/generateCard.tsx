import type { Movie } from "./fetch"
import { FaBookBookmark,FaRegBookmark } from "react-icons/fa6"
import clsx from "clsx"
import {useBookmarks} from "./bookmarkProvider"
import { useLocation, useNavigate } from "react-router-dom"
import { useIsSavedLocal } from "./isSavedLocal"
import { useEffect, useState } from "react"

export type BookmarkType = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export default function GenerateCard({Title,Year,imdbID,Type,Poster}: Movie) {

    const isSaved = useIsSavedLocal(imdbID);

    const {toggleBookmark}  = useBookmarks();
    const navigate = useNavigate();
    const location = useLocation();

    const [active, setActive] = useState(false);

    useEffect(()=> {
        if (location.pathname === '/watchlist') {
            console.log(location.pathname);
            setActive(true);
        }
    },[location]);
    
    const handleBookmark = (event: React.MouseEvent<HTMLButtonElement>, bookmark: BookmarkType) => {
        event.stopPropagation();
        toggleBookmark(bookmark);
    }

    const classes = clsx(
        "absolute top-0 left-0 inline-flex justify-center items-center text-4xl rounded-full w-[50px] h-[50px]"
    )

    const cardClass = clsx(
        "relative border-2 w-[200px] md:w-[250px] h-[350px] flex flex-col hover:shadow-lg transition duration-500 ease-in-out shadow-gray-600 animate-fade-in justify-between pb-2 cursor-pointer"
    );

    const typeClass = clsx(
        "capitalize border-2 rounded-xl px-2 py-0.5 md:py-1 text-[12px] md:text-sm transition duration-500 ease-in-out",
        {"border-red-600 text-red-600 dark:border-red-400 dark:text-red-400": Type === "series",
            "border-green-600 text-green-600 dark:border-green-400 dark:text-green-400": Type === "movie",
        },
    )

    return (
        <div className={active && !isSaved ? `${cardClass} animate-shrink-fade` : cardClass} onClick={()=>navigate(`/moviedetails/${imdbID}`)}>
            <button onClick={(event)=>handleBookmark(event,{Title: Title,Year:Year,imdbID: imdbID, Type:Type, Poster: Poster})} className={!useIsSavedLocal(imdbID) ? `${classes} bg-gray-300 text-black` : `${classes} bg-blue-200 text-blue-500`}>{useIsSavedLocal(imdbID) ? <FaBookBookmark/> : <FaRegBookmark/>}</button>
            <img src={Poster} alt={`${Title}'s Poter`} title={`Poster of ${Title}`} aria-label="Movie Poster" loading="lazy" className=" h-[250px] border-2 border-black text-center grid place-items-center"/>
            <h3 className="text-md md:text-lg font-bold p-2 truncate line-clamp-2 text-black dark:text-white">{Title}</h3>
            <div className="flex flex-wrap w-full px-2 items-center justify-between">
                <p className={typeClass}>Type: {Type}</p> 
                <p className="capitalize border-2 border-gray-400 rounded-xl px-2 py-1 text-[12px] md:text-sm truncate md:line-clamp-none max-w-[85px] md:max-w-fit">Year: {Year}</p>
            </div>
        </div>
    )
}