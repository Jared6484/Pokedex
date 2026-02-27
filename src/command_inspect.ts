import { Pokemon } from "./pokeapi.js";
import type { State } from "./state.js";

export async function commandInspect(state: State, ...args:string[]): Promise<void> {
    const pokemon_name = args[0];
    if(!state.pokedex[pokemon_name]){
        console.log("you have not caught that pokemon");
        return;
    }
    const pokemonObj = state.pokedex[pokemon_name];

    console.log(`Name: ${pokemonObj.name}` );
    console.log(`Height: ${pokemonObj.height}` );
    console.log(`Weight: ${pokemonObj.weight}` );
    console.log(`Stats:` );
    for(const stat of pokemonObj.stats){
        console.log(`  = ${stat.stat.name}: ${stat.base_stat}`)
    }
    console.log("Types:");
    for(const type of pokemonObj.types){
        console.log(`  - ${type.type.name}`);
    }
    
}