export const findProductInCart = (cart,proid)=>{
    const isProductInCart = cart && cart.length>0 && cart.some(({_id})=>_id === proid);
    return isProductInCart;
}