import { useState } from "react";
import "../styles/CreateP.css";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/products";

const CreatePage = () => {

    const [newProduct, setNewProduct] = useState({
        name : "",
        price : "",
        image : ""
    })

    const navigate = useNavigate();
    const { createProduct }= useProductStore();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name] : value,
        });
    };

    const handleAddProduct = async(e) => {
        e.preventDefault();

        const { success, message } = await createProduct(newProduct);
        console.log("Success:", success);
        console.log("Message:", message);

        if (success) {
            // Redirect to the home page on successful creation
            navigate('/');
        } else {
            // Show error message if creation fails
            console.log("Something went wrong!!");
        }

    };

    return (
        <div className="product-creation">
            <h1 className="heading">Create New Product</h1>

            <form  className='product-form' autoComplete="true" onSubmit={handleAddProduct}>

            <input type="text" className="p-details" id="name" name="name" placeholder="Name" onChange={handleInputChange} required/><br/>

            <input type="number" className="p-details" id="price" name="price" placeholder="Price" onChange={handleInputChange} required/><br/>

            <input type="url" className="p-details" id="image" name="image" placeholder="Image url"  onChange={handleInputChange} accept="image/*" required /><br/>

            <button className="p-details p-btn" type="submit" onClick={handleAddProduct}>Add Product</button>
            </form>
        </div>
    )
};

export default CreatePage;