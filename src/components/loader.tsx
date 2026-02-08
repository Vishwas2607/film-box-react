export default function Loader() {
    return (
        <div className="flex flex-col gap-5" aria-label="Loader" role="status" aria-busy="true">
        <div className="flex justify-center gap-5 items-end h-[80px]">
            <span className="w-[30px] h-[30px] bg-red-500 rounded-full animate-jump-up "/>
            <span className="w-[30px] h-[30px] bg-red-500 rounded-full animate-jump-up" style={{ animationDelay: "0.2s" }} />
            <span className="w-[30px] h-[30px] bg-red-500 rounded-full animate-jump-up" style={{ animationDelay: "0.4s" }} />
        </div >
        <p className="text-lg font-semibold md:text-xl mx-auto">Loading...</p>
        </div>
    )
}