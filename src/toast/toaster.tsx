
import { useToastContext } from "./toastProvider";

export default function Toaster(){

    const {toasts,removeToast} = useToastContext();


    function bgColor(status:string):string {
        let color: string;
        switch (status) {
            case "success":
                color = "bg-green-500";
                break

            case "info":
                color = "bg-blue-500";
                break
            default:
                color = "bg-yellow-500"
                break
        }
        return color
    }

    const handleToast= (id:string) => {
        removeToast(id);
    }

    return (
        <div className=" fixed bottom-4 right-4 space-y-2 z-10">
            {toasts.map(toast=> (
                <div key={toast.id} role="alert" aria-live="polite" className={`relative rounded-lg shadow-md ${bgColor(toast.type)} p-4 border-2 max-w-[300px] hover:scale-[1.02] transition duration-300 ease-in-out transform text-white font-semibold text-lg text-left wrap-break-word translate-x-0 z-20 backface-visible-none`} >
                    <h3 className="mt-5">{toast.message}</h3>
                    <button className="absolute top-1 right-1 btn btn-sm btn-ghost" onClick={()=> handleToast(toast.id)} aria-label="close-toast">X</button>
                </div>
            ))}
        </div>
    )
}