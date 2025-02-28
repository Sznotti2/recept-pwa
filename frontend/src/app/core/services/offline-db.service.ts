import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient, Instruction, Recipe } from '../interfaces/recipe';

@Injectable({
	providedIn: 'root'
})
export class OfflineDbService {
	private readonly objectStoreName = "recipes";
	public db!: IDBDatabase;
	public recipes: Recipe[] = [];

	constructor(private router: Router) {
		// Adatbázis létrehozása (ha még nem létezik) és megnyitása
		const request = indexedDB.open("recipes-db", 1);

		// Error kezelése az adatbázis létrehozásakor/megnyitásakor
		request.onerror = (event: any) => {
			console.log("Database error:", event.target.error);
		}

		// Ha a verziószám növekedett (vagy most hoztuk létre az adatbázist), itt kell frissíteni az object store sémát
		request.onupgradeneeded = (event: any) => {
			this.db = event.target.result;
			this.createObjectStore();
		}

		// Adatbázis sikeres létrehozásának&megnyitásának kezelése
		request.onsuccess = (event: any) => {
			this.db = event.target.result;
			this.loadRecipes();
		}
	}

	public createRecipe(
		name: string,
		description: string,
		image: HTMLInputElement,
		categories: string[],
		timeToMake: number,
		servings: number,
		ingredients: Ingredient[],
		instructions: Instruction[]): void {
		const newRecipe: Recipe = {
			id: Date.now().toString(),
			name,
			description,
			image: image.value,
			categories,
			timeToMake,
			servings,
			ingredients,
			instructions,
			rating: 0, // default rating
			isFavorite: false // default favorite status
		};

		// Object store tranzakció létrehozása és object store lekérése
		const objectStore = this.db.transaction(this.objectStoreName, "readwrite").objectStore(this.objectStoreName);
		const request = objectStore.add(newRecipe); // "add" request létrehozása

		// Sikeres request lekezelése
		request.onsuccess = () => {
			this.recipes = [];
			this.loadRecipes();

			this.router.navigateByUrl("main");
		}

		// Request error lekezelése
		request.onerror = (event: any) => {
			console.log("Error adding item:", event.target.error);
		}
	}

	public deleteBuilding(id: number): void {
		// Object store tranzakció létrehozása és object store lekérése
		const objectStore = this.db.transaction(this.objectStoreName, "readwrite").objectStore(this.objectStoreName);
		const request = objectStore.delete(id); // "delete" request létrehozása

		// Sikeres request lekezelése
		request.onsuccess = () => {
			this.recipes = [];
			this.loadRecipes();

			window.location.reload();
		}

		// Request error lekezelése
		request.onerror = (event: any) => {
			console.log("Error deleting item:", event.target.error);
		}
	}

	public editRecipe(editedRecipe: Recipe): void {
		// Object store tranzakció létrehozása és object store lekérése
		const objectStore = this.db.transaction(this.objectStoreName, "readwrite").objectStore(this.objectStoreName);
		const request = objectStore.put(editedRecipe); // "put" request létrehozása

		// Sikeres request lekezelése
		request.onsuccess = () => {
			this.recipes = [];
			this.loadRecipes();
		}

		// Request error lekezelése
		request.onerror = (event: any) => {
			console.log("Error editing item:", event.target.error);
		}
	}

	private createObjectStore(): void {
		// Object store létrehozása
		const objectStore = this.db.createObjectStore(this.objectStoreName, {
			keyPath: "id", // Egyedi kulcs
			autoIncrement: true
		});

		// Adatbázis index létrehozása a hatékonyabb működés érdekében
		objectStore.createIndex("name", "name", { unique: false });
	}

	private loadRecipes(): void {
		// Object store tranzakció létrehozása és object store lekérése
		const objectStore = this.db.transaction(this.objectStoreName).objectStore(this.objectStoreName);

		// Adatbázisban tárolt objektumok bejárása kurzor segítségével
		objectStore.openCursor().onsuccess = (event: any) => {
			const cursor = event.target.result;

			if (cursor) {
				// Itt lehet opcionálisan további feltételeket definiálni (az SQL WHERE feltétel helyett)
				this.recipes.push(cursor.value);
				cursor.continue();
			}
		}
	}
}
