import { getContext, setContext } from "svelte";
import { dummyStore } from "../scripts/dummyStore";
import { browser } from "$app/environment";
import type { StorageType } from "./types";
import type { IAppData } from "./dataInterfaces";


export const storageSelector = (type: StorageType): Storage => {
	if (!browser) {
		return dummyStore
	}
	switch (type) {
		case "local":
			return window.localStorage
		case "session":
			return window.sessionStorage;
	}
}



export function setDataStore<T>(CTX: string, storage: StorageType, initialData: T) {
	setContext(CTX, initialData);
	return initialData;
}

export function getData(CTX: string): IAppData {
	const context: IAppData = getContext(CTX);
	if (context === undefined) {
		console.warn("Context not found for CTX: " + CTX)
	}
	return context
}