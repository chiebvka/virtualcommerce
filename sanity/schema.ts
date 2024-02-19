import { type SchemaTypeDefinition } from 'sanity';

const categories = {
  name: 'categories',
  title: 'Categories',
  type: 'document',

  of: [{type: 'string'}],
  fields: [
    {
      name: "name",
      title: "Category",
      type: "string",
    },
  ]
}
const sizes = {
  name: 'sizes',
  title: 'Sizes',
  type: 'document',

  of: [{type: 'string'}],
  fields: [
    {
      name: "name",
      title: "Size",
      type: "string",
    },
  ]
}
const colors = {
  name: 'colors',
  title: 'Colors',
  type: 'document',

  of: [{type: 'string'}],
  fields: [
    {
      name: "name",
      title: "Color",
      type: "string",
    },
  ]
}


const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: { required: () => any; }) => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // Use the "name" field as the source for generating the slug
        maxLength: 200, // Adjust the maximum length as needed
      },
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {    
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'categories' }] }],
    },
    {    
      name: 'size',
      title: 'Size',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sizes' }] }],
    },
    {    
      name: 'color',
      title: 'Color',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'colors' }] }],
    },
    {
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true, // Allows selecting a hotspot for cropping
      },
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: "extraImages",
      title: "Extra Images",
      type: "array",
      of: [{ type: "image" }],
    },
    // {
    //   name: "colors",
    //   title: "Colors",
    //   type: "array",
    //   of: [
    //     {
    //       type: "string",
    //       options: {
    //         list: ["Grey", "Black", "Blue"], // Add your color options
    //       },
    //     },
    //   ],
    // },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(0),
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DDTHH:mm:ssZ",
      },
      readOnly: true,
    },
  ]
}

const comment = {
  name: 'comment',
  title: 'Comments',
  type: 'document',
  fields: [
    {
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }], // Reference to the product schema
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: { required: () => { (): any; new(): any; email: { (): any; new(): any; }; }; }) => Rule.required().email(),
    },
    {
      name: 'commentText',
      title: 'Comment',
      type: 'text',
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: 'stars',
      title: 'Stars',
      type: 'number',
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): any; new(): any; }; }; new(): any; }; }; }) => Rule.required().min(1).max(5),
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DDTHH:mm:ssZ',
      },
      readOnly: true,
    },
  ],
  initialValue: {
    createdAt: new Date().toISOString(),
  },
};


const contact = {
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: { required: () => { (): any; new(): any; email: { (): any; new(): any; }; }; }) => Rule.required().email(),
    },
    {
      name: 'issue',
      title: 'Issue',
      type: 'text',
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DDTHH:mm:ssZ',
      },
      readOnly: true,
    },
  ],
  initialValue: {
    createdAt: new Date().toISOString(),
  },
};

const user = {
  name: "user",
  title: "Users",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: { required: () => { (): any; new(): any; email: { (arg0: { message: string; }): { (): any; new(): any; unique: { (): any; new(): any; }; }; new(): any; }; }; }) =>
        Rule.required().email({ message: "Must be a valid email address" }).unique(),
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DDTHH:mm:ssZ",
      },
      readOnly: true,
    },
  ],
  initialValue: {
    createdAt: new Date().toISOString(),
  },
};

const order = {
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: "qty",
      title: "Qty",
      type: "number",
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(0),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(0),
    },
    {
      name: "color",
      title: "Color",
      type: "string",
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DDTHH:mm:ssZ",
      },
      readOnly: true,
    }
    ,{
      name: "paid",
      title: "Paid",
      type: "boolean",
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },{
      name: "delivered",
      title: "Delivered",
      type: "boolean",
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
  ],
  initialValue: {
    createdAt: new Date().toISOString(),
  },
};


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, categories, order, contact, user, comment, sizes, colors],
}
