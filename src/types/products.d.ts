type Product = {
    name: string;
    slug: string;
    thumbnail: string;
    gallery: string[];
    attributes: string[];
    categories: string[];
    description: string;
    video: string;
    active: boolean;
    id: string;
}
type Attribute = {
    name: string;
    price: number;
    stock: number;
    discount: number;
    image: string;
}

type FormProductData = {
    name: string;
    thumbnail: string;
    attributes: Attribute[];
    gallery: string[];
    categories: string[]; // assuming "Object Id" is a string
    description: string;
    video: string;
    images: File[];
}

