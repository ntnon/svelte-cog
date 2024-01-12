import Routes from '$lib/routes.json';
import { sessionStateManager as ssm } from './sessionStateManager';
import type { IRoute, IStatus } from '$lib/interfaces';
import { writable } from 'svelte/store';

const routes: IRoute[] = Routes;
const key = "progress"

export const progress = writable<IStatus[]>();
progress.set(initialize());

progress.subscribe((value) => {
    ssm.setItem(key, value);
});

function initialize(): IStatus[] {
    const currentValue = ssm.getItemArray(key);
    if (currentValue === undefined) {
        return newProgress();
    }
    return currentValue;
}


function newProgress(): IStatus[] {
    const newProgress: IStatus[] = []
    routes.map((route: IRoute) => {
        newProgress.push({
            name: route.name,
            path: route.path,
            status: "incomplete"
        })
    })
    return newProgress
}

export function updateProgress(path: string | null, status: IStatus["status"]) {
    if (path) {
        progress.update(value =>
            value.map(r => r.path === path ? { ...r, status } : r)
        );
    }
}