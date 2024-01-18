import type { LayoutServerLoad } from "./$types";
import type { dataSchema } from "$lib/types";

//get data from server

export const load: LayoutServerLoad = async () => {

    const data: dataSchema = {
        tasks: [],
        survey: {},
        consent: false,
        words: [],
        sus: {}
    }

    return data
}