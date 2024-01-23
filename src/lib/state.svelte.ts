import { writable, type Writable } from "svelte/store";
import { getContext, setContext } from "svelte";
import { dummyStore } from "../scripts/dummyStore";
import { browser } from "$app/environment";
import type { StorageType } from "./types";
import settings from "./settings.json";

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

const persistentStore = <T>(key: string, initialData: T, storage: StorageType) => {
	const { subscribe, set, update } = writable<T>(initialData);
	subscribe((value) => {
		const fullKey = settings.key + key;
		const storageObject = storageSelector(storage);
		storageObject.setItem(fullKey, JSON.stringify(value));
		return value;
	})
	return {
		subscribe,
		set,
		update,
	}
}

export function setDataStore<T>(CTX: string, storage: StorageType, initialData: T) {
	const store = persistentStore<T>(CTX, initialData, storage);
	setContext(CTX, store);
	return store;
}

export function getDataStore<T>(CTX: string) {
	const context = getContext<Writable<T>>(CTX);
	if (context === undefined) {
		console.warn("Context not found for CTX: " + CTX)
	}
	return context
}