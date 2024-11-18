import { Component, inject, OnInit } from '@angular/core';
import { MultiselectDropdownComponent } from '../../shared/components/multiselect-dropdown/multiselect-dropdown.component';
import { RecipeListComponent } from "../../shared/components/recipe-list/recipe-list.component";
import { Recipe } from '../../core/interfaces/recipe';
import { RecipeService } from '../../core/services/recipe.service';
import { RecipeFirebaseService } from '../../core/services/recipe-firebase.service';

interface Item {
	value: string;
	category: string;
}

@Component({
	selector: 'app-search',
	standalone: true,
	imports: [MultiselectDropdownComponent, RecipeListComponent],
	templateUrl: './search.component.html',
	styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
	recipeService = inject(RecipeService);
	recipeFirebaseService = inject(RecipeFirebaseService);

	recipeList: Recipe[] = this.recipeService.getAllRecipes();
	itemList : Item[] = [];

	constructor() {
		this.itemList = [
			{ value: 'Apple', category: 'Fruits' },
			{ value: 'Banana', category: 'Fruits' },
			{ value: 'Carrot', category: 'Vegetables' },
			{ value: 'Broccoli', category: 'Vegetables' }
		];
	}
	ngOnInit(): void {
		// this.recipeFirebaseService.addRecipe(
		// 	"test",
		// 	"description...",
		// 	"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthebusybaker.ca%2Fwp-content%2Fuploads%2F2019%2F12%2Fpumpkin-chocolate-chip-muffins-fb-ig-2.jpg&f=1&nofb=1&ipt=010e46bbfea4230280138e24615dc9dea0d24e75fc47ce4e3aa4060e33e2f3bc&ipo=images",
		// 	["1", "2", '3'],
		// 	4.5,
		// 	20,
		// 	[
		// 		{title: "title", ingredientList:  ["ingredient1", "ingredient2"]},
		// 		{title: "title 2", ingredientList:  ["ingredient1", "ingredient2", "ingredient2"]}
		// 	],
		// 	[
		// 		{text: "instruction 1 ..."},
		// 		{text: "instruction 1 ...", images: ["https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthebusybaker.ca%2Fwp-content%2Fuploads%2F2019%2F12%2Fpumpkin-chocolate-chip-muffins-fb-ig-2.jpg&f=1&nofb=1&ipt=010e46bbfea4230280138e24615dc9dea0d24e75fc47ce4e3aa4060e33e2f3bc&ipo=images", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthebusybaker.ca%2Fwp-content%2Fuploads%2F2019%2F12%2Fpumpkin-chocolate-chip-muffins-fb-ig-2.jpg&f=1&nofb=1&ipt=010e46bbfea4230280138e24615dc9dea0d24e75fc47ce4e3aa4060e33e2f3bc&ipo=images"]}
		// 	],
		// );

		this.recipeFirebaseService.getRecipes().subscribe(recipes => {
			// this.recipeService.recipesSig.set(recipes);
			this.recipeList = recipes;
			console.log(recipes);
		});

	}

	filter(event: Event) {
		const input = event.target as HTMLInputElement;
		this.recipeList = this.recipeService.filterRecipiesByName(input.value);
	}
}
