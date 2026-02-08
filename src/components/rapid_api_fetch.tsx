

export default async function RapidApiFetchHelper<T>(url:string):Promise<T> {
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    const apiHost = import.meta.env.VITE_RAPIDAPI_HOST;

    if (!apiKey || !apiHost) {
    throw new Error("Missing RapidAPI credentials in environment variables.");
  }

    const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiHost,
    },
  };
  
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed (${response.status} ${response.statusText}): ${errorText}`
      );
    }

    return (await response.json()) as T;
  } catch (err) {
    console.error("RapidAPI Fetch Error:", err);
    throw err;
  }
}