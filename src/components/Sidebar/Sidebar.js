import React, { useState } from 'react'

import styles from "./Sidebar.module.css";
export default function Sidebar() {
    const [category, setCategory] = useState("All");
    const [currPrice, setCurrPrice] = useState(30999);
    const [color, setColor] = useState("All");
    
    const tick = (<svg style={{marginTop:"1px"}}fill="white" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em"
     xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998
      36.204 0L192 312.69 432.095 72.596c9.997-9.99726.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.2079.997-36.204-.001z"></path></svg>)

    function handleCategory(value){
        setCategory(value);
    }

  return (
    <div className={styles.sidebar}>
            <input className={styles.search} placeholder='Search'></input>
            <h4>Category</h4>
            <div className={styles.category}>
                <button onClick={()=>{handleCategory("All")}}>{category==="All"?(<u>All</u>): "All"}</button>
                <button onClick={()=>{handleCategory("Office")}}>{category==="Office"?(<u>Office</u>): "Office"}</button>
                <button onClick={()=>{handleCategory("Living Room")}}>{category==="Living Room"?(<u>Living Room</u>): "Living Room"}</button>
                <button onClick={()=>{handleCategory("Kitchen")}}>{category==="Kitchen"?(<u>Kitchen</u>): "Kitchen"}</button>
                <button onClick={()=>{handleCategory("Bedroom")}}>{category==="Bedroom"?(<u>Bedroom</u>): "Bedroom"}</button>
                <button onClick={()=>{handleCategory("Dining")}}>{category==="Dining"?(<u>Dining</u>): "Dining"}</button>
                <button onClick={()=>{handleCategory("Kids")}}>{category==="Kids"?(<u>Kids</u>): "Kids"}</button>
            </div>
            <h4 className={styles.company} >Company</h4>
            <select className={styles.brand}>
                <option>All</option>
            </select>

            <h4>Colors</h4>
            <div className={styles.colors}>
                <button>All</button>
                <button ><div className={styles.colorCircle}>
                {tick}
                </div></button>
                <button><div className={styles.colorCircle}></div></button>
                <button><div className={styles.colorCircle}></div></button>
                <button><div className={styles.colorCircle}></div></button>
                <button><div className={styles.colorCircle}></div></button>
            </div>

            <h4>Price</h4>
            <p className={styles.price}>${currPrice}</p>
            <input className={styles.slider} type="range" min="0" max="3099" value={currPrice} onChange={e => {setCurrPrice(e.target.value)}}></input>
            <div className={styles.freeShipping}>
            <p>Free Shipping</p>
            <input className={styles.checkbox} type="checkbox"></input>
            </div>
            
            <button className={styles.clearFilters}>Clear Filters</button>
    </div>
  )
}
