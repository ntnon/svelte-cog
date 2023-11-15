import Routes from '$lib/routes.json';
import { onMount } from 'svelte';
import { SessionStorageManager as ssm } from './sessionStorage';
import type { IRoute, IStatus } from '$lib/interfaces';

onMount(() => {
    ssm.getItem("progress") || ssm.setItem("progress", initialize());
})

function initialize(): IStatus[] {
    const tracker: IStatus[] = []
    Routes.map((route: IRoute) => {
        tracker.push({
            id: route.id,
            name: route.name,
            path: route.path,
            status: "incomplete"
        })
    }
    )
    return tracker
}

export function updateProgress(route: IRoute, status: IStatus["status"]) {
    const progress: IStatus[] = ssm.getItem("progress")
    const index = progress.findIndex((r: IStatus) => r.id === route.id)
    progress[index].status = status
    ssm.setItem("progress", progress)
}

export function getProgress(route: IRoute): IStatus {
    return ssm.getItem("progress").find((r: IStatus) => r.id === route.id)
}