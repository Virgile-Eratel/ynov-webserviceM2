export interface Product {
    id: string,
    title: string,
    category: string,
    ean: string,
    description?: string | null,
    specs: string,
    price: number,
}