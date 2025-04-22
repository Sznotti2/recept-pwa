import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ImgbbService {
	private apiUrl = 'https://api.imgbb.com/1/upload';
	private apiKey = '6e5937a88f9cc70a7accb4327ff3c773';

	constructor(private http: HttpClient) { }

	/**
	 * Feltölti a képet az imgbb-re.
	 * @param file A feltöltendő kép (File típus)
	 * @param expiration (opcionális) A kép lejárati ideje másodpercben (alapértelmezett: 600)
	 * @returns Observable, amely a feltöltési választ tartalmazza
	 */
	upload(file: File): Observable<any> {
		return this.convertFileToBase64(file).pipe(
			switchMap((base64Image: string) => {
				// Az API csak a tiszta Base64 string-et várja, ezért levágjuk az elejét ("data:image/png;base64,")
				const base64Data = base64Image.split(',')[1];

				const formData = new FormData();
				formData.append('image', base64Data);
				formData.append('key', this.apiKey);

				return this.http.post(this.apiUrl, formData).pipe(
					catchError(this.handleError)
				);
			})
		);
	}

	/**
	 * Átalakítja a File objektumot Base64 string-é.
	 * @param file A feltöltendő kép
	 * @returns Observable, amely a Base64 reprezentációt adja vissza
	 */
	private convertFileToBase64(file: File): Observable<string> {
		return new Observable<string>((observer) => {
			const reader = new FileReader();
			reader.onload = () => {
				observer.next(reader.result as string);
				observer.complete();
			};
			reader.onerror = (error) => {
				observer.error(error);
			};
			reader.readAsDataURL(file);
		});
	}

	/**
	 * Hibakezelő metódus
	 * @param error A HttpErrorResponse objektum
	 * @returns Observable hibaként
	 */
	private handleError(error: HttpErrorResponse): Observable<never> {
		if (error.error instanceof ErrorEvent) {
			// Kliens oldali hiba
			console.error('Kliens hiba:', error.error.message);
		} else {
			// Szerver oldali hiba
			console.error(
				`Szerver hiba: ${error.status}, hibás válasz: `,
				error.error
			);
		}
		return throwError(() => new Error('Hiba történt a kép feltöltése során. Próbáld meg később.'));
	}
}
