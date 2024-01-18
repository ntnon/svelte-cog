export const dummyStore: Storage = {
    length: 0,
    clear: function () { },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getItem: function (key: string) { return null; },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    key: function (index: number) { return null; },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeItem: function (key: string) { },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setItem: function (key: string, value: string) { },
    getAll: function () { return null; },
};