import { url } from "node:inspector";
import {Cache} from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor(interval: number) {
    this.#cache = new Cache(interval);
  }
    //
    //@@@ FETCH LOCATIONS @@@
    //
  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area/?limit=20`;

    const page = this.#cache.get<ShallowLocations>(url);  
    if(page != undefined){return page;}

    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Failed to fetch locations: ${response.statusText}`);
    }
    const locations: ShallowLocations = await response.json(); 
    this.#cache.add<ShallowLocations>(url, locations);  
    
    return locations;
    //return response.json();
    };

    //
    //@@@ FETCH ONE LOCATION @@@
    //

  async fetchLocation(locationName: string): Promise<Location> {

    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const page = this.#cache.get<Location>(url);  
    if(page != undefined){
      return page;
    }

    const response = await fetch(url);

    if(!response.ok){
        throw new Error(`Failed to fetch location: ${locationName}`);
    }

    const location:Location = await response.json();
    this.#cache.add<Location>(url, location);

    return location;
  }

  async stopCache() {
    this.#cache.stopReapLoop();
  }
};



export type ShallowLocations = {
  count: number;
  next: string | null; 
  previous: string | null;
  results: Location[]
};

export type Location = {
  id: number;
  name: string;
};