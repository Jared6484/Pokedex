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

    const cache = this.#cache.get<Location>(url);  
    if(cache != undefined){
      return cache;  // This whole if statement really means, if cached, use the cache. 
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

  async fetchPokemonData(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    
    const cachePage = this.#cache.get<Pokemon>(url);
    if(cachePage != undefined){
      return cachePage;
    }
    try{
      const response = await fetch(url);
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const pokemon: Pokemon = await response.json();
      this.#cache.add<Pokemon>(url, pokemon);

      return pokemon;

    } catch(e){
      throw new Error(`Error fetching locations: ${e as Error}.message}`);
    }
}

};




export type Pokemon = {
  "id": number,
  "name": string,
  "base_experience": number,
  "height": number,
  "is_default": boolean,
  "order": number,
  "weight": number,
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];

  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};

export type ShallowLocations = {
  count: number;
  next: string | null; 
  previous: string | null;
  results: Location[]
};

export type Location = {
  "id": 1,
  "name": "canalave-city-area",
  "game_index": 1,
  "encounter_method_rates": [
    {
      "encounter_method": {
        "name": "old-rod",
        "url": "https://pokeapi.co/api/v2/encounter-method/2/"
      },
      "version_details": [
        {
          "rate": 25,
          "version": {
            "name": "platinum",
            "url": "https://pokeapi.co/api/v2/version/14/"
          }
        }
      ]
    }
  ],
  "location": {
    "name": "canalave-city",
    "url": "https://pokeapi.co/api/v2/location/1/"
  },
  "names": [
    {
      "name": "",
      "language": {
        "name": "en",
        "url": "https://pokeapi.co/api/v2/language/9/"
      }
    }
  ],
  "pokemon_encounters": [
    {
      "pokemon": {
        "name": "tentacool",
        "url": "https://pokeapi.co/api/v2/pokemon/72/"
      },
      "version_details": [
        {
          "version": {
            "name": "diamond",
            "url": "https://pokeapi.co/api/v2/version/12/"
          },
          "max_chance": 60,
          "encounter_details": [
            {
              "min_level": 20,
              "max_level": 30,
              "condition_values": [],
              "chance": 60,
              "method": {
                "name": "surf",
                "url": "https://pokeapi.co/api/v2/encounter-method/5/"
              }
            }
          ]
        }
      ]
    }
  ]
};

