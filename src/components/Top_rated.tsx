import { useQuery } from "@tanstack/react-query";
import Loader from "./loader";
import GenerateCard from "./generateCard";
import type { RapidApiData } from "./fetchFromRapidApi";
import RapidApiFetchHelper from "./rapid_api_fetch";
import { SwiperSlide } from 'swiper/react';
import { Swiper } from "swiper/react";
import 'swiper/swiper-bundle.css'


export default function TopRatedMovies () {
  
  const url = 'https://movie-database-api1.p.rapidapi.com/titles?list=top_rated_english_250&titleType=movie&limit=10&sort=year.decr'
  
  const {data,isLoading,error} = useQuery<RapidApiData>({
    queryKey: ["top-rated-english-movies",],
    queryFn: () => RapidApiFetchHelper(url),
    refetchOnWindowFocus: false,
    retry: 1,
  })
  console.log(data)
    return (
        <div className="flex flex-col gap-10 px-2 justify-center w-full" role="region">
            <h2 className="text-3xl font-bold transition duration-500 ease-in-out w-fit">
                Top Rated English Movies
                <div className="bg-gradient-to-bl from-violet-400 to-blue-500 p-0.5 rounded-2xl animate-slide-in"></div>
            </h2>

            {isLoading && <Loader />}
            {error && (<p className="text-lg text-red-600 mx-auto" role="alert" aria-live="assertive">Something went wrong, please try again...</p>)} 
            {data && data.results && !error && (
                <div className="w-full px-5">
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={20}
                        breakpoints={{

                            640:{
                                slidesPerView:3,                         },
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
                        className="mySwiper2 w-full"
                        >
                    {data.results.map(movie => (
                        <SwiperSlide key={movie.id}>
                            <GenerateCard Title={movie.originalTitleText.text} Type="movie" Year={movie.releaseYear.year} Poster={movie.primaryImage.url} imdbID={movie.id} />
                            </SwiperSlide>
                        ))}
                        
                    </Swiper>
                </div>
            )}
        </div>
  )

}