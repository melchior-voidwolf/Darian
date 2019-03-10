import Store from "./Store";
import { actionT, reducerT, reduceTreeT } from "./type";

const createStore = (reducer: reducerT, action?: actionT) => {
    return new Store(
        reducer,
        action || {type: "init"},
    );
};

export default createStore;
