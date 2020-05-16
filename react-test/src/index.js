import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Router } from "react-router-dom";

import Header from "./common/Header.js"
import Footer from './common/Footer.js';


const Ele = React.forwardRef((props, ref) => {

  return <div>
    <div style={{ backgroundColor: "red", height: "30px" }} ref={ref}></div>
    {props.children}
  </div>
})

const ProductDetailPage =  ( location, callback )=> {

 import('./page/ProductDetail.js').then(module=>{
   callback(null, module.default)
 });
};

class Example extends PureComponent {

  render() {

    return <div>
      <Header></Header>
      <BrowserRouter>
        <Route path="/" exact render={()=>"   hello world!"}></Route>
        <Route path="/product-detail"  getComponent={ ProductDetailPage }></Route>
      </BrowserRouter>

      <Footer></Footer>
    </div>
  }
}


ReactDOM.render(
  <Example></Example>,
  document.getElementById('root')
);


