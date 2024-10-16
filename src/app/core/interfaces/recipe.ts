export interface Recipe {
    id: number;
    title: string;
    description: string;
    date: Date;
    image: string;
    ingredients: string[];
    instructions: string[];
}
