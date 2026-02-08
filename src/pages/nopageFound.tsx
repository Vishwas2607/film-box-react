import { useNavigate } from "react-router-dom"

export default function NoPageFound() {
    const navigate = useNavigate();
    return (
        <section className="animate-fade-in">
            <div className="flex flex-col gap-10 h-[500px] justify-center items-center">
                <h2 className="text-2xl md:text-3xl font-bold">404 ERROR !!!</h2>
                <h3 className="text-lg md:text-xl font-semibold">Oops something went wrong.</h3>
                <p role="alert" aria-live="assertive">Please check the URL, if typed manually.</p>
                <div className="flex gap-10 justify-center items-center">
                <button className="btn btn-md btn-primary" onClick={()=> navigate(-1)} role="navigate">Go Back</button>
                <button className="btn btn-md btn-primary" onClick={()=>navigate("/")}>Go Home</button>
                </div>
            </div>
            
        </section>
    )
}