import { Component, inject, OnInit } from '@angular/core';
import { MultiselectDropdownComponent } from '../../shared/components/multiselect-dropdown/multiselect-dropdown.component';
import { RecipeListComponent } from "../../shared/components/recipe-list/recipe-list.component";
import { Recipe } from '../../core/interfaces/recipe';
import { RecipeService } from '../../core/services/recipe.service';
import { Observable } from 'rxjs';

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
