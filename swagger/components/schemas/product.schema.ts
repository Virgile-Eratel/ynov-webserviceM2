export const ProductSchemaNew = {
  NewProduct: {
    type: 'object',
    required: ['title', 'price', 'category', 'ean', 'specs'],
    properties: {
      title: {
        type: 'string',
        example: 'Clavier sans fil',
      },
      price: {
        type: 'number',
        format: 'float',
        example: 79.99,
      },
      category: {
        type: 'string',
        example: 'Clavier',
      },
      ean: {
        type: 'string',
        example: 'ean example',
      },
      specs: {
        type: 'string',
        example: 'specs example',
      },
      desciption: {
        type: 'string',
        example: 'description example',
      },
    },
  },
};

export const ProductSchema = {
  ...ProductSchemaNew,
  Product: {
    ...ProductSchemaNew.NewProduct,
    required: ['id', 'title', 'price', 'category', 'ean', 'specs'],
    properties: {
      ...ProductSchemaNew.NewProduct.properties,
      id: {
        type: 'integer',
        example: 1,
      },
    },
  },
};
