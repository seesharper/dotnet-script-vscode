import fetch, { Request } from 'node-fetch';
import { stringify } from 'querystring';


export async function search(searchTerm:string) : Promise<string[]>{        
    let queryString = stringify({q : searchTerm});
    let requestUrl =  `https://api-v2v3search-0.nuget.org/autocomplete?${queryString}`;
    let response = await fetch(requestUrl);
    let json = await response.json();    
    return json.data;
}

export async function getVersions(packageId : string) :Promise<string[]>{
    let queryString = stringify({id : packageId});
    let requestUrl =  `https://api-v2v3search-0.nuget.org/autocomplete?${queryString}`;
    let response = await fetch(requestUrl);
    let json = await response.json();
    return json.data; 
}