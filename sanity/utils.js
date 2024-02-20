import { createClient, groq } from "next-sanity";
import { client } from "./lib/client";
import { Product } from "@/types/Product";



export async function getProductBySlug(slug){
    const product = await client.fetch(
      groq`*[_type == "product" && slug.current == $slug]{
        _id,
        createdAt,
        name,
        slug,
        description,
        price,
        "image": image.asset->url,
        "slug": slug.current,
        "extraImages": extraImages[].asset->url,
        color[]-> {   
          name,
          _id
        },
        category[]-> {   
          name,
          _id
        },
        size[]-> {   
          name,
          _id
        }
      }`,
      { slug }
      ,);
  
    return product; // Assuming you expect a single product, not an array
  }
  
  export async function getAllProducts() {
    const products = await client.fetch(
      groq`*[_type == "product"]{
        _id,
        createdAt,
        name,
        slug,
        description,
        price,
        "image": image.asset->url,
        "slug": slug.current,
        "extraImages": extraImages[].asset->url,
        color[]-> {   
          name,
          _id
        },
        category[]-> {   
          name,
          _id
        },
        size[]-> {   
          name,
          _id
        }
      }`,
   );
  
   console.log(products)
    return products;
  }
  
  export async function getProducts() {
    const products = await client.fetch(
      groq`*[_type == "product"] | order(createdAt desc) [0...6] {
        _id,
        createdAt,
        name,
        slug,
        description,
        price,
        "image": image.asset->url,
        "slug": slug.current,
        "extraImages": extraImages[].asset->url,
        color[]-> {   
          name,
          _id
        },
        category[]-> {   
          name,
          _id
        },
        size[]-> {   
          name,
          _id
        }
      }`, // revalidate every hour
    );
  
    return products;
  }
  

  // Function to get orders by email and sort by the latest
  export async function getOrdersByEmail(email) {
    try {
      // Query orders from Sanity with a GROQ query
      const orders = await client.fetch(
        `*[_type == 'order' && email == $email] | order(createdAt desc)`,
        { email },
        {next: {
          revalidate: 1, //revalidate every 30 days
       }});
  
      // Return the sorted orders
      return orders;
    } catch (error) {
      // Handle errors appropriately
      console.error('Error getting orders:', error.message);
      throw new Error('Failed to get orders');
    }
  }
  
  export async function createOrder(email,cart) {
    console.log(email,cart);
    try {
      // Create an array to store the promises for creating each order
      const orderCreationPromises = [];
  
      // Iterate over the orderDataArray and create a promise for each order
      cart.forEach((orderData) => {
        // Extract order data
        const { name, quantity, size, price,color} = orderData;
  
        // Create a promise for creating each order
        const orderCreationPromise = client.create({
          _type: 'order',
          name,
          qty: quantity,
          price,
          color,
          size,
          paid: true,
          delivered: false,
          email: email,
          createdAt: new Date().toISOString(),
        });
  
        // Add the promise to the array
        orderCreationPromises.push(orderCreationPromise);
      });
  
      // Wait for all order creation promises to resolve
      const createdOrders = await Promise.all(orderCreationPromises);
  
      // Return the created orders
      return createdOrders;
    } catch (error) {
      // Handle errors appropriately
      console.error('Error creating order:', error.message);
      throw new Error('Failed to create order');
    }
  }
  




  export async function createContact(name, email, issue) {
    const currentDate = new Date().toISOString();
  
    const data = {
      _type: 'contact',
      name,
      email,
      issue,
      createdAt: currentDate,
    };
  
    // Use the client to create a new document in the 'contact' collection
    const response = await client.create(data).catch((error) => {
      console.error('Error creating contact:', error.message);
      throw new Error('Failed to create contact');
    });
  
    return response;
  }
  

const commentsQuery = groq`
*[_type == "comment" && product._ref == $productId] {
  _id,
  email,
  commentText,
  stars,
  createdAt
}
`;

export async function createComment(productId, commentText, stars, email) {
const currentDate = new Date().toISOString();

const commentData = {
  product: {
    _type: "reference",
    _ref: productId,
  },
  email,
  commentText,
  stars,
  createdAt: currentDate,
};

const result = await client.create({
  _type: "comment",
  ...commentData,
});

return result;
}

export async function getCommentsByProductId(productId) {
const params = { productId };
const comments = await client.fetch(commentsQuery, params);
//console.log(comments);
return comments;
}


