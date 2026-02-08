import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom";
import {FetchHelper} from "../components/helperFetch";
import { useIsSavedLocal } from "../components/isSavedLocal";
import { useBookmarks } from "../components/bookmarkProvider";
import Loader from "../components/loader";
import RapidApiFetch from "../components/fetchFromRapidApi";


interface MovieDetailsType {
    Actors : string;
    Awards: string;
    Country: string;
    Director: string;
    Genre: string;
    Plot: string;
    Rated: string;
    imdbRating: string;
    imdbVotes: string;
    Released: string;
    Title: string;
    Type: string;
    Poster:string;
    Year: string;
}

export default function MovieDetails(){

    const {id} = useParams();
    const navigate = useNavigate();
    
    const {toggleBookmark}  = useBookmarks();

    if (!id) return null;

    const myApiKey = import.meta.env.VITE_MY_KEY ;
    const url = `https://www.omdbapi.com/?apikey=${myApiKey}&i=${id}`
    
    const {data,isLoading,error} = useQuery<MovieDetailsType>({
        queryKey: ["moviedetail", id],
        queryFn: () => FetchHelper(url)
    })

    

        return (<section className="flex flex-col justify-center gap-10 min-h-[400px] animate-fade-in">
            {isLoading && <Loader/>}
            {error && <p className="text-lg text-red-500 mx-auto mt-10" role="alert" aria-live="assertive">Something went wrong, Please try again.</p>}
            {data && !isLoading && !error && (
                
            <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 mt-5 mx-auto">Movie: {data.Title}
                <div className="bg-gradient-to-bl from-violet-400 to-blue-500 p-0.5 rounded-2xl"></div>
            </h2>
                <div className=" flex justify-center items-center flex-col md:flex-row gap-10 px-5">
                <img src={data.Poster} alt={`${data.Title}'s Potser`} aria-label={`${data.Title}'s Potser`} title={`${data.Title}'s Potser`} className="w-[250px] h-[400px] border-2 border-black rounded-lg"/>
                <div className="flex flex-col justify-start items-start gap-2 w-full border-2 ">
                <div className="flex gap-10 justify-center items-center mt-5 px-2">
                <p className="text-lg md:text-xl"> ⭐{data.imdbRating}  ({data.imdbVotes})</p>
                <p className="text-gray-600 rounded-lg dark:text-gray-300 border-2 border-gray-700 dark:border-gray-500 py-1 px-2">Rated: {data.Rated}</p>
                <button onClick={()=> toggleBookmark({Title: data.Title, Year: data.Year, Poster:data.Poster, Type:data.Type ,imdbID: id})} className="inline-flex text-lg md:textxl text-blue-400 hover:text-blue-700 transition duration-500 ease-in-out border-2 px-2 py-1 rounded-lg active:text-red-500">{useIsSavedLocal(id) ? "Remove from watchlist" : "Add to watchlist"}</button>
                </div>
                    <ul className="md:text-lg flex flex-col py-3 w-full gap-2">
                    <li className="border-b-2 rounded-br-full border-blue-500 p-2">Released: {data.Released}</li>
                    <li className="border-b-2 rounded-br-full border-blue-500 p-2">Type: {data.Type}</li>
                    <li className="border-b-2 rounded-br-full border-blue-500 p-2">Genre: {data.Genre}</li>
                    <li className="border-b-2 rounded-br-full border-blue-500 p-2">Country: {data.Country}</li>
                    <li className="border-b-2 rounded-br-full border-blue-500 p-2">Actors: {data.Actors}</li>
                    <li className="border-b-2 rounded-br-full border-blue-500 p-2">Director: {data.Director}</li>
                    </ul>
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-lg font-bold">Plot: </h3>
                <p className="text-lg">{data.Plot}</p>
            </div>
            </div>
            )}

            {data && !error && <RapidApiFetch/>}
            <div className="flex gap-10 justify-center items-center">
            <button className="btn btn-md btn-primary" onClick={()=> navigate(-1)} role="navigate">Go Back</button>
            <button className="btn btn-md btn-primary" onClick={()=>navigate("/watchlist")}>Go To Watchlist</button>
            </div>
        </section>
        );
}