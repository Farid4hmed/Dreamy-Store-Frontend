import React, { useState, useEffect } from 'react'
import GridView from '../../components/GridView/GridView';
import ListView from '../../components/ListView/ListView';
import Product from '../../components/Product/Product';
import Sidebar from '../../components/Sidebar/Sidebar';

import { getProducts } from '../../api/products';

import styles from "./Home.module.css";

export default function Home() {

  const [products, setProducts] = useState([]);
  const [currProduct, setCurrProduct] = useState({});

  const [frontPage, setFrontPage] = useState(true);
  const blackBG = { background: "black"};
  const whiteBG = { background: "white"};
  const [gridView, setGridView] = useState(true);

  function handleGridClick(){
    setGridView(true);
  }
  function handleListClick(){
    setGridView(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts(){
    const result = await getProducts();
    if(result)setProducts(result);
    else console.log("Couldn't fetch products");
  }

  return (
    <div className={styles.background}>
        <div className={styles.navbar}>
          <h1 className={styles.homeTitle}>Home </h1>
          <h1 className={styles.productsTitle} onClick={()=>setFrontPage(true)}>/ Products</h1>
          <h1 className={styles.itemTitle}>{!frontPage?(`/ ${currProduct.name}`):""}</h1>
        </div>
        {frontPage?
        <div className={styles.container}>
            <button className={styles.grid} style={gridView?blackBG: whiteBG} onClick={handleGridClick}>
            <div className={styles.box} style={gridView? whiteBG: blackBG}></div>
            <div className={styles.box} style={gridView? whiteBG: blackBG}></div>
            <div className={styles.box} style={gridView? whiteBG: blackBG}></div>
            <div className={styles.box} style={gridView? whiteBG: blackBG}></div>
            </button>
            <button className={styles.list} style={gridView? whiteBG: blackBG} onClick={handleListClick}>
            <svg fill={gridView? "black": "white"} stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clip-rule="evenodd"></path></svg>
            </button>
            <p className={styles.noOfProducts}>{products.length} Products Found</p>
            <hr />
            <form>
              <label>Sort By</label>
              <select>
                <option>Price (Lowest)</option>
                <option>Price (Highest)</option>
                <option>Name (A-Z)</option>
                <option>Name (Z-A)</option>
              </select>
            </form>
            <Sidebar />
            {gridView? <GridView products={products} setFrontPage={setFrontPage} setCurrProduct={setCurrProduct}/> : <ListView products={products} setFrontPage={setFrontPage} setCurrProduct={setCurrProduct}/>}
        </div>
        :<Product currProduct={currProduct} setFrontPage={setFrontPage}/>}
    </div>
  )
}
