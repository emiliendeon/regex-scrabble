export const select = <T extends object>(obj: T, keys: (keyof T)[]): {} =>
    keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
