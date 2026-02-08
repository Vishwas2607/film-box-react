import { useState } from "react";

export default function useLocalStorage<T>(key:string, initialValue: T): [T, (value:T)=> void] {
    const [storedValue,setStored] = useState<T>(()=>{
        const items = localStorage.getItem(key);
        try {
        return items ? JSON.parse(items) : initialValue;
        } catch {
            return initialValue;
        }
    })

    const setStoredValue= (value:T) => {
        localStorage.setItem(key,JSON.stringify(value));
        setStored(value);
    }

    return [storedValue,setStoredValue];
}

