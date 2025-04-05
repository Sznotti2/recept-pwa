export interface Blog {
    id: number;
    title: string;
    description: string;
    image: string;
    content: string;
    slug: string;
    author_id: number;
    created_at: Date;
    updated_at: Date;
}
