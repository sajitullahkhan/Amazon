export const cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1
}];

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
