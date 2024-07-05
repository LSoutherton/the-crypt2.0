export interface cartItem {
    coin: string;
    number: number;
    price: number;
    image: string;
    id: string;
}

export interface orderItem {
    cart: cartItem[],
    date: string
}

export interface holding {
    coin: string,
    amount: number,
    image: string
}

export interface value {
    id: string,
    value: number,
    percentage: number
}