import React, { useState, useEffect } from 'react'
import GridView from '../../components/GridView/GridView';
import ListView from '../../components/ListView/ListView';
import Product from '../../components/Product/Product';
import Sidebar from '../../components/Sidebar/Sidebar';

import { getProducts } from '../../api/products';

import styles from "./Home.module.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [tempProducts, setTempProducts] = useState([]);

  const [currProduct, setCurrProduct] = useState({});
  const [currSearch, setCurrSearch] = useState("");

  const [currSort, setCurrSort] = useState("Price (Lowest)")
  const [frontPage, setFrontPage] = useState(true);
  const blackBG = { background: "black" };
  const whiteBG = { background: "white" };
  const [gridView, setGridView] = useState(true);

  function handleGridClick() {
    setGridView(true);
  }
  function handleListClick() {
    setGridView(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);


  async function fetchProducts() {
    const result = await getProducts();
    if (result) {
      setProducts(result);
      setTempProducts(result);
    }
    else console.log("Couldn't fetch products");
  }

  function handleSelect(option) {
    setCurrSort(option);
    if (option === "Price (Lowest)") {
      products.sort(byPriceLowest);
      setProducts([...products]);
    }
    else if (option === "Price (Highest)") {
      products.sort(byPriceHighest);
      setProducts([...products]);
    }
    else if (option === "Name (A-Z)") {
      products.sort(byNameAZ);
      setProducts([...products]);
    }
    else if (option === "Name (Z-A)") {
      products.sort(byNameZA);
      setProducts([...products]);
    }
  }

  function byPriceLowest(a, b) {
    if (a.price > b.price) return 1;
    else if (b.price > a.price) return -1;
    else return 0;
  }

  function byPriceHighest(a, b) {
    if (a.price > b.price) return -1;
    else if (b.price > a.price) return 1;
    else return 0;
  }

  function byNameAZ(a, b) {
    if (a.name > b.name) return 1;
    else if (b.name > a.name) return -1;
    else return 0;
  }

  function byNameZA(a, b) {
    if (a.name > b.name) return -1;
    else if (b.name > a.name) return 1;
    else return 0;
  }

  return (
    <div className={styles.background}>
      <div className={styles.navbar}>
        <h1 className={styles.homeTitle}>Home </h1>
        <h1 className={frontPage ? styles.productsTitleFrontPage : styles.productsTitleProductPage} onClick={() => { setFrontPage(true) }}>/ Products</h1>
        <h1 className={styles.itemTitle}>{!frontPage ? (`/ ${currProduct.name}`) : ""}</h1>
      </div>
      {frontPage ?
        <div className={styles.container}>
          <Sidebar
            setProducts={setProducts}
            products={products}
            tempProducts={tempProducts}
            currSearch={currSearch}
            setCurrSearch={setCurrSearch}
            byPriceLowest={byPriceLowest}
            byPriceHighest={byPriceHighest}
            byNameAZ={byNameAZ}
            byNameZA={byNameZA}
            currSort={currSort}
          />
          <div className={styles.content}>
            <div className={styles.topLine}>
              <div className={styles.toggle}>
                <button className={styles.grid} style={gridView ? blackBG : whiteBG} onClick={handleGridClick}>
                  <div className={styles.box} style={gridView ? whiteBG : blackBG}></div>
                  <div className={styles.box} style={gridView ? whiteBG : blackBG}></div>
                  <div className={styles.box} style={gridView ? whiteBG : blackBG}></div>
                  <div className={styles.box} style={gridView ? whiteBG : blackBG}></div>
                </button>
                <button className={styles.list} style={gridView ? whiteBG : blackBG} onClick={handleListClick}>
                  <svg fill={gridView ? "black" : "white"} stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
              <p className={styles.noOfProducts}>{products.length} Products Found</p>
              <div className={styles.line}></div>
              <form>
                <label>Sort By</label>
                <select onChange={(e) => handleSelect(e.target.value)}>
                  <option>Price (Lowest)</option>
                  <option>Price (Highest)</option>
                  <option>Name (A-Z)</option>
                  <option>Name (Z-A)</option>
                </select>
              </form>
            </div>
            {gridView ? <GridView products={products} setFrontPage={setFrontPage} setCurrProduct={setCurrProduct} /> : <ListView products={products} setFrontPage={setFrontPage} setCurrProduct={setCurrProduct} />}
            {products.length === 0 ? <p className={styles.zeroProds}>No Products Found 😭</p> : ""}
          </div>

        </div>
        : <Product currProduct={currProduct} setFrontPage={setFrontPage} />}
    </div>
  )
}
