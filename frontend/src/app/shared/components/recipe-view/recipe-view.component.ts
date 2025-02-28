import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../core/services/recipe.service';
import { Recipe } from '../../../core/interfaces/recipe';
import { RecipeFirebaseService } from '../../../core/services/recipe-firebase.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';

@Component({
	selector: 'app-recipe-view',
	standalone: true,
	imports: [CommonModule, NgIf, AsyncPipe],
	templateUrl: './recipe-view.component.html',
	styleUrl: './recipe-view.component.scss'
})
export class RecipeViewComponent {
	route: ActivatedRoute = inject(ActivatedRoute);
	recipe$: Observable<Recipe>;
	recipeServise = inject(RecipeService);
	recipeFirebaseService = inject(RecipeFirebaseService);

	constructor() {
		const recipeId = this.route.snapshot.params['id'];
		// this.recipe = this.recipeServise.getRecipeById(recipeId);
		this.recipe$ = this.recipeFirebaseService.getRecipeById(recipeId);

	}
}
