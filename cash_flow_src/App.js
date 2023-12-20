import './App.css';
import { useState,useEffect } from 'react';
import Header from './component/Header'
import products from './products.json'
import Product from './component/Product';
import Basket from './component/Basket';


function App() {

  const [money] = useState ('1000000')
  const [basket,setBasket] = useState ([])
  const [total,setTotal] = useState ('0')
  
  const resetBasket =()=>{
    setBasket([])
  }

  useEffect(()=>{
    setTotal(basket.reduce((acc,item) =>{
      return acc + (item.amount * (products.find(product => product.id === item.id).price))
    },0))
  },[basket])

  return (
   <>
   <Header total={total} money={money} />
   <div className='container products' >
    {
      products.map(product => (
        <Product key={product.id} total={total} money={money} basket={basket} setBasket={setBasket} product={product} />
      ))
    }
   </div>
   {
    total > 0 ?
    <Basket products={products} basket={basket} total={total} resetBasket={resetBasket} />
    : null
   }
   
   </>
  );
}

export default App;
