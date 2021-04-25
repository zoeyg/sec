import fetch from "node-fetch";

import { getBody } from "./utils";

const consoleUrl = process.env.CONSOLE_URL ?? "http://localhost:6284/";

export interface Result {
    name: string;
    path: string;
    description: string;
    isStale?: boolean;
}

const cache: { [domain: string]: { [query: string]: Result[] } } = { };

/*const domainCache = cache["__proto__"] ?? {};
domainCache["isStale"] = [{name:"/",path:"/",description:"whatever"}];
cache["__proto__"] = domainCache;*/

export const getResults = async (domain: string, query: string) => {
    if (cache[domain]?.[query]) {
        console.log(`cache[${domain}][${query}] = ${cache[domain][query]}`);
        return cache[domain][query];
    }

    const tokens = query
        .split(/\s+/g)
        .map((x) => x.replace(/[^a-zA-Z0-9]+/g, ""))
        .filter((x) => x !== "");

    const results = await fetch(new URL("/search", consoleUrl), {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ domain, query: tokens }),
    });

    const searchResults: Result[] = await results.json();
    console.log(`Results ${JSON.stringify(searchResults, null, 2)}`);
    const patched = await Promise.all(
        searchResults
            .map(async (result) => {
                if (result.isStale) {
                    const pageUrl = new URL(result.path, "http://" + domain);
                    try {
                        const refetch = await fetch(pageUrl);
                        const body = await refetch.text();
                        result.description = getBody(body).join(" ").trim();
                    } catch (e) {
                        // pass
                    }
                }

                return result;
            })
    );
    console.log(`patched: ${JSON.stringify(patched, null, 2)}`);

    const domainCache = cache[domain] ?? {};
    domainCache[query] = patched;
    cache[domain] = domainCache;

    console.log(`cache: ${JSON.stringify(cache,null, 2)}`);

    return patched;
}