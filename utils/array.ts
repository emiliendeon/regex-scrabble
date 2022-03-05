export const shuffleArray = <T = any>(array: Array<T>) => {
    const newArray = [...array];
    for (let i = array.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * i);
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const randomElementsFromArray = (array: Array<any>, count: number = 1) => {
    if (count >= array.length) {
        return array;
    }
    const newArray: Array<any> = [];
    while (newArray.length < count) {
        const x = Math.floor(Math.random() * array.length);
        if (!newArray.includes(array[x])) {
            newArray.push(array[x]);
        }
    }
    return newArray;
};
