import { inject, Injectable } from '@angular/core';
import { doc, addDoc, updateDoc, getDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { getDownloadURL, ref as storageRef, Storage, uploadBytes } from '@angular/fire/storage';
import { Database, ref as dbRef, set } from '@angular/fire/database';
import { finalize, from, map, Observable, of, switchMap } from 'rxjs';
import { Recipe } from '../interfaces/recipe';
import { HttpClient } from '@angular/common/http';

// https://www.youtube.com/watch?v=0ihoworuX4o
@Injectable({
	providedIn: 'root'
})
export class RecipeFirebaseService {
	private firestore = inject(Firestore);
	recipeCollection = collection(this.firestore, "recipe");

	private http = inject(HttpClient);
	

	constructor(private storage: Storage, private db: Database) {
	}

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
		image: HTMLInputElement,
		categories: string[],
		timeToMake: number,
		servings: number,
		ingredients: {
			title: string;
			ingredientList: string[];
		}[],
		instructions: {
			text: string;
			images?: string[];
		}[]
	): Observable<string> {
		let imageURL = "";
		this.uploadImage(image).subscribe((url) => {
			imageURL = url;
		});


		const newRecipe: Recipe = {
			id: "wasd",
			name,
			description,
			image: imageURL,
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
	
	uploadImageAndSaveToDB(image: HTMLInputElement): Observable<string> {
		return this.uploadImage(image).pipe(
		  switchMap((imageUrl: string) => {
			if (imageUrl) {
			  const imageRef = dbRef(this.db, 'images/' + this.generateUniqueId());
			  return from(set(imageRef, { imageUrl })).pipe(switchMap(() => of(imageUrl)));
			} else {
			  return of('');
			}
		  })
		);
	  }

	  private generateUniqueId(): string {
		return Math.random().toString(36).substring(2, 15);
	  }
	uploadImage(image: HTMLInputElement): Observable<string> {
		// Ellenőrizzük, hogy van-e kép kiválasztva
		if (image.files && image.files.length > 0) {
			const selectedImage = image.files[0];
			const imagePath = `recipe/images/${selectedImage.name}`;
	
			// Referencia létrehozása a Firebase Storage-ban
			const imageRef = storageRef(this.storage, imagePath);
	
			// Feltöltjük a képet és visszakapjuk az URL-t
			return from(uploadBytes(imageRef, selectedImage)).pipe(
				switchMap(() => getDownloadURL(imageRef)), // Ha sikeres a feltöltés, visszakapjuk a letöltési URL-t
				switchMap((downloadURL: string) => {
					console.log('File available at', downloadURL);
					return of(downloadURL); // Visszaadjuk a letöltési URL-t
				})
			);
		} else {
			// Ha nincs kép kiválasztva, egy üres stringgel térünk vissza
			return of('');
		}
	}
}
