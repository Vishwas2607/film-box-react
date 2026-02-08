import React, { Fragment, useState} from "react"
import FetchMovies from "../components/fetch";
import RandomMovies from "../components/randomMovies";
import RapiApiFetch from "../components/fetchFromRapidApi";
import ShortWatchList from "../components/Miniwatchlist";
import TopRatedMovies from "../components/Top_rated";

export default function Home(){
    const [search,setSearch] = useState<string| null>(null);
    const [showError, setError] = useState(false);
    
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);
        const formData = new FormData(e.currentTarget);
        const searchText = formData.get("search") as string;
        if (searchText.length < 4) {
            return setError(true)
        }
        setSearch(searchText);
    };


    return(
        <section className="animate-fade-in">
            <div className="p-3 flex flex-col gap-5 items-center flex-wrap text-center justify-center w-full h-[350px] bg-[linear-gradient(to_right_bottom,rgba(166,25,255,0.5),rgba(20,29,209,0.5)),url('/hero.jpg')] bg-cover bg-no-repeat bg-center ">
                <h2 className="text-4xl md:text-5xl font-bold uppercase text-white text-shadow-md text-shadow-black">Your cinematic journey starts here.</h2>
                <p className="text-white text-xl md:text-2xl font-semibold text-shadow-md text-shadow-black">Discover your next favourite next film <br></br> and curate your personal watchlist for endless entertainment.</p>
                <div className="flex items-center justify-center">
                <form onSubmit={handleSubmit}>
                <input type="text" name="search" title="Search-box" className="w-[250px] md:w-[350px] text-base md:text-lg dark:bg-gray-800 bg-violet-100 px-2 py-2 text-black dark:text-white transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500" role="searchbox" placeholder="Search for..." aria-label="Search-Box"/>
                <button type="submit" className="btn btn-md rounded-none py-1.5 md:py-2 text-lg text-white hover:bg-red-600 bg-red-400 dark:bg-red-500" title="Search" role="search">Search</button>
                </form>
                </div>
                {showError && <span className="text-xl text-red-500 font-semibold text-shadow-md text-shadow-black mx-auto" role="alert" aria-live="assertive">Type at least 3 characters to search.</span>}
            </div>

            <div className="flex flex-col gap-10 flex-wrap mt-10">
               {!search && (
                <Fragment>
                <ShortWatchList/>
                <RapiApiFetch/>
                <TopRatedMovies/>
                <RandomMovies/>
                </Fragment>
            )}
                {search && <FetchMovies search={search}/>}
            </div>
        </section>
    )
}