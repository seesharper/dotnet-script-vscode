import fetch, { Request } from 'node-fetch';
import { stringify } from 'querystring';


export async function search(searchTerm:string) : Promise<string[]>{        
    var queryString = stringify({q : searchTerm});
    var requestUrl =  `https://api-v2v3search-0.nuget.org/autocomplete?${queryString}`;
    var response = await fetch(requestUrl);
    var json = await response.json();    
    return json.data;
}

export async function getVersions(packageId : string) :Promise<string[]>{
    var queryString = stringify({id : packageId});
    var requestUrl =  `https://api-v2v3search-0.nuget.org/autocomplete?${queryString}`;
    var response = await fetch(requestUrl);
    var json = await response.json();
    return json.data; 
}