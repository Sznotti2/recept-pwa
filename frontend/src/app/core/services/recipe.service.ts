import { inject, Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:5000/api/recipe';
@Injectable({
	providedIn: 'root'
})
export class RecipeService {
	http = inject(HttpClient);

	addRecipe(recipe: Recipe): Observable<any> {
		console.log("addRecipe: ", recipe.instructions);
		return this.http.post<any>(
			API_URL + "/",
			{
				"name": recipe.name,
				"description": recipe.description,
				// "image": recipe.image,
				"image": "https://www.atlasandboots.com/travel-blog/most-beautiful-mountains-in-the-world/",
				"cookTime": recipe.timeToMake,
				"servings": recipe.servings,
				"difficulty": "easy",
				"slug": recipe.slug,
				"tags": recipe.categories,
				"ingredients": recipe.ingredients,
				"instructions": recipe.instructions,
			},
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		).pipe(
			catchError(error => {
				console.error("Hiba történt a recept hozzáadása során:", error);
				return of({ error: error });
			})
		);
	}

	getRecipes(): Observable<Recipe[]> {
		return this.http.get<{ rows: Recipe[] }>(
			API_URL + "/",
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		).pipe(
			map(response => response.rows ?? []), // Ha null vagy undefined, akkor üres tömböt ad vissza
			catchError(error => {
				console.error("Hiba történt a receptek lekérésekor:", error);
				return of([]); // Hiba esetén is üres tömböt adunk vissza, így elkerüljük a hibát a sablonban
			})
		);
	}

	getRecipeBySlug(slug: string): Observable<Recipe> {
		return this.http.get<Recipe>(
			API_URL + "/" + slug,
			{}
		);
	}

	getFavoriteRecipes(): Observable<any> {
		return this.http.get(
			API_URL + "/favs",
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		);
	}

	editRecipe(recipe: Recipe, id: number): Observable<any> {
		return this.http.put(
			API_URL + "/" + id,
			{
				"name": recipe.name,
				"description": recipe.description,
				"image": recipe.image,
				"timeToMake": recipe.timeToMake,
				"servings": recipe.servings,
				"difficulty": recipe.difficulty,
				"slug": recipe.slug,
				"categories": recipe.categories,
				"ingredients": recipe.ingredients,
				"instructions": recipe.instructions,
			},
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		);
	}

	deleteRecipe(id: string): Observable<any> {
		return this.http.delete(
			API_URL + "/" + id,
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		);
	}

	/**
	 * Ha online online állapotba ér az alkalmazás a nem szinkronizált boxokat elmentjük a firestore-ba is,
	 * majd jelezzük, hogy a box listát újra le kell kérni.
	 */
	// private setupOfflineSync(): void {
	// 	window.addEventListener('online', () => {
	// 		this.syncUnsyncedBoxes().subscribe(() => this.boxesChanged$.next());
	// 	});
	// }

	/*
	 * Lekérjük a nem szinkronizált boxokat, azokat elmentjük a firestore-ba,
	 * és az indexedDB-ben is frissítjük az boxot, hogy már szinkronizálva van.
	 */
	// private syncUnsyncedBoxes(): Observable<any> {
	// 	return this.offlineBoxStoreService
	// 		.getUnsyncedBoxes()
	// 		.pipe(
	// 			switchMap((unsyncedBoxes) =>
	// 				forkJoin(
	// 					unsyncedBoxes.map((unsyncedBox) =>
	// 						this.boxFireStoreService
	// 							.saveBox(unsyncedBox)
	// 							.pipe(
	// 								tap(() => this.offlineBoxStoreService.updateBox(unsyncedBox))
	// 							)
	// 					)
	// 				)
	// 			)
	// 		);
	// }

}
