import { useBookmarks } from "./bookmarkProvider";
import { useRef } from "react";
import GenerateCard from "./generateCard";

import { SwiperSlide } from 'swiper/react';
import { Swiper } from "swiper/react";
import 'swiper/swiper-bundle.css'


export default function ShortWatchList(){
    const {bookmarkedMovies}  = useBookmarks();

    const getMoviesSlice = () => {
    if (bookmarkedMovies.length <= 10) {
      return bookmarkedMovies.slice(); 
    }
    const randomNum = Math.floor(Math.random() * (bookmarkedMovies.length - 10)); //
    return bookmarkedMovies.slice(randomNum, randomNum + 10); //
    };
    console.log(getMoviesSlice())
    const moviesArr = useRef(getMoviesSlice());

    return (
            <div className="flex flex-col justify-center gap-10 p-2 w-full" role="region">
                <h2 className="text-xl md:text-3xl font-bold transition duration-500 ease-in-out">Your Watchlist
                    <div className="bg-gradient-to-bl from-violet-400 to-blue-500 p-0.5 rounded-2xl w-[250px] animate-slide-in"></div>
                </h2>
                    {moviesArr && (
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
                        className="mySwiper"
                        >
                        {moviesArr.current.map(movie => (

                            <SwiperSlide key={movie.imdbID}>
                                <GenerateCard Title={movie.Title} Year={movie.Year} Type={movie.Type} imdbID={movie.imdbID} Poster={movie.Poster}/>
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </div>
                    )}

                    {moviesArr.current.length === 0 && bookmarkedMovies.length === 0 && <p className="text-lg text-red-500 mx-auto" role="alert" aria-live="polite" >No movies in watchlist 😭😭😭.</p>}

            </div>
    )


}