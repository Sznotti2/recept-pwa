import { Component, Input } from '@angular/core';
import { Recipe } from '../../../core/interfaces/recipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-card2',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-card2.component.html',
  styleUrl: './recipe-card2.component.scss'
})
export class RecipeCard2Component {
	@Input() recipe!: Recipe;

}
