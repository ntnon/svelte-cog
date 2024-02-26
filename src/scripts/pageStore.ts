
import type { IStage } from "$lib/interfaces"

const defaultHelpText: string = 'hint'
const defaultNextText: string = 'next >'
interface IPage {
    get: () => void | IStage,
    nextFn: () => void,
    redoFn: (ids: number[]) => void,
    content: IStage[]

}

function createPage(fallbackFn: () => void): IPage {
    const page: IPage = {
        get() {
            return this.content.find((element: IStage) => element.completed === false) ?? fallbackFn();
        },
        nextFn: function () {
            console.log("next")
            page.content.find((element: IStage) => element.completed === false);
        },
        redoFn: function (ids: number[]) {
            console.log("redo")
            this.content = page.content.map((element: IStage) => {
                return ids.includes(element.id) ? { ...element, completed: false } : element;
            });
        },
        content: [
            {
                id: 0,
                completed: false,
                name: {
                    text: 'Introduction'
                },
                progress: {
                    text: '0/2'
                },
                info: {
                    text: 'Press hint to learn how to use the website!'
                },
                main: {
                    hidden: true
                },
                reset: {
                    hidden: true
                },
                help: {
                    highlight: true,
                    text: defaultHelpText,
                    function: function () { page.nextFn() }
                },
                next: {
                    hidden: true
                }
            },
            {
                id: 1,
                completed: false,
                name: {
                    text: 'Introduction',
                    highlight: true
                },
                progress: {
                    text: '1/2',
                    highlight: true
                },
                info: {
                    text: 'Press hint to learn how to use the website!',
                    highlight: true
                },
                main: {
                    text: 'Here you will see the name of the task you are currently doing, the progress bar, and information about to complete the tutorial.'
                },
                reset: {
                    hidden: true
                },
                help: {
                    text: defaultHelpText,
                    function: function () { page.nextFn() }
                },
                next: {
                    hidden: true
                }
            },
            {
                id: 2,
                completed: false,
                name: {
                    text: 'Introduction'
                },
                progress: {
                    text: '2/2'
                },
                info: {
                    text: 'Press hint to learn how to use the website!'
                },
                main: {
                    text: 'The "next" button will start the example task. Press it to continue the tutorial.'
                },
                reset: {
                    hidden: true
                },
                help: {
                    text: defaultHelpText
                },
                next: {
                    text: defaultNextText,
                    highlight: true,
                    function: function () { page.nextFn() }
                }
            },
            {
                id: 3,
                completed: false,
                name: {
                    hidden: true
                },
                progress: {
                    hidden: true
                },
                info: {
                    hidden: true
                },
                main: {
                    hidden: false,
                    text: 'The "next" button will let you advance. Press it to continue the tutorial.'
                },
                reset: {
                    hidden: false,
                    function: function () { page.redoFn([0, 1, 2]) }

                },
                help: {
                    hidden: false,
                    inactive: true,
                    text: defaultHelpText
                },
                next: {
                    hidden: false,
                    highlight: true,
                    text: defaultNextText,
                    function: function () { page.nextFn() }
                }
            }
        ],
    };

    return page;
}

export const introduction = createPage(() => { });

// export const introduction = (): IPage => {
//     return {
//         currentStage: 0,
//         nextFn: function () {
//             this.content.find((element: IStage) => element.completed === false);

//         },
//         redoFn: function () {

//         },
//         content: [
//             {
//                 id: 0,
//                 completed: false,
//                 name: {
//                     text: 'Introduction'
//                 },
//                 progress: {
//                     text: '0/2'
//                 },
//                 info: {
//                     text: 'Press hint to learn how to use the website!'
//                 },
//                 main: {
//                     hidden: true
//                 },
//                 reset: {
//                     hidden: true
//                 },
//                 help: {
//                     highlight: true,
//                     text: defaultHelpText,
//                     function: this.nextFn()
//                 },
//                 next: {
//                     hidden: true
//                 }
//             },
//             {
//                 id: 1,
//                 completed: false,
//                 name: {
//                     text: 'Introduction',
//                     highlight: true
//                 },
//                 progress: {
//                     text: '1/2',
//                     highlight: true
//                 },
//                 info: {
//                     text: 'Press hint to learn how to use the website!',
//                     highlight: true
//                 },
//                 main: {
//                     text: 'Here you will see the name of the task you are currently doing, the progress bar, and information about to complete the tutorial.'
//                 },
//                 reset: {
//                     hidden: true
//                 },
//                 help: {
//                     text: defaultHelpText,
//                     function: nextFn
//                 },
//                 next: {
//                     hidden: true
//                 }
//             },
//             {
//                 id: 2,
//                 completed: false,
//                 name: {
//                     text: 'Introduction'
//                 },
//                 progress: {
//                     text: '2/2'
//                 },
//                 info: {
//                     text: 'Press hint to learn how to use the website!'
//                 },
//                 main: {
//                     text: 'The "next" button will start the example task. Press it to continue the tutorial.'
//                 },
//                 reset: {
//                     hidden: true
//                 },
//                 help: {
//                     text: defaultHelpText
//                 },
//                 next: {
//                     text: defaultNextText,
//                     highlight: true,
//                     function: nextFn
//                 }
//             },
//             {
//                 id: 3,
//                 completed: false,
//                 name: {
//                     hidden: true
//                 },
//                 progress: {
//                     hidden: true
//                 },
//                 info: {
//                     hidden: true
//                 },
//                 main: {
//                     hidden: false,
//                     text: 'The "next" button will let you advance. Press it to continue the tutorial.'
//                 },
//                 reset: {
//                     hidden: true,
//                     function: () => redoFn([0, 1, 2])
//                 },
//                 help: {
//                     hidden: false,
//                     inactive: true,
//                     text: defaultHelpText
//                 },
//                 next: {
//                     hidden: false,
//                     highlight: true,
//                     text: defaultNextText,
//                     function: this.nextFn
//                 }
//             }
//         ],
//     }
// }

