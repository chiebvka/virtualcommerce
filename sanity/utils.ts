import { createClient, groq } from "next-sanity";
import { client } from "./lib/client";
import { Product } from "@/types/Product";



export async function getProductBySlug(slug: string): Promise<Product[]> {
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
  
  export async function getAllProducts(): Promise<Product[]> {
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
  
  export async function getProducts(): Promise<Product[]> {
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
  



