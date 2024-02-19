export type Product = {
    _id: string;
    _createdAt: Date;
    name: string;
    description: string,
    slug: string;
    price: number;
    category: { name: string, _id: string}[];
    size: { name: string, _id: string }[];
    color: { name: string, _id: string }[];
    extraImages: { name: string, _id: string }[];
    design: {
        designer: string;
        portfolio: string
    };
    image: string;
}