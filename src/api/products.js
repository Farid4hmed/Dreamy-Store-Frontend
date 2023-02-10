import axios from "axios";

export async function getProducts(){
    const reqUrl = `https://dreamy-store.onrender.com/api/products/fetch`;
    const result = await axios.get(reqUrl);
    if(result.data)return result.data;
};

export async function getCategories(){
    const reqUrl = `https://dreamy-store.onrender.com/api/products/fetchCategory`;
    const result = await axios.get(reqUrl);
    if(result.data)return result.data;
};

export async function getCompany(){
    const reqUrl = `https://dreamy-store.onrender.com/api/products/getCompany`;
    const result = await axios.get(reqUrl);
    if(result.data)return result.data;
};
