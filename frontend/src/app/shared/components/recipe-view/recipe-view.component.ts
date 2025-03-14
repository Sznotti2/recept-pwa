import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../core/services/recipe.service';
import { Recipe } from '../../../core/interfaces/recipe';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-recipe-view',
	standalone: true,
	imports: [CommonModule, NgIf, AsyncPipe],
	templateUrl: './recipe-view.component.html',
	styleUrl: './recipe-view.component.scss'
})
export class RecipeViewComponent {
	route: ActivatedRoute = inject(ActivatedRoute);
	recipeServise = inject(RecipeService);

	recipe$: Observable<Recipe>;

	constructor() {
		const recipeId = this.route.snapshot.params['id'];
		this.recipe$= this.recipeServise.getRecipeBySlug(recipeId);
	}
}
