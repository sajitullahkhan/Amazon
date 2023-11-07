export const cart = [];

export function addToCart(productId){
    let machingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            machingItem = cartItem;
        }
    });

    if(machingItem){
        machingItem.quantity += 1;
    } else{
        cart.push({
            productId,
            quantity: 1
        });
    }
}
