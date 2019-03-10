import { Subject } from "rx";

import Store from "./Store";
import { actionT, reducerT } from "./type";

const createStoreSubject = (reducer: reducerT, initAction?: actionT) => {
    const store = new Store(
        reducer,
        initAction || {type: "init"},
    );
    const stream = new Subject();
    const dispatch = ( action: actionT ) => {
        const nextState = store.dispatch(action);
        stream.onNext({
            event: "DATA_UPDATE",
        });
        return nextState;
    };
    return {
        dispatch,
        store,
        stream,
    };
};

export default createStoreSubject;
