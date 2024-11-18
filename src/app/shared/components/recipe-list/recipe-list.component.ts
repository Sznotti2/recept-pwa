import { Component, Input } from '@angular/core';
import { Recipe } from '../../../core/interfaces/recipe';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RouterLink, DatePipe ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
	@Input() recipes!: Recipe[];

	toggleFavorite(recipe: Recipe) {
		recipe.isFavorite = !recipe.isFavorite;
	}
}
