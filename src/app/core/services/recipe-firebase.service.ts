import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { Recipe } from '../interfaces/recipe';

// https://www.youtube.com/watch?v=0ihoworuX4o
@Injectable({
	providedIn: 'root'
})
export class RecipeFirebaseService {
	firestore = inject(Firestore);
	recipeCollection = collection(this.firestore, "recipe");


	getRecipes(): Observable<Recipe[]> {
		// const recipeCollection = collection(this.firestore, 'recipe');
		// const querySnapshot = await getDocs(recipeCollection);

		// this.recipes = querySnapshot.docs.map(doc => doc.data());

		return collectionData(this.recipeCollection, {
			idField: "id"
		}) as Observable<Recipe[]>; // to handle "Type 'Observable<(DocumentData | (DocumentData & { id: string; }))[]>' is not assignable to type 'Observable<Recipe[]>'." error
	}

	getRecipeById(id: string): Observable<Recipe> {
		const docRef = doc(this.firestore, "recipe/" + id);

		return from(getDoc(docRef)).pipe(
			map(docSnap => {
				if (docSnap.exists()) {
					console.log("Recipe data:", docSnap.data());
					return docSnap.data() as Recipe;
				} else {
					throw new Error("No such document!");
				}
			})
		);
	}

	addRecipe(
		name: string,
		description: string,
		image: string,
		categories: string[],
		timeToMake: number,
		servings: number,
		ingredients: {
			title: string;
			ingredientList: string[]
		}[],
		instructions: {
			text: string;
			images?: string[];
		}[]
	): Observable<string> {
		const newRecipe: Recipe = {
			id: "wasd",
			name,
			description,
			image,
			categories,
			timeToMake,
			rating: 0,
			servings,
			isFavorite: false,
			ingredients,
			instructions,
		};
		const promise = addDoc(this.recipeCollection, newRecipe).then((response) => response.id);
		return from(promise);
	}

	updateRecipe(id: string, dataToUpdate: {}) {

	}
}
