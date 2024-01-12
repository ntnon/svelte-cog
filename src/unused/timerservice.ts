import { writable } from 'svelte/store';

let interval: number;
let startTime: number;

const timerStore = writable(0);

export function startTimer() {
    startTime = Date.now();
    interval = setInterval(() => {
        timerStore.set(Date.now() - startTime);
    }, 1000);
}

export function stopTimer() {
    clearInterval(interval);
}

export function getElapsedTime() {
    let elapsedTime: number = 0;
    timerStore.subscribe(value => {
        elapsedTime = value;
    })();
    return elapsedTime;
}
