import {create} from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),

    //Product Creation.
    createProduct: async (newProduct) => {
        try {
            if (!newProduct.name || !newProduct.price || !newProduct.image) {
                return { success: false, message: "Please fill all the required fields!" };
            }
    
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });
    
            if (!res.ok) {
                const error = await res.json();
                return { success: false, message: error.message || "Failed to create product" };
            }
    
            const data = await res.json();
            set((state) => ({ products: [...state.products, data.data] }));
    
            return { success: true, message: "Product Created Successfully!" };
        } catch (error) {
            return { success: false, message: error.message || "An unexpected error occurred." };
        }
    },

    // Product Fetching.
    fetchProduct: async() => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({products: data.data})
    },

    // Product Delete.
    deleteProduct: async(p_id) => {
        const res = await fetch(`/api/products/${p_id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return ( {success: false, message:data.message});

        // Update the ui immediately without refreshing page.
        set( state => ({products: state.products.filter(product => product._id !== p_id)}));
        return ({success: true, message:data.message})
    },

    // Product Update.
    updateProduct: async(p_id, updatedProduct) => {
        const res = await fetch(`/api/products/${p_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(updatedProduct)
        });
        const data = await res.json();

        if(!res.ok) {
            return ({success: false, message:data.message || "Something went wrong!!"})
        }
        
        //Update the ui immediately without refreshing the page.
        set((state) => ({
            products: state.products.map((product) =>
                product._id === p_id ? data.data : product
            ),
        }));

        return { success: true, message: "Product updated successfully." };
    }
}))
