export const arrayToObj = (key: string, value: string, array: Array<any>) =>
    array.reduce((acc, curr) => ((acc[curr[key]] = value ? curr[value] : curr), acc), {});

export function trackByFN(index, item, fieldId) {
    if (!item) {
        return null;
    }
    return fieldId && item[fieldId] ? item[fieldId] : index;
}

