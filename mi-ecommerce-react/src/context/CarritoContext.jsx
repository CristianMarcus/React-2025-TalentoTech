
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cartItems');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Failed to parse cart items from localStorage", error);
            return [];
        }
    });

    
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    

    const handleAddToCart = (product, quantity = 1) => {
        
        console.log('Producto a añadir al carrito - ID:', product.id, 'Imagen:', product.image);

        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                
                return [...prevItems, { ...product, quantity }];
            }
        });
       
        toast.success(`${quantity} x ${product.name} añadido al carrito!`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleUpdateQuantity = (itemId, newQuantity) => {
        setCartItems(prevItems => {
            
            const updatedQuantity = Math.max(1, newQuantity);

            
            if (updatedQuantity === 0) {
                toast.info('Producto eliminado del carrito.', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return prevItems.filter(item => item.id !== itemId);
            }

            return prevItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity: updatedQuantity } 
                    : item
            );
        });
    };

    const handleRemoveItem = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        
        toast.info('Producto eliminado del carrito.', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const clearCart = () => {
        setCartItems([]);
        
        toast.info('El carrito ha sido vaciado.', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    
    const contextValue = {
        cartItems,
        handleAddToCart,
        handleUpdateQuantity,
        handleRemoveItem,
        clearCart,
        
    };

    return (
        <CarritoContext.Provider value={contextValue}>
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (context === undefined) {
        throw new Error('useCarrito must be used within a CarritoProvider');
    }
    return context;
};