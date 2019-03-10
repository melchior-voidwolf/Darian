import { actionT, reducerT } from "./type";

class Store {
    public state: object;
    public reducer: reducerT;
    constructor(reducer: reducerT, action: actionT) {
        this.reducer = reducer;
        this.state = this.reducer(action);
    }
    public dispatch = (action: actionT) => {
        this.state = this.reducer(action);
        return this.state;
    }
}

export default Store;
