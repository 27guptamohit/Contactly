export function ArrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}
  
export function DeepEquals(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (areObjects && !DeepEquals(val1, val2) ||
            !areObjects && val1 !== val2) {
            return false;
        }
    }
    return true;
}

export function ArrayDeepEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => DeepEquals(val, b[index]));
}

function isObject(object) {
    return object != null && typeof object === 'object';
}