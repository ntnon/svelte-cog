import Routes from '$lib/routes.json';
import { sessionStateManager as ssm } from './sessionStateManager';
import type { IRoute, IStatus } from '$lib/interfaces';

function initialize(): IStatus[] {
    const tracker: IStatus[] = []
    Routes.map((route: IRoute) => {
        tracker.push({
            id: route.id,
            name: route.name,
            path: route.path,
            status: "incomplete"
        })
    })
    return tracker
}

function ensureProgress() {
    ssm.clearItem("progress") // gotta fix this foreal - we don't want to clear the progress every time
    if (!ssm.getItem("progress")) {
        const newProgress = initialize()
        ssm.setItem("progress", newProgress)
        return newProgress
    }
    return ssm.getItem("progress")
}

export function updateProgress(route: IRoute, status: IStatus["status"]) {
    const progress: IStatus[] = ensureProgress();
    const indexToUpdate = progress.findIndex((item: IRoute) => item.id === route.id);
    if (indexToUpdate !== -1) {
        progress[indexToUpdate].status = status;
    }
    ssm.setItem("progress", progress)
}

export function getProgress(route: IRoute): IStatus {
    ensureProgress();
    return ssm.getItem("progress").find((r: IStatus) => r.id === route.id)
}