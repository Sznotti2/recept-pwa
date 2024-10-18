import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../core/services/recipe.service';
import { Recipe } from '../../../core/interfaces/recipe';

@Component({
  selector: 'app-recipe-view',
  standalone: true,
  imports: [],
  templateUrl: './recipe-view.component.html',
  styleUrl: './recipe-view.component.scss'
})
export class RecipeViewComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
	recipe: Recipe | undefined;
	recipeServise = inject(RecipeService);

	constructor() {
		const recipeId = Number(this.route.snapshot.params['id']);
		this.recipe = this.recipeServise.getRecipeById(recipeId);
	}
}
