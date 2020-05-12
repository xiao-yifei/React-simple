import { renderComponent } from "../react-dom";

export default class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {};
    }

    setState(newState){
        Object.assign(this.state,newState);
        renderComponent(this);
    }
}