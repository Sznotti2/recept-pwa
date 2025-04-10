export interface Blog {
    id: number;
    title: string;
    description: string;
    image: string;
    slug: string;
    status: string;
    meta_description: string;
    author_id: number;
    created_at: Date;
    updated_at: Date;
    published_at: Date;
    blocks: BlogBlock[];
}

interface BlogBlock {
    id: number;
    block_type: string;
    block_index: number;
    content: string;
    blog_id: number;
}