import * as React from "react";
import { Subject } from "rx"
import Store from "./Store"

interface event {
    event: string,
    data?: any,
}

export default (stream: Subject<any>, store: Store) => (Target: React.ComponentType<any>) => {
    return class extends React.Component<any, any> {
        private subjectPath: string
        private store: Store
        constructor(props:any) {
            super(props)
            const { subjectPath = 'subject' } = props
            this.subjectPath = subjectPath
            this.store = store
            this.state = {
                store
            }
        }
        componentDidMount() {
            stream.subscribe(this.handleChange)
        }
        componentWillUnmount() {
            stream.onCompleted()
        }
        handleChange = (e: event) => {
            if (e.event === 'DATA_UPDATE') {
                this.setState({
                    store: store.state
                })
            }
        }
        render() {
            const { subjectPath } = this
            const { store } = this.state
            const targetProps = {
                ...this.props,
                [subjectPath]: store,
            }
            return <Target
                { ...targetProps }
            />
        }
    }
}
