//import { T } from "vitest/dist/chunks/traces.d.402V_yFI";

import { validateHeaderName } from "node:http";
import { getDefaultAutoSelectFamilyAttemptTimeout } from "node:net";

export type CacheEntry<T> = {
    createdAt: number,
    val: T;
};

export class Cache{
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(intvl: number){
        this.#interval = intvl;
        this.#startReapLoop();
    }

    public add<T>(key:string, val: T): void{
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: val,
        });
    }
    public get<T>(key:string): T | undefined{
        const entry = this.#cache.get(key);  // entry is of type CacheEntry.. 
        return entry?.val as T | undefined; 
    }
    #reap(): void{
        const cutoff = Date.now() - this.#interval;
        for(const [key, entry] of this.#cache){
            if(entry.createdAt < cutoff){
                this.#cache.delete(key);
            }
        }
    }
    #startReapLoop(): void{
        //this.#reapIntervalId = setInterval(this.#reap, this.#interval);
        this.#reapIntervalId = setInterval(()=> this.#reap(), this.#interval);
        // setInterval() to call #reap after #this.interval.
        // store the intervalId in this.reapInvervalId
    }
    public stopReapLoop(){
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId == undefined;
    }
}

