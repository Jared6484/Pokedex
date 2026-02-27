import type { State } from "./state.js";
import type { Location } from "./pokeapi.js";

export async function commandExplore(state: State, ...args:string[]): Promise<void> {
    //console.log("ARGS", args)

    const location_name = args[0];
    const location = await state.pokeapi.fetchLocation(location_name);


    for(const encounter of location.pokemon_encounters){
        console.log(encounter.pokemon.name);
    }
}