import * as React from "react";
import { Subject } from "rx"
import Store from "./Store"
import { actionT, reducerT } from "./type";

interface eventT {
    event: string,
    data?: any,
}

interface bindLinkT {
    stream: Subject<any>,
    store: Store,
    dispath: (action: actionT) => any,
}

interface bindCfgT {
    subjectPath?: string,
    dispathPath?: string,
}

export default (bindLink: bindLinkT) => (bindCfg: bindCfgT) =>(Target: React.ComponentType<any>) => {
    return class extends React.Component<any, any> {

        constructor(props:any) {
            super(props)
            this.state = {
                store: bindLink.store.state
            }
        }
        componentDidMount() {
            bindLink.stream.subscribe(this.handleChange)
        }
        componentWillUnmount() {
            bindLink.stream.onCompleted()
        }
        handleChange = (e: eventT) => {
            if (e.event === 'DATA_UPDATE') {
                this.setState({
                    store: bindLink.store.state
                })
            }
        }
        render() {
            const { subjectPath = 'subject' } = bindCfg
            const { dispathPath = 'dispatch' } = bindCfg
            const { store, dispath } = bindLink
            const targetProps = {
                ...this.props,
                [subjectPath]: store,
                [dispathPath]: dispath,
            }
            return <Target
                { ...targetProps }
            />
        }
    }
}
