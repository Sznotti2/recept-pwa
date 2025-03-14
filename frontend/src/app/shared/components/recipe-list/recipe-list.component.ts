import { Component, inject, Input } from '@angular/core';
import { Recipe } from '../../../core/interfaces/recipe';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RecipeService } from '../../../core/services/recipe.service';

@Component({
	selector: 'app-recipe-list',
	standalone: true,
	imports: [RouterLink, AsyncPipe],
	templateUrl: './recipe-list.component.html',
	styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
	@Input() recipes$!: Observable<Recipe[]>;
	recipeService = inject(RecipeService);

	toggleFavorite(recipe: Recipe) {
		console.log("toggleFavorite was called")
	}
}
