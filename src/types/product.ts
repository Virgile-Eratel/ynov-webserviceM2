export interface Product {
    id: number,
    title: string,
    category: string,
    ean: string,
    description?: string,
    specs: string,
    price: number,
}