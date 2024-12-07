import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin6Line} from 'react-icons/ri';
import '../styles/ProductC.css';
import { useProductStore } from '../store/products';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const ProductCard = ({product}) => {
    
    const [ isModalOpen, setIsModalOpen] = useState(false);
    const [ updatedProduct, setUpdatedProduct] = useState(product)
    const { deleteProduct, updateProduct } = useProductStore();

    const handleDeleteProduct = async (p_id) => {
        try {
            // Call the deleteProduct function from your store
            const { success, message } = await deleteProduct(p_id);

            // Show a toast notification based on the result
            if (success) {
                toast.success(message || 'Product deleted successfully!', {
                    position: 'bottom-right',
                    autoClose: 3000, // Toast will auto-close in 3 seconds
                });
            } else {
                toast.error(message || 'Failed to delete the product!', {
                    position:'bottom-right',
                    autoClose: 3000,
                });
            }
        } catch (error) {
            // Handle unexpected errors
            toast.error('An unexpected error occurred!', {
                position: 'bottom-right',
                autoClose: 3000,
            });
        }
    }

    const handleUpdateProduct = async (p_id, updatedProduct) => {
        try{
        const{success, message} =  await updateProduct(p_id, updatedProduct);
        if (success) {
            toast.success(message || 'Product Updated successfully!', {
                position: 'bottom-right',
                autoClose: 3000, // Toast will auto-close in 3 seconds
            });
            setIsModalOpen(false);
        } else {
            toast.error(message || 'Failed to Update the product!', {
                position:'bottom-right',
                autoClose: 3000,
            });
        }
    } catch (error) {
        // Handle unexpected errors
        toast.error('An unexpected error occurred!', {
            position: 'bottom-right',
            autoClose: 3000,
        });
    }
    }

    // Modal Open-Close Function.
    const handleImageClick = () => {
        setIsModalOpen(true); // Open the modal when image is clicked
    };
    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className="page-container">
            <div className="product-card">
                <img src={product.image} alt={product.name} style={{ objectFit: "cover" }}/>
                <div className="product-details">
                    <p>{product.name}</p>
                    <p>${product.price}</p>
                    <div className="btn">
                        <button className='add btn' onClick={handleImageClick}><AiOutlineEdit/></button>
                        <button className='del btn' onClick={() => handleDeleteProduct(product._id)}><RiDeleteBin6Line /></button>
                    </div>
                </div>
            </div>
            {/* Modal */}
            {isModalOpen && (
                    <div className="modal-overlay" onClick={handleCloseModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Update Product</h2>
                            <button className="modal-close" onClick={handleCloseModal}>
                                &times;
                            </button>
                            <div className="modal-details">
                                <input type="text" className='p-details' placeholder='Name' value={updatedProduct.name}
                                    name='name' onChange={(e) => setUpdatedProduct({...updatedProduct.name, name:e.target.value})} />
                                <input type="number" className='p-details' placeholder='Price' value={updatedProduct.price}
                                    name='price' onChange={(e) => setUpdatedProduct({...updatedProduct.price, price:e.target.value})} />
                                <input type="url" className='p-details' placeholder='Image-url' value={updatedProduct.image}
                                    name='image' onChange={(e) => setUpdatedProduct({...updatedProduct.image, image:e.target.value})} />
                                <div className="m-btn">
                                    <button className='up-btn' onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</button>
                                    <button className='c-btn' onClick={handleCloseModal} >Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default ProductCard;
