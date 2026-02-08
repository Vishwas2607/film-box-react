import { useQuery, useQueryClient } from "@tanstack/react-query";
import {useEffect, useState } from "react";
import GenerateCard from "./generateCard";
import {FetchHelper} from "./helperFetch";
import Loader from "./loader";

export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface OMDbSearchResponse {
    Search: Movie[];
    totalResults: string; 
    Response: "True" | "False";
    Error?: string;
}


export default function FetchMovies({search}: {search:string}){
    const [page,setPage] = useState(1);
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;

    const omdbApiUrl = import.meta.env.VITE_OMDB_API_URL
    const url:string = `${omdbApiUrl}/?apikey=${apiKey}&s=${search}&page=${page}`;

    const {data,isLoading,error} = useQuery<OMDbSearchResponse>({
        queryKey: ["movies",search,page],
        queryFn: () => FetchHelper(url),

    });

    const queryClient = useQueryClient();
    
    const totalResults: number = data && data.Response === "True" ? parseInt(data.totalResults) : 0;
    const moviesPerPage: number = 10;
    const maxPage: number = Math.ceil(totalResults / moviesPerPage);

    useEffect(()=>{
        const nextPage = ((page + 1) <= maxPage) ? page + 1: page;
        const nextUrl = `${omdbApiUrl}/?apikey=${apiKey}&s=${search}&page=${nextPage}`;
        queryClient.prefetchQuery({
            queryKey:["movies",search,nextPage],
            queryFn: ()=> FetchHelper(nextUrl),
    })
    },[search,page,maxPage,apiKey,queryClient]);

    if (isLoading) {
        return (<Loader/>)
    }

    if(error) {
        return (<p className="text-lg text-red-600" role="alert" aria-live="assertive">{data?.Error || "Something went wrong, please try again..."}</p>)}


    if (data) {
        return(
                <div className="w-full flex flex-col p-2 justify-center gap-8 flex-wrap ">
                    <h3 className="text-3xl font-bold text-black dark:text-white transition duration-500 ease-in-out">
                        Search Results
                        <div className="bg-gradient-to-bl from-violet-400 to-blue-500 p-0.5 rounded-2xl w-[300px] animate-slide-in"></div>
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-5 flex-wrap w-full justify-center items-center ">
                    
                    {data.Search.length ? 
                    (data.Search.map(movie => (
                        <div key={movie.imdbID} className="duration-500 ease-in-outhover:scale-105">
                            <GenerateCard Title={movie.Title} Year={movie.Year} Type={movie.Type} imdbID={movie.imdbID} Poster={movie.Poster}/>
                        </div>
                    ))
                ) : (<p className="text-lg text-red-500" role="alert" aria-live="polite">No results found 😢</p>)
            }
                </div>
            
                <div className="flex gap-5 justify-center items-center">
                    <button className="btn btn-md btn-primary disabled:opacity-70 disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={isLoading || page===1} onClick={() => setPage(prev => Math.max(prev-1,1))}>Prev</button>
                    <p className="text-lg">Page: {page} of {maxPage}</p>
                    <button className="btn btn-md btn-primary disabled:opacity-70 disabled:bg-gray-500 disabled:cursor-not-allowed" onClick={()=> setPage(prev => prev + 1)} disabled={isLoading || page === maxPage}>Next</button>
                </div>
            </div>
        )
    }
}