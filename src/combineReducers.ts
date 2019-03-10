import { actionT, reducerT, reduceTreeT } from "./type";

const combineReducer = (reduceTree: reduceTreeT): reducerT => {
    return (action: actionT) => {
        const keys = Object.keys(reduceTree);
        const state = {};
        keys.forEach((key) => {
            state[key] = reduceTree[key](action);
        });
        return state;
    };
};

export default combineReducer;
