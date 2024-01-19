import type { LayoutServerLoad } from "./$types";
import type { DataSchema } from "$lib/types";
import { getRandomWords } from "../scripts/getRandomWords";

//get data from server

export const load: LayoutServerLoad = async () => {

    const data: DataSchema = {
        tasks: {},
        consent: false,
        words: getRandomWords(),
        sus: {}
    }

    return data
}