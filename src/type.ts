interface actionT {
    type: string;
    data?: object;
}

type reducerT = (action?: actionT) => object;

interface reduceTreeT {
    [propName: string]: reducerT;
}

export {
    actionT,
    reducerT,
    reduceTreeT,
};
