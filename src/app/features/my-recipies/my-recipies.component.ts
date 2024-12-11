import { Component, inject, OnInit } from '@angular/core';
import { RecipeListComponent } from '../../shared/components/recipe-list/recipe-list.component';
import { RecipeFirebaseService } from '../../core/services/recipe-firebase.service';
import { Recipe } from '../../core/interfaces/recipe';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeService } from '../../core/services/recipe.service';

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
