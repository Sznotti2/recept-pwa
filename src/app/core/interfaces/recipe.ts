export interface Recipe {
	id: string;
	name: string;
	description: string;
	image: string;
	categories: string[];
	timeToMake: number;
	rating: number;
	servings: number; // adagok
	isFavorite: boolean;
	ingredients: Ingredient[];
	instructions: Instruction[];
}

export interface Ingredient {
	title: string;
	ingredientList: string[]
}

export interface Instruction {
	text: string;
	images?: string[];
}