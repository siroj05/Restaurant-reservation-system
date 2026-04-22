interface FetchOptions {
    method? : string
    body? : unknown
}

export async function apiFetch<T>(url : string, options? : FetchOptions) : Promise<T> {
    const res = await fetch(url, {
        method : options?.method ?? "GET",
        headers : { "Content-Type" : "application/json" },
        body : options?.body? JSON.stringify(options?.body) : undefined
    })

    const data = await res.json() as T

    if(!res.ok){
        throw new Error((data as {error?: string}).error ?? "Something went wrong.")
    }

    return data
}