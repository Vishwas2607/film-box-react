import { useQuery } from "@tanstack/react-query";
import Loader from "./loader";
import GenerateCard from "./generateCard";
import { useRef } from "react";
import RapidApiFetchHelper from "./rapid_api_fetch";
import {Swiper} from "swiper/react";
import { SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css'
import { Navigation, Pagination } from 'swiper/modules';

export interface ResultType {
  id: string;
  originalTitleText: {text:string;};
  primaryImage: {url:string;};
  releaseYear: {year:string}
}

export interface RapidApiData {
  results: ResultType[];
}

export function generateRandomGenre(){
  const genres = ["Action","Comedy","Drama","Sci-Fi","Horror","Thriller","Adventure","Romance"]
    const randomNum = Math.floor(Math.random() * genres.length);
    return genres[randomNum];
}

export default function RapidApiFetch () {
  const initialGenre = useRef(generateRandomGenre());
  const genres = initialGenre.current;
  const rapidApiUrl = import.meta.env.VITE_RAPID_API_URL
  const url = `${rapidApiUrl}/titles?titleType=movie&genre=${genres}&limit=10&year=2025`

  const {data,isLoading,error} = useQuery<RapidApiData, Error>({
    queryKey: ["top-rated-movies",genres,url],
    queryFn: ()=> RapidApiFetchHelper(url),
    refetchOnWindowFocus: false,
    retry: 1,
  })

    return (
        <div className="flex flex-col gap-10 px-2 justify-center w-full">
            <h2 className="text-3xl font-bold transition duration-500 ease-in-out w-fit">
                Recent and Upcoming {genres} Movies
                <div className="bg-gradient-to-bl from-violet-400 to-blue-500 p-0.5 rounded-2xl animate-slide-in"></div>
            </h2>

            {isLoading && <Loader />}
            {error && (<p className="text-lg text-red-600 mx-auto" role="alert" aria-live="assertive">{"Something went wrong, please try again..."}</p>)} 
            {data && !error && (
                <div className="w-full px-5">
                  <Swiper
                        modules={[Navigation, Pagination]}
                        slidesPerView={2}
                        spaceBetween={20}
                        breakpoints={{

                            640:{
                                slidesPerView:3,
                                spaceBetween:20,
                            },
                            768:{
                                slidesPerView:3,
                                spaceBetween:30,
                            },
                            1024:{
                                slidesPerView:4,
                                spaceBetween:40,
                            },
                            1280:{
                                slidesPerView:5,
                                spaceBetween:50,
                            },
                        }}
                        className="mySwiper w-full"
                        >
                    {data.results.map(movie => (
                        <SwiperSlide key={movie.id}>
                            <GenerateCard Title={movie.originalTitleText?.text ?? "Untitled"} Year={movie.releaseYear?.year?.toString() ?? "2025"} Type={"movie"} imdbID={movie.id} Poster={movie.primaryImage?.url ?? "No image available"}/>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                </div>
            )}
        </div>
  )

}