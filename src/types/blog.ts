export type Blog = {
    id:string;
    title:string;
    image:string;
    user:User;
    content:string,
    view?:number
}

export type FormPostNews = {
    title:string;
    image:string;
    user:string;
    content:string,
}

export type User = {
    id:string;
    name:string
}