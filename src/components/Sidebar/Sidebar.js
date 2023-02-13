import React, { useState, useEffect } from 'react'

import styles from "./Sidebar.module.css";
export default function Sidebar(props) {
  const tick = (<svg style={{ marginTop: "1px" }} fill="white" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em"
    xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998
      36.204 0L192 312.69 432.095 72.596c9.997-9.99726.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.2079.997-36.204-.001z"></path></svg>)


  useEffect(() => {
    let newArray = props.products.filter((product) => {
      return product.name.includes(props.currSearch);
    });
    if (props.currColor !== "All") {
      newArray = newArray.filter((product) => {
        return product.colors.includes(props.currColor);
      });
    }
    newArray = newArray.filter((product) => {
      return product.price <= props.currPrice;
    });

    if (props.checked === true) newArray = newArray.filter((product) => {
      return product.freeShipping === 1;
    })

    if (props.category !== "All") {
      newArray = newArray.filter((product) => {
        return product.category === props.category;
      })
    }

    if (props.company !== "All") {
      newArray = newArray.filter((product) => {
        return product.company === props.company;
      })
    }

    //sort
    if (props.currSort === "Price (Lowest)") {
      newArray.sort(props.byPriceLowest);
    }
    else if (props.currSort === "Price (Highest)") {
      newArray.sort(props.byPriceHighest);
    }
    else if (props.currSort === "Name (A-Z)") {
      newArray.sort(props.byNameAZ);
    }
    else if (props.currSort === "Name (Z-A)") {
      newArray.sort(props.byNameZA);
    }
    props.setProducts([...newArray]);

  }, [props.currSearch, props.currColor, props.currPrice, props.checked, props.category, props.company]);


  function handleCategory(value) {
    props.setCategory(value);
  }

  function handleSearchChange(value) {
    props.setCurrSearch(value);
    props.setProducts([...props.tempProducts]);
  }

  function handleCheck() {
    props.setChecked(!props.checked);
    props.setProducts([...props.tempProducts]);
  }

  function handleSelect(value) {
    props.setCompany(value);
    props.setProducts([...props.tempProducts]);
  }

  function handleClearFilters() {
    document.getElementById("search").value = "";
    document.getElementById("company").value = "All";
    if (document.getElementById("shipping").checked === true) {
      document.getElementById("shipping").click();
    }
    props.setCurrSearch("");
    props.setCategory("All");
    props.setCompany("All");
    props.setCurrColor("All");
    props.setCurrPrice(props.maxPrice);
    props.setProducts([...props.tempProducts]);
  }

  return (
    <div className={styles.sidebar}>
      <input id="search" value={props.currSearch} onChange={e => { handleSearchChange(e.target.value) }} className={styles.search} placeholder='Search'></input>
      <h4>Category</h4>
      <div className={styles.category}>
        <button onClick={() => { handleCategory("All"); props.setProducts([...props.tempProducts]); }}>{props.category === "All" ? (<u>All</u>) : "All"}</button>
        {props.categoryList && props.categoryList.map((categ, i) => (
          <button key={i} onClick={() => { handleCategory(categ); props.setProducts([...props.tempProducts]); }}>{props.category === categ ? (<u>{categ}</u>) : categ}</button>
        ))}
      </div>
      <h4 className={styles.company}>Company</h4>
      <select id="company" onChange={e => { handleSelect(e.target.value) }} value={props.company} className={styles.brand}>
        <option>All</option>
        {props.companyList && props.companyList.map((company, i) => (
          <option key={i}>{company}</option>
        ))}
      </select>

      <h4>Colors</h4>
      <div className={styles.colors}>
        <button onClick={() => { props.setCurrColor("All"); props.setProducts([...props.tempProducts]); }} style={props.currColor === "All" ? { opacity: "100%" } : { opacity: "60%" }}>{props.currColor === "All" ? (<u>All</u>) : "All"}</button>
        {props.colorList && props.colorList.map((color, i) => (
          <button key={i} onClick={() => { props.setCurrColor(color); props.setProducts([...props.tempProducts]); }} style={props.currColor === color ? { opacity: "100%" } : { opacity: "60%" }}><div className={styles.colorCircle} style={{ backgroundColor: color}}>{props.currColor ===  color? tick : ""}</div></button>
        ))}
      </div>

      <h4>Price</h4>
      <p className={styles.price}>${props.currPrice}</p>
      <input className={styles.slider} type="range" min="0" max={props.maxPrice} value={props.currPrice} onChange={e => { props.setCurrPrice(e.target.value); props.setProducts([...props.tempProducts]); }}></input>
      <div className={styles.freeShipping}>
        <p>Free Shipping</p>
        <input id="shipping" className={styles.checkbox} type="checkbox" checked={props.checked} onChange={handleCheck}></input>
      </div>

      <button className={styles.clearFilters} onClick={handleClearFilters} >Clear Filters</button>
    </div>
  )
}
