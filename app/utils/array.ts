export const shuffleArray = <T = any>(array: Array<T>) => {
    const newArray = [...array];
    for (let i = array.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * i);
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const randomElementsFromArray = <T = any>(
    array: Array<T>,
    count: number = 1,
    predicate?: (value: T, index: number, array: T[]) => boolean
) => {
    const filteredArray = predicate ? array.filter(predicate) : [...array];
    if (count >= filteredArray.length) {
        return filteredArray;
    }
    const newArray: Array<T> = [];
    while (newArray.length < count) {
        const index = Math.floor(Math.random() * filteredArray.length);
        newArray.push(filteredArray.splice(index, 1)[0]);
    }
    return newArray;
};

export const addUnique = <T = any>(array: Array<T>, item: T) =>
    array.includes(item) ? array : [...array, item];

export const addAtIndex = <T = any>(array: Array<T>, index: number, item: T) => {
    const newArray = [...array];
    newArray.splice(index, 0, item);
    return newArray;
};

export const setIndex = <T = any>(array: Array<T>, index: number, item: T) => {
    const newArray = [...array];
    newArray[index] = item;
    return newArray;
};

export const addOrRemove = <T = any>(array: Array<T>, item: T) =>
    array.includes(item) ? array.filter(x => x !== item) : [...array, item];

export const atomize = (array: Array<any>) =>
    array.reduce((acc, value) => (acc.includes(value) ? acc : [...acc, value]), []);
