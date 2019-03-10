import { actionT, reducerT, reduceTreeT } from "./type";

class Store {
    public state: object;
    public reducer: reducerT;
    constructor(reducer: reducerT, action: actionT) {
        this.reducer = reducer;
        this.state = this.reducer(action);
    }
    public getState = () => {
        return this.state;
    }
    public dispath = (action: actionT) => {
        this.state = this.reducer(action);
        return this.getState();
    }
}

export default Store;
