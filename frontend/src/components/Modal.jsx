// Create a Modal for Successful Deletion Product.
import { useState } from "react";
import '../styles/Modal.css';

const Modal = ({product}) => {

    const [setIsModalOpen] = useState(false);
    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={handleCloseModal}>
                            &times;
                        </button>
                        <h2 className="head">Update Product</h2>
                        <h3>{product.name}</h3>
                        <p>Price: {product.price}</p>
                        <p>Description: {product.description || "No description available."}</p>
                    </div>
                </div>
    )
}

export default Modal;