import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../interfaces/recipe';

@Component({
  selector: 'app-my-recipies',
  standalone: true,
  imports: [RecipeListComponent, RouterLink],
  templateUrl: './my-recipies.component.html',
  styleUrl: './my-recipies.component.scss'
})
export class MyRecipiesComponent implements OnInit {
	recipeService = inject(RecipeService);
	recipeList$!: Observable<Recipe[]>;


	ngOnInit(): void {
		this.recipeList$ = this.recipeService.getRecipes();
	}
}
