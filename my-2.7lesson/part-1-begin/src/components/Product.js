import { useState, useContext } from "react";

import styles from "./Product.module.css";
import Card from "./Card";
import ViewList from "./ViewList";
import Button from "./Button";

import ProductContext from "../context/ProductContext";
import ModeContext from "../context/ModeContext";
import Toggle from "./Toggle";

function Product({ myCount = 0 }) {
  const ctx = useContext(ProductContext);
  const modeCtx = useContext(ModeContext);
  const [list, setList] = useState([]);
  const [sumTotal, setSumTotal] = useState(0);

  // isOpen, isClose
  const [showItem, setShowItem] = useState(false);

  const handleShowItem = () => {
    // setShowItem(!showItem);
    // Using callback function form
    setShowItem((showItem) => !showItem);
  };

  const handlerAddProduct = () => {
    // Create new list item
    const newItem = {
      name: ctx.name,
      quantity: ctx.count,
      price: ctx.price,
      discount: ctx.discount,
      total: (ctx.count * ctx.price * (100 - ctx.discount)) / 100,
    };

    // Copy previous list and append new item to its end
    const newList = [...list, newItem];
    //  console.log('  newList:', newList);
    setList(newList);

    // Add the item total to the running listTotal
    const sum = sumTotal + newItem.total;
    //  console.log('  sumTotal:', sumTotal);
    setSumTotal(sum);
  };

  // if/else Method
  // All the check is done here
  // let listComponent;
  // // Assigning JSX to a variable
  // // don't use quotation mark otherwise it becomes a string
  // if (showItem) listComponent = <ViewList list={list} sum={sumTotal} />;
  // else listComponent = <p>Click "Show Cart" to display the cart.</p>;

  return (
    <div className={`${styles.container} ${!modeCtx.isLight && styles.dark}`}>
      <Toggle />
      <Card handlerAddProduct={handlerAddProduct} />
      <Button
        label={showItem ? "Hide Cart" : "Show Cart"}
        onClick={handleShowItem}
      />
      {/* <ViewList list={list} sum={sumTotal} /> */}
      {/* {listComponent} */}
      {/* {showItem ? (
        <ViewList list={list} sum={sumTotal} /> 
      ) : (
        <p>Click "Show Cart" to display the cart.</p>
      )} */}
      {showItem && <ViewList list={list} sum={sumTotal} />}
      {!showItem && <p>Click "Show Cart" to display the cart.</p>}
      {myCount >= 0 && <p>I have counted {myCount} items.</p>}
    </div>
  );
}
export default Product;

/*
Conditional Rendering in React

Ternary
✅ simple one line solution to handle both cases
❌ it can be hard to read, especially if is nested with a lot JSX code, or worse with other nested ternaries

if/else in Component
✅ keeps JSX lean and separate from the return JSX statement
❌ can be too complicated if all we need is a single condition

Short Circuiting
✅ Easy to read
❌ it could hold too logic, hard to manage complicated logic

JavaScript falsy values
Blank, Zero, NaN, Undefined, Null
*/