import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Recipe } from '../recipe/interfaces/recipe';
import { RecipeListComponent } from '../recipe/recipe-list/recipe-list.component';
import { RecipeService } from '../recipe/services/recipe.service';

interface Item {
	value: string;
	category: string;
}

@Component({
	selector: 'app-search',
	standalone: true,
	imports: [RecipeListComponent],
	templateUrl: './search.component.html',
	styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
	recipeService = inject(RecipeService);
	recipeList$!: Observable<Recipe[]>;

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
		this.recipeList$ = this.recipeService.getRecipes();
	}

	filter(event: Event) {
		const input = event.target as HTMLInputElement;
		console.log("filter was called");
	}
}
