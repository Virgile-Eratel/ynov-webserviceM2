export const productsSchema = `
scalar DateTime

type Product {
  id: String!
  title: String!
  category: String!
  ean: String!
  description: String
  specs: String!
  price: Float!
  createdAt: DateTime 
  updatedAt: DateTime
}

type ResultProduct {
  product: Product
  success: Boolean!
}

type SccessResponse {
  success: Boolean!
}

type WsProductDeletedResponse {
  id: String
  success: Boolean!
}

input CreateProductInput {
  title: String!
  category: String!
  ean: String!
  description: String
  specs: String!
  price: Float!
}

input UpdateProductInput {
  title: String
  category: String
  ean: String
  description: String
  specs: String
  price: Float
}


extend type Query {
  products: [Product!]!
  product(id: ID!): Product
}

extend type Mutation {
  createProduct(input: CreateProductInput): ResultProduct!
  updateProduct(id: ID!, input: UpdateProductInput): ResultProduct!
  deleteProduct(id: ID!): SccessResponse!
}

extend type Subscription {
  productCreated: Product!
  productUpdated: Product!
  productDeleted: WsProductDeletedResponse!
}
`;
