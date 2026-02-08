import { useNavigate } from "react-router-dom"
import { useBookmarks } from "../components/bookmarkProvider";
import GenerateCard from "../components/generateCard";
import { useEffect, useRef,useState } from "react";

export default function SavedMovies() {
    const navigate = useNavigate();
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const {bookmarkedMovies}  = useBookmarks();
    const [moviesArr,setMoviesArr] = useState(bookmarkedMovies.slice(0,10));

    useEffect(()=>{
        const observer = new IntersectionObserver((entries)=> {
            if(entries[0].isIntersecting) {
                setMoviesArr((prevArr)=> {
                    if (prevArr.length + 10 < bookmarkedMovies.length){
                        return bookmarkedMovies.slice(0,prevArr.length+10);
                    }
                    return bookmarkedMovies;
                })
            }
        },
        {threshold: 1.0}
    );

    const el = bottomRef.current;
    if(el) observer.observe(el);

    return () =>{
        if (el) observer.unobserve(el);
        };
    },[bookmarkedMovies])

    return(
        <section className="animate-fade-in">
            <div className="flex flex-col justify-center items-center gap-10 p-5 w-full">
                <h2 className="text-3xl font-bold text-center transition duration-500 ease-in-out">Your Watchlist
                    <div className="bg-gradient-to-bl from-violet-400 to-blue-500 p-0.5 rounded-2xl w-[250px]"></div>
                </h2>

                    <div className="w-full flex flex-col justify-center items-center gap-8 flex-wrap ">
                        <div className="flex sm:flex-row gap-5 flex-wrap w-full justify-center items-center ">
                        {moviesArr.map(movie => (
                            <div key={movie.imdbID} className="duration-500 ease-in-out hover:scale-105">
                                <GenerateCard Title={movie.Title} Year={movie.Year} Type={movie.Type} imdbID={movie.imdbID} Poster={movie.Poster}/>
                            </div>
                        ))}
                        </div>
                    </div>
                    {bookmarkedMovies.length === 0 && <p className="text-lg text-red-500" role="alert" aria-live="polite" >No movies in watchlist 😭😭😭.</p>}
                    <div ref={bottomRef} className="p-4" />
                <button className="btn btn-md btn-primary" onClick={()=> navigate(-1)} role="navigate">Go Back</button>
            </div>
        </section>
    )
}