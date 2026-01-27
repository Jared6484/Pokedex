import type { State } from "./state.js";

export async function mapBackCommand(state: State): Promise<void> {

    if(!state.prevLocationURL){
        console.log("you're on the fist page");
        return;
    }

    const locations = await state.pokeapi.fetchLocations(state.prevLocationURL);

    state.nextLocationURL = locations.next;
    state.prevLocationURL = locations.previous;

    for(const loc of locations.results){
        console.log(loc.name);
    }
    
}
