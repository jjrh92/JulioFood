import { useState, createContext } from "react";
const CartContext = createContext ({ cart: [] });

function CartContextProvider (props) {

  const [cart, setCart] = useState([]);

  function addToCart (product, count, stock) {

    const existingItemIndex = cart.findIndex(

      (item) => item.id === product.id

    );
  
    if (existingItemIndex !== -1) {

      // Si existe el producto de antes, actualiza la cantidad) 
      const newCart = cart.map ((item, index) => {

        if (index === existingItemIndex) {

          if (item.count >= stock) {

            alert ("Stock superado, Si deseas agregar más de "+ stock +" productos por favor contacta al admin.\nGracias.")
            return item;

            // Verificacion de cantidad de stock vs cantidad en carrito.
  
          }

          else {

            return {

            
              ...item,
              count: item.count + count,
  
            };

          }

        }

        
        else {

          return item;

        }

      });
  
      setCart (newCart);

    } 
    
    else {

      // El Producto no existe en el carrito, agregalo como un nuevo item. 
      const newItemInCart = { count, ...product };
      const newCart = [...cart, newItemInCart];
      setCart (newCart);

    }
    
  }

  function clearCart () {

    window.location.href='/';
    alert ("Tu carrito ha sido limpiado correctamente.");
    
  }

  function getTotalItemsInCart () {

    let total = 0;

    cart.forEach((item) => {

      total += item.count;

    });

    return total;

  }

  function getTotalPriceInCart () {

    let total = 0;

    cart.forEach((item) => {

      total += item.count * item.price;

    });

    return total;

  }

  function getItemTitleInCart () {

    let nombre;

    cart.forEach((item) => {

      nombre = item.title;

    });

    return nombre;

  }

  function getItemId (id) {
    
    let returnedID;
    return returnedID = console.log ("Has clickeado el producto con el id "+id);

  }

  function removeFromCart (id) {

    setCart((cart) =>

        cart.map(item => item.id === id ?
            ({
                ...item,
                qty: item.qty - 1
            }) :
            item
        ).filter(item => {
            return item.id === id ?
                item.qty > 0 :
                true
        })
    );

    alert ("Se han eliminado del carrito los items solicitados.")

  }

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItemsInCart,
        getTotalPriceInCart,
        getItemTitleInCart,
        getItemId,
      }}
    >
      {props.children}
    </CartContext.Provider>

  );
  
}

export { CartContext, CartContextProvider };