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
    scoreReview: number;
}



type FormProductData = Pick<Product, 'desc' | 'gender' | 'name' | 'price'> & { images: File[], id_category: string }

