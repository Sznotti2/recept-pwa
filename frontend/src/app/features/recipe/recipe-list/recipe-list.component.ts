import { Component, inject, Input } from '@angular/core';
import { Recipe } from '../../../features/recipe/interfaces/recipe';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-recipe-list',
	standalone: true,
	imports: [RouterLink, AsyncPipe],
	templateUrl: './recipe-list.component.html',
	styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
	@Input() recipes$!: Observable<Recipe[]>;

	toggleFavorite(recipe: Recipe) {
		console.log("toggleFavorite was called")
	}
}
