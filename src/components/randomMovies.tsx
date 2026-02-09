import { useQuery } from "@tanstack/react-query";
import GenerateCard from "./generateCard";
import {FetchHelper} from "./helperFetch";
import type { OMDbSearchResponse } from "./fetch";
import Loader from "./loader";
import { useRef } from "react";
import {Swiper} from "swiper/react";
import { SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css'


export function generateRandomNum(num:number){
    const randomNum = Math.floor(Math.random() * num);
    return randomNum;
}

export default function RandomMovies() {

    const titles = ["Mystery","Live","Law","Survival","Villain","Showdown","Climax","Revenge","War","Inspiring","Uplifting","Hate","Emotional","Sacrifice","Explore","The","True","Romance","Movie","Film","Alien","Psycho","Fight","Love","Life","Hope","Freedom","Truth","Rebellion","Justice","FriendShip","Beauty","Journey","Lost","Secret","Death","Time","Dream","Night","Day","World","Home","Start","Story","Man","Girl","City","Quest","Real","Trip"];
    const years = ["2020","2021","2022","2023","2024","2025","2026"];

    const randomNum = useRef(generateRandomNum(titles.length));
    const randomGenre = titles[randomNum.current];
    const randomYear = useRef(years[generateRandomNum(years.length)]);
    const myApiKey = import.meta.env.VITE_OMDB_API_KEY ;

    const omdbApiUrl = import.meta.env.VITE_OMDB_API_URL;
    const url = `${omdbApiUrl}/?apikey=${myApiKey}&s=${randomGenre}&y=${randomYear.current}`

    const {data,isLoading,error} = useQuery<OMDbSearchResponse>({
        queryKey: ["randomMovies", randomGenre,randomYear.current],
        queryFn: () => FetchHelper(url),
        refetchOnWindowFocus: false,
        retry: 1,
    })


    return (
        <div className="flex flex-col gap-10 px-2 w-full justify-center" role="region">
            <h2 className="text-xl md:text-3xl font-bold transition duration-500 ease-in-out">
                Random Movies
                <div className="bg-gradient-to-bl from-violet-400 to-blue-500 p-0.5 rounded-2xl w-[250px] mr-2 animate-slide-in"></div>
            </h2>

            {isLoading && <Loader />}
            {error && (<p className="text-lg text-red-600 mx-auto" role="alert" aria-live="assertive">Something went wrong, please try again...</p>)} 
            {!error && ( data?.Search?.length ?(
                <div className="w-full px-5">
                        <Swiper
                        slidesPerView={2}
                        spaceBetween={20}
                        breakpoints={{

                            640:{
                                slidesPerView:3,
                            },
                            768:{
                                slidesPerView:3,
                            },
                            1024:{
                                slidesPerView:4,
                            },
                            1280:{
                                slidesPerView:5,
                            },
                        }}
                        className="mySwiper w-full"
                        >
                    {data.Search.map(movie => (
                        <SwiperSlide key={movie.imdbID}>
                            <GenerateCard Title={movie.Title} Year={movie.Year} Type={movie.Type} imdbID={movie.imdbID} Poster={movie.Poster}/>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                </div>
            ): <p  className="text-lg text-red-600 mx-auto" role="alert" aria-live="polite">No movies found for "{randomGenre}" ({randomYear.current})</p>
)}

            {!data && !error && !isLoading && <p className="text-lg text-red-600 mx-auto" role="alert" aria-live="polite">No random movies available to show.</p> }
        </div>
    )
}