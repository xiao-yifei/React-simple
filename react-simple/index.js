import React, { Component } from './react'
import ReactDom from './react-dom';

const ele = (
    <div className="active" title="123" onClick={() => { alert(123) }}>
        hello,<span>React<span>!</span></span>
    </div>
)

const Home = (props) => {
    return <div className="active" onClick={props.onClick}>
        <span>{props.title}</span>
    </div>
}

console.log(Component);

class Example extends Component {
    constructor(props) {
        super(props);
        this.state = { num : 0 };
    }

    componentWillMount() {
        console.log("willMount");
    }

    componentWillUnmount() {
        console.log("willUnmount");
    }

    componentDidMount() {
        console.log("didMount");
    }

    componentWillReceiveProps(){
        console.log("receiveProps");
    }

    componentWillUpdate(){
        console.log("willUpdate");
    }

    componentDidUpdate(){
        console.log("didUpdate");
    }

    click() {
        this.setState({ num : this.state.num+1 })
    }



    render() { 
        let { title } = this.props;
        return <div title = { this.state.num } className="active" style={{ height: 200, width: 300 }} onClick={()=>this.click()}>
            <span>{this.state.num}</span>
        </div>
    }

}




ReactDom.render(<Example title="889"></Example>, document.getElementById('root'));

