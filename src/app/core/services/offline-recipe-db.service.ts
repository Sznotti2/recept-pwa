import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root',
})
export class OfflineRecipeDbService {
  private readonly objectStoreName = 'recipes';
  public db!: IDBDatabase;

  constructor() {
    /**
     * Létrehozza az az adatbázist, majd beállítja az adattagnak, hogy később ezt tudjuk használni.
     */
    this.initIndexedDB().then((db) => (this.db = db));
  }

  private initIndexedDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('recipes-db', 1);
      request.onupgradeneeded = (event: any) => this.createObjectStore(event.target.result);
      request.onsuccess = (event: any) => resolve(event.target.result);
      request.onerror = (event) => {
        console.error('IndexedDB error:', event);
        reject(event);
      };
    });
  }

  public saveRecipe(recipe: Recipe): Observable<Recipe> {
    return from(
      new Promise<Recipe>((resolve, reject) => {
        this.openRecipeStore().then(objectStore => {
          try {
            const request = objectStore.add({ ...recipe, synced: false });
            request.onsuccess = () => resolve({ ...recipe });
            request.onerror = (event) => {
              console.error('Error adding recipe:', event);
              reject(event);
            };
          } catch (error) {
            console.error('Error during saveRecipe execution:', error);
            reject(error);
          }
        }).catch(error => {
          console.error('Error opening recipe store:', error);
          reject(error);
        });
      })
    );
  }

  public updateRecipe(recipe: Recipe): Observable<Recipe> {
    return from(
      new Promise<Recipe>((resolve, reject) => {
        this.openRecipeStore().then(objectStore => {
          try {
            const request = objectStore.put({ ...recipe, synced: true });
            request.onsuccess = () => resolve({ ...recipe });
            request.onerror = (event) => {
              console.error('Error updating recipe:', event);
              reject(event);
            };
          } catch (error) {
            console.error('Error during updateRecipe execution:', error);
            reject(error);
          }
        }).catch(error => {
          console.error('Error opening recipe store:', error);
          reject(error);
        });
      })
    );
  }

  public getRecipes(): Observable<Recipe[]> {
    return from(
      new Promise<Recipe[]>((resolve, reject) => {
        this.openRecipeStore().then(objectStore => {
          try {
            const request = objectStore.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => {
              console.error('Error getting all recipes:', event);
              reject(event);
            };
          } catch (error) {
            console.error('Error during getRecipes execution:', error);
            reject(error);
          }
        }).catch(error => {
          console.error('Error opening recipe store:', error);
          reject(error);
        });
      })
    );
  }

  public getRecipeById(id: string): Observable<Recipe> {
    return from(
      new Promise<Recipe>((resolve, reject) => {
        this.openRecipeStore().then(objectStore => {
          try {
            const request = objectStore.get(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => {
              console.error('Error getting recipe by ID:', event);
              reject(event);
            };
          } catch (error) {
            console.error('Error during getRecipeById execution:', error);
            reject(error);
          }
        }).catch(error => {
          console.error('Error opening recipe store:', error);
          reject(error);
        });
      })
    );
  }

  public getUnsyncedRecipes(): Observable<Recipe[]> {
    return from(
      new Promise<Recipe[]>((resolve) => {
        this.openRecipeStore().then(objectStore => {
          const unsynced: Recipe[] = [];
          /* Cursor segítségével bejárjuk az adatbázisban lévő elemeket */
          objectStore.openCursor().onsuccess = function (event: any) {
            let cursor = event.target.result;
            if (cursor) {
              /* Azon boxot, melynek a synced értéke false, azokat a tömbbe tároljuk */
              if (!cursor.value.synced) {
                unsynced.push(cursor.value);
              }
              cursor.continue();
            } else {
              /* Ha már nincs több elem, visszaadjuk a nem szinkronizált boxokat */
              resolve(unsynced);
            }
          };
        }).catch(error => {
          console.error('Error opening recipe store for unsynced recipes:', error);
          resolve([]); // Ha hiba van, üres tömböt adunk vissza
        });
      })
    );
  }

  private createObjectStore(db: IDBDatabase): IDBObjectStore {
    const objectStore = db.createObjectStore(this.objectStoreName, {
      keyPath: 'id',
      autoIncrement: false, // Az id explicit módon biztosítva van, ezért kikapcsoljuk az autoincrement-et
    });

    objectStore.createIndex('synced', 'synced', { unique: false });
    return objectStore;
  }

  /**
   * Segítségével létrehozzuk az adatbázist, amennyiben még nem jött létre, másik esetben csak visszaadjuk a meglévőt.
   */
  private getDB(): Promise<IDBDatabase> {
    if (this.db) {
      return new Promise((resolve) => resolve(this.db));
    } else {
      return this.initIndexedDB();
    }
  }

  /**
   * Asnyc módon megnyitjuk az adatbázist, hogy egy tranzakciótr végezzünk rajta.
   */
  private openRecipeStore(): Promise<IDBObjectStore> {
    return new Promise<IDBObjectStore>((resolve, reject) => {
      this.getDB().then((db) => {
        try {
          const transaction = db.transaction(this.objectStoreName, 'readwrite');
          const objectStore = transaction.objectStore(this.objectStoreName);
          resolve(objectStore);
        } catch (error) {
          console.error('Error during transaction creation:', error);
          reject(error);
        }
      }).catch(error => {
        console.error('Error getting database instance:', error);
        reject(error);
      });
    });
  }
}
