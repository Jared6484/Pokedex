import type { State } from "./state.js";
import type { Pokemon } from "./pokeapi.js";

export async function commandCatch(state: State, ...args:string[]): Promise<void> {
    const pokemon_name = args[0];
    console.log(`Throwing a Pokeball at ${pokemon_name}...` )
    try{
        const pokemonData = await state.pokeapi.fetchPokemonData(pokemon_name);
        const difficulty = pokemonData.base_experience;
        const threshold = 600;
        const roll = Math.random() * threshold;
        if(roll > difficulty){
            state.pokedex[pokemon_name] = pokemonData;
            console.log(`${pokemon_name} was caught!`);
            console.log("You may now inspect it with the inspect command.");
        } else {
        console.log(`${pokemon_name} escaped`);
        }
    }catch(e){
        //throw new Error(`You probably mispelled the pokemon. Try again `); //Here's the error:\n\n ${(e as Error).message}\n`);
        console.log(`You probably mispelled the pokemon. Try again `);
    }




}