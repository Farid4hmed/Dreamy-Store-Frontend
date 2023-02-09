import React from 'react'

import styles from "./ListView.module.css";
export default function ListView(props) {

  function handleClick(product){
    props.setFrontPage(false);
    props.setCurrProduct(product);
  }

  return (
    <div className={styles.container}>
    {props.products && props.products.map((product, i) => (
      <div key={i} className={styles.product}>
        <img src={product.imgUrls[0]}></img>
        <div className={styles.details}>
          <h2>{product.name}</h2>
          <h4 className={styles.price}>${product.price}</h4>
          <p>{product.desc.length>130? product.desc.slice(0, 130)+"...": product.desc}</p>
          <button onClick={()=>{handleClick(product)}}>Details</button>
        </div>
      </div>
    ))}
      

    </div>
  )
}
