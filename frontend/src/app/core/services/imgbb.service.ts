import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ImgbbService {
	http = inject(HttpClient);

	private imgbbApiKey = "942761c6f5c3f5cf4aeff610e8fde9d3";

	upload(file: File): Observable<string> {
		const formData = new FormData();
		formData.append('image', file);

		return this.http.post<any>(
			`https://api.imgbb.com/1/upload?key=${this.imgbbApiKey}`,
			formData
		).pipe(
			map(response => {
				if (response && response.data && response.data.url) {
					return response.data.url;
				} else {
					throw new Error('Invalid response from imgbb');
				}
			}
			));
	}

	/**
   * Konvertálja a File objektumot base64 stringgé.
   * @param file A feltöltendő képfájl
   * @returns Observable<string> a base64 kódolt kép
   */
	private convertFileToBase64(file: File): Observable<string> {
		return new Observable<string>(observer => {
			const reader = new FileReader();
			reader.onload = () => {
				const result = reader.result as string;
				// Eltávolítjuk az előtagot, pl. "data:image/png;base64,"
				const base64String = result.split(',')[1];
				observer.next(base64String);
				observer.complete();
			};
			reader.onerror = error => {
				observer.error(error);
			};
			reader.readAsDataURL(file);
		});
	}

	upload2(image: File): Observable<string> {
		return this.convertFileToBase64(image).pipe(
			switchMap(base64String => {
				// A base64 kódolt stringet FormData-ban küldjük el
				const formData = new FormData();
				formData.append('image', base64String);

				const params = new HttpParams().set('key', this.imgbbApiKey);

				return this.http.post<any>("https://api.imgbb.com/1/upload", formData, { params });
			}),
			map(response => {
				if (response && response.data && response.data.url) {
					return response.data.url;
				} else {
					throw new Error('Invalid response from imgbb');
				}
			}),
			catchError(error => {
				return throwError(() => new Error(error));
			})
		);
	}

}
