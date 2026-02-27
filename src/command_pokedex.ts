import type { State } from "./state.js";

export async function commandPokedex(state: State){
    console.log(`Your Pokedex:`)
    for(const poke in state.pokedex){
        console.log(`  - ${poke}`);
    }
}