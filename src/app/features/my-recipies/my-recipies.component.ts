import { Component, inject, OnInit } from '@angular/core';
import { RecipeListComponent } from '../../shared/components/recipe-list/recipe-list.component';
import { RecipeFirebaseService } from '../../core/services/recipe-firebase.service';
import { Recipe } from '../../core/interfaces/recipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-recipies',
  standalone: true,
  imports: [RecipeListComponent, RouterLink],
  templateUrl: './my-recipies.component.html',
  styleUrl: './my-recipies.component.scss'
})
export class MyRecipiesComponent implements OnInit {
	recipeFirebaseService = inject(RecipeFirebaseService);
	recipeList: Recipe[] = [];


	ngOnInit(): void {
		this.recipeFirebaseService.getRecipes().subscribe(recipes => {
			this.recipeList = recipes;
			console.log(recipes);
		});
	}
}
