import axios from "axios";

export async function getProducts(){
    const reqUrl = `https://dreamy-store.onrender.com/api/products/fetch`;
    const result = await axios.get(reqUrl);
    if(result.data)return result.data;
};

export async function getCategories(){
    const reqUrl = `https://dreamy-store.onrender.com/api/products/categories`;
    const result = await axios.get(reqUrl);
    if(result.data)return result.data;
};

export async function getCompany(){
    const reqUrl = `https://dreamy-store.onrender.com/api/products/companies`;
    const result = await axios.get(reqUrl);
    if(result.data)return result.data;
};

export async function getColors(){
    const reqUrl = `https://dreamy-store.onrender.com/api/products/getColors`;
    const result = await axios.get(reqUrl);
    if(result.data)return result.data;
}

export async function getMaxPrice(){
    const reqUrl = `https://dreamy-store.onrender.com/api/products/maxPrice`;
    const result = await axios.get(reqUrl);
    if(result.data)return result.data;
}