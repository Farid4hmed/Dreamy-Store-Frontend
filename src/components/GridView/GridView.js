import React from 'react'

import styles from "./GridView.module.css";
export default function GridView(props) {


  function handleClick(p){
    props.setFrontPage(false);
    props.setCurrProduct(p);
  }

  return (
    <div className={styles.container}>
      {props.products && props.products.map((p, i) => (
        <div key={i} className={styles.product}>
          <img src={p.imgUrls[0]} alt="furniture" onClick={()=>{handleClick(p)}} />
          <div className={styles.details}>
          <h4 className={styles.name}>{p.name}</h4>
          <p className={styles.price}>${p.price}</p>
          </div>
        </div>
      ))}
        
    </div>
  )
}
