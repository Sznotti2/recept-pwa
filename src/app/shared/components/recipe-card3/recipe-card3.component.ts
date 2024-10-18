import { Component, Input } from '@angular/core';
import { Recipe } from '../../../core/interfaces/recipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-card3',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-card3.component.html',
  styleUrl: './recipe-card3.component.scss'
})
export class RecipeCard3Component {
  @Input() recipe!: Recipe;

}
