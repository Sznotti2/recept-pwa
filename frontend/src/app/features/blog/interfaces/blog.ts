export interface Blog {
    id: number;
    title: string;
    description: string;
    image: string;
	content: string;
    slug: string;
    status: string;
    meta_description: string;
    author_id: number;
    created_at: Date;
    updated_at: Date;
    published_at: Date;
}
