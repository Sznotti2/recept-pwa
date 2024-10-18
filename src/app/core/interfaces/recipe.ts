export interface Recipe {
	id: number;
	name: string;
	description: string;
	image: string;
	categories: string[];
	time: number;
	ingredients: Ingredient[];
	instructions: Instruction[];
}

interface Ingredient {
	title: string;
	ingredientList: string[]
}

interface Instruction {
	text: string;
	images?: string[];
}