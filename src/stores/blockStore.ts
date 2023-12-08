import type { IBlock } from "$lib/interfaces";
import { get, writable } from "svelte/store";
import { slotLocations } from "../scripts/clockSlotLocations";
import type { ISlot } from "../lib/interfaces";

export function createHourBlockStore(numberOfHours: number) {
    let uid = 1
    const blocks: IBlock[] = []
    for (let i = 0; i < numberOfHours; i++) {
        blocks.push({
            id: uid++,
            placed: false,
            active: false,
            slot: null
        })
    }

    const { subscribe, update } = writable(blocks)

    const updateBlockSlot = (block: IBlock, newSlot: ISlot) => {
        if (!newSlot) {
            return;
        }
        block.slot = newSlot;
        newSlot.block = block;
        update((blocks) => {
            const index = blocks.findIndex((b) => b.id === block.id);
            if (index !== -1) {
                blocks[index].slot = newSlot;
            }
            return blocks;
        });
    };

    function getPagePosition(element: Element) {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + window.scrollX + rect.width / 2,
            y: rect.top + window.scrollY + rect.height / 2
        };
    }

    return {
        subscribe,
        update,
        mark: (block: IBlock, placed: boolean) => {
            update(blocks => {
                const index = blocks.indexOf(block)
                blocks[index].placed = placed
                return blocks
            })
        },
        updateBlockSlot,
        findClosestAvailableSlot: (e: MouseEvent | TouchEvent, block: IBlock) => {
            const slots = get(slotLocations); // get the current value of the store
            const blockPos = getPagePosition(e.target as Element);
            let closestSlot: ISlot | null = null;
            let distance: number;
            slots.forEach((slot) => {
                if (slot.block) {
                    return;
                }
                const tempDist = Math.sqrt(
                    Math.pow(slot.absolutePosition.x - blockPos.x, 2) +
                    Math.pow(slot.absolutePosition.y - blockPos.y, 2)
                );
                if (!closestSlot) {
                    closestSlot = slot;
                }
                if (tempDist < distance || !distance) {

                    closestSlot = slot;
                    distance = tempDist;
                }
            })
            if (closestSlot) {
                updateBlockSlot(block, closestSlot)
            }
        }
    }
}