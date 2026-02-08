import { useNavigate } from "react-router-dom"

export default function AboutUs() {
    const navigate = useNavigate();

    return(
        <section className="animate-fade-in" >
            <div className="flex flex-col items-center gap-10 p-5 w-full">
                <h2 className="text-3xl font-bold text-center transition duration-500 ease-in-out">About Us
                    <div className="bg-gradient-to-bl from-violet-400 to-blue-500 p-0.5 rounded-2xl w-[200px]"></div>
                </h2>

                <div className="w-full">
                    <h4 className="text-base md:text-lg font-bold lg:text-center">The FilmBox app offers a gateway to the world of cinema. The goal is to make finding your next favorite film effortless and enjoyable.</h4>
                    <p className="text-base md:text-lg mt-5">
                       <strong> Mission: </strong>
To provide movie enthusiasts with a seamless and intuitive platform to explore, discover, and organize their cinematic journeys.
                    </p>
                    <ul className="mt-5">
                        <li><strong>Extensive Movie Database: </strong>A vast library of films is available, fetched directly from the OMDb API, with detailed information for each movie.
</li>
                        <li><strong>Intuitive Search Functionality: </strong>Easily find movies by title using the smart search bar. Get a list of relevant films based on your keywords and explore their details.
</li>
                        <li><strong>Personalized Watchlist: </strong>Add favorite films to your watchlist for easy access and organization.</li>
                    </ul>
                

                <div className="w-full">
                    <h4 className="text-base md:text-lg font-bold">Built with modern technologies</h4>
                    <p className="mt-5">
                        The movie finder app uses the latest web development tools to deliver a smooth and responsive experience.
                    </p>
                    <ul className="mt-5">
                        <li><strong>React: </strong>For building a dynamic and interactive user interface.</li>
                        <li><strong>TypeScript: </strong>Ensuring code quality, maintainability, and scalability.</li>
                        <li><strong>Tailwind CSS: </strong>For a clean, modern, and customizable design that looks great on any device.</li>
                    </ul>
                </div>
            </div>
                <button className="btn btn-md btn-primary" onClick={()=> navigate(-1)} role="navigate">Go Back</button>
            </div>
        </section>
    )
}