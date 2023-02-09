import React, { useState, useEffect } from 'react'

import styles from "./Sidebar.module.css";
export default function Sidebar(props) {
  const tick = (<svg style={{ marginTop: "1px" }} fill="white" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em"
    xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998
      36.204 0L192 312.69 432.095 72.596c9.997-9.99726.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.2079.997-36.204-.001z"></path></svg>)


  const [category, setCategory] = useState("All");
  const [company, setCompany] = useState("All");
  const [currPrice, setCurrPrice] = useState(3099);
  const [color, setColor] = useState("All");
  const [checked, setChecked] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  props.products.forEach((product) => {
    if (!categoryList.includes(product.category)) {
      categoryList.push(product.category);
      setCategoryList([...categoryList]);
    }
    if (!companyList.includes(product.company)) {
      companyList.push(product.company);
      setCompanyList([...companyList]);
    }
  })


  useEffect(() => {
    let newArray = props.products.filter((product) => {
      return product.name.includes(props.currSearch);
    });
    if (color !== "All") {
      newArray = newArray.filter((product) => {
        return product.colors.includes(color);
      });
    }
    newArray = newArray.filter((product) => {
      return product.price <= currPrice;
    });

    if (checked === true) newArray = newArray.filter((product) => {
      return product.freeShipping === 1;
    })

    if (category !== "All") {
      newArray = newArray.filter((product) => {
        return product.category === category;
      })
    }

    if (company !== "All") {
      newArray = newArray.filter((product) => {
        return product.company === company;
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

  }, [props.currSearch, color, currPrice, checked, category, company]);


  function handleCategory(value) {
    setCategory(value);
  }

  function handleSearchChange(value) {
    props.setCurrSearch(value);
    props.setProducts([...props.tempProducts]);
  }

  function handleCheck() {
    setChecked(!checked);
    props.setProducts([...props.tempProducts]);
  }

  function handleSelect(value) {
    setCompany(value);
    props.setProducts([...props.tempProducts]);
  }

  function handleClearFilters() {
    document.getElementById("search").value = "";
    document.getElementById("company").value = "All";
    if (document.getElementById("shipping").checked === true) {
      document.getElementById("shipping").click();
    }
    props.setCurrSearch("");
    setCategory("All");
    setCompany("All");
    setColor("All");
    setCurrPrice(3099);
    props.setProducts([...props.tempProducts]);
  }

  return (
    <div className={styles.sidebar}>
      <input id="search" onChange={e => { handleSearchChange(e.target.value) }} className={styles.search} placeholder='Search'></input>
      <h4>Category</h4>
      <div className={styles.category}>
        <button onClick={() => { handleCategory("All"); props.setProducts([...props.tempProducts]); }}>{category === "All" ? (<u>All</u>) : "All"}</button>
        {categoryList && categoryList.map((categ, i) => (
          <button key={i} onClick={() => { handleCategory(categ); props.setProducts([...props.tempProducts]); }}>{category === categ ? (<u>{categ}</u>) : categ}</button>
        ))}
      </div>
      <h4 className={styles.company}>Company</h4>
      <select id="company" onChange={e => { handleSelect(e.target.value) }} className={styles.brand}>
        <option>All</option>
        {companyList && companyList.map((company, i) => (
          <option key={i}>{company}</option>
        ))}
      </select>

      <h4>Colors</h4>
      <div className={styles.colors}>
        <button onClick={() => { setColor("All"); props.setProducts([...props.tempProducts]); }} >{color === "All" ? (<u>All</u>) : "All"}</button>
        <button onClick={() => { setColor("red"); props.setProducts([...props.tempProducts]); }}><div className={styles.colorCircle} style={{ backgroundColor: "red" }}>{color === "red" ? tick : ""}</div></button>
        <button onClick={() => { setColor("green"); props.setProducts([...props.tempProducts]); }}><div className={styles.colorCircle} style={{ backgroundColor: "green" }}>{color === "green" ? tick : ""}</div></button>
        <button onClick={() => { setColor("blue"); props.setProducts([...props.tempProducts]); }}><div className={styles.colorCircle} style={{ backgroundColor: "blue" }}>{color === "blue" ? tick : ""}</div></button>
        <button onClick={() => { setColor("black"); props.setProducts([...props.tempProducts]); }}><div className={styles.colorCircle} style={{ backgroundColor: "black" }}>{color === "black" ? tick : ""}</div></button>
        <button onClick={() => { setColor("yellow"); props.setProducts([...props.tempProducts]); }}><div className={styles.colorCircle} style={{ backgroundColor: "orange" }}>{color === "yellow" ? tick : ""}</div></button>
      </div>

      <h4>Price</h4>
      <p className={styles.price}>${currPrice}</p>
      <input className={styles.slider} type="range" min="0" max="3099" value={currPrice} onChange={e => { setCurrPrice(e.target.value); props.setProducts([...props.tempProducts]); }}></input>
      <div className={styles.freeShipping}>
        <p>Free Shipping</p>
        <input id="shipping" className={styles.checkbox} type="checkbox" checked={checked} onChange={handleCheck}></input>
      </div>

      <button className={styles.clearFilters} onClick={handleClearFilters} >Clear Filters</button>
    </div>
  )
}
