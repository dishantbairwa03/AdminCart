import {AiFillShopping } from "react-icons/ai";
import {PiSmileySad} from "react-icons/pi";
import '../styles/Home.css';
import { useEffect } from "react";
import { useProductStore } from "../store/products";
import ProductCard from "../components/ProductCard";

const HomePage = () =>{

    const {fetchProduct, products} = useProductStore();
    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);
    console.log("Product: ", products)

    return (
        <div className="homeP-creation">
            <h1 className="heading">Current Created Products <AiFillShopping /></h1>
            {products.length === 0  && (
            <div className="p-creation heading">
                <h3>No Product Found <PiSmileySad/> <a href="/create">Create New Product</a></h3>
            </div>
            )}
            <div className="product-list">
                { products.map((product) => {
                        return <ProductCard key={product._id} product={product}/>
                })}
            </div>
        </div>
    )
};

export default HomePage;