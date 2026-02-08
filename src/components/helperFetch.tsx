
export async function FetchHelper(url:string){

     const response = await fetch(url);
     if (!response.ok) { 
     const errorData = await response.json();
     throw new Error(errorData.Error || "Failed to fetch movies due to server issue.");
    }
    return response.json();
        
}