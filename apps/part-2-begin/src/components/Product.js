import { useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';

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
  
  /*
    CREATE: Add a new product into the list
  */
  const handlerAddProduct = () => {
    const newItem = {
      id: uuid(),
      name: ctx.name,
      quantity: ctx.count,
      price: ctx.price,
      discount: ctx.discount,
      total: ctx.count * ctx.price * (100-ctx.discount)/100,
    } 
    const newList = [...list, newItem];
    setList(newList);    
    const sum = sumTotal + newItem.total;
    setSumTotal(sum);
  }

  //---------------------------------------------------------------------------

  return (
    <div className={`${styles.container} ${modeCtx.isDark && styles.dark}`}>
      <Toggle />
      <Card
        handlerAddProduct={handlerAddProduct}
      />
      <ViewList 
        list={list} 
        sum={sumTotal} 
      />
    </div>
  );
}

export default Product;
