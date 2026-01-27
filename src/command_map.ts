import type { State } from "./state.js";

export async function mapCommand(state: State): Promise<void> {

    const locations = await state.pokeapi.fetchLocations(
        state.nextLocationURL ?? undefined
    );

    state.nextLocationURL = locations.next;
    state.prevLocationURL = locations.previous;

    for(const loc of locations.results){
        console.log(loc.name);
    }
}
