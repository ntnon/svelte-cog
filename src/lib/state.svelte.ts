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


const CTX = "appState"; //retrieve from default data settings?

export function setDataStore<T>(initialData: T) {
	setContext(CTX, initialData);
	return initialData;
}

export function getAppState(): IAppData {
	const context: IAppData = getContext(CTX);
	if (context === undefined) {
		console.warn("Context not found for CTX: " + CTX)
	}
	return context
}