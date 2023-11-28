const conditionMap = [-1, 1];
function defoultComparer(a, b) {
    return a === b ? 0 : conditionMap[+!!(a > b)];
}

export interface ISorterOption {
    key: string;
    reverse?: boolean;
    serializer?: (a) => any;
    comparer?: (a, b) => 0 | 1 | -1;
}

// va piu veloce su Chrome rispetto al ricorsivo
export const simpleSorter = (opt: ISorterOption) => {
    const { key, serializer, reverse, comparer = defoultComparer } = opt;

    return (a, b) => {
        let A = a,
            B = b;

        if (!!key && typeof key === 'string') {
            A = a[key];
            B = b[key];
        }

        if (!!serializer && typeof serializer === 'function') {
            A = serializer(A);
            B = serializer(B);
        }

        return comparer(A, B) * conditionMap[+!reverse];
    };
};

export const multipleSorter = (opt: ISorterOption[]) => {
    if (!(opt && opt.length)) {
        return undefined;
    } // { return (a, b) => 0; }

    return (a, b) => {
        let sortedValue = simpleSorter(opt[0])(a, b);

        for (let i = 1; i < opt.length && sortedValue === 0; i++) {
            sortedValue = simpleSorter(opt[i])(a, b);
        }

        return sortedValue;
    };
};

// va piu veloce su IE rispetto all iterativo
export const multipleSorterRec = (opt: ISorterOption[], i = 0) => {
    if (i >= opt.length) {
        return (a, b) => 0;
    }

    const { key, serializer, reverse, comparer = defoultComparer } = opt[i];

    return (a, b) => {
        let A = a,
            B = b;

        if (!!key && typeof key === 'string') {
            A = a[key];
            B = b[key];
        }

        if (!!serializer && typeof serializer === 'function') {
            A = serializer(A);
            B = serializer(B);
        }

        const order = comparer(A, B);

        return order === 0 ? multipleSorterRec(opt, ++i)(a, b) : order * conditionMap[+!reverse];
    };
};
