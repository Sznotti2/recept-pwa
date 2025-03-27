import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../core/services/recipe.service';
import { Recipe } from '../../../core/interfaces/recipe';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { catchError, EMPTY, Observable } from 'rxjs';

@Component({
	selector: 'app-recipe-view',
	standalone: true,
	imports: [CommonModule, NgIf, AsyncPipe],
	templateUrl: './recipe-view.component.html',
	styleUrl: './recipe-view.component.scss'
})
export class RecipeViewComponent implements OnInit {
	route: ActivatedRoute = inject(ActivatedRoute);
	recipeServise = inject(RecipeService);

	recipe$!: Observable<Recipe>;
	errorMessage: string | null = null;

	constructor() {
		const recipeId = this.route.snapshot.params['id'];
		this.recipe$ = this.recipeServise.getRecipeBySlug(recipeId).pipe(
			catchError(error => {
				this.errorMessage = error.error.message;
				console.log("recipe error: ", error);
				return EMPTY;
			})
		);

		this.recipe$.subscribe(recept => {
			console.log(recept)
		})
	}
	ngOnInit(): void {
		
	}
}
