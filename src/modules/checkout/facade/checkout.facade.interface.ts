export interface CheckoutFacadeInputDto{
    clientId: string;
    products: {
        productId: string
    }[];
}


export interface CheckoutFacadeOutputDto{
    id: string;
    invoiceId: string;
    status: string;
    total: number,
    products:{
        productId: string
    }[];
}


export default interface CheckoutFacadeInterface{
    execute(input: CheckoutFacadeInputDto): Promise<CheckoutFacadeOutputDto>;
}