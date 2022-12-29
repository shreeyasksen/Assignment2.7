import { useState, useContext } from 'react';

import styles from './Product.module.css'
import Card from './Card';
import ViewList from './ViewList';

import ProductContext from '../context/ProductContext';
import ModeContext from '../context/ModeContext';
import Toggle from './Toggle';

function Product() {
  const ctx = useContext(ProductContext);
  const modeCtx = useContext(ModeContext);
  const [list, setList] = useState([]);
  const [sumTotal, setSumTotal] = useState(0);
  
  const handlerAddProduct = () => {
    
    // Create new list item
    const newItem = {
      name: ctx.name,
      quantity: ctx.count,
      price: ctx.price,
      discount: ctx.discount,
      total: ctx.count * ctx.price * (100-ctx.discount)/100,
   } 
   
   // Copy previous list and append new item to its end
   const newList = [...list, newItem];
  //  console.log('  newList:', newList);
   setList(newList);

   // Add the item total to the running listTotal
   const sum = sumTotal + newItem.total;
  //  console.log('  sumTotal:', sumTotal);
   setSumTotal(sum);
  }

  return (
    <div className={`${styles.container} ${!modeCtx.isLight && styles.dark}`}>
      <Toggle />
      <Card
        handlerAddProduct={handlerAddProduct}
      />
      {/* Add if statement here */}
      <ViewList list={list} sum={sumTotal} />
    </div>
  );
}
export default Product;
