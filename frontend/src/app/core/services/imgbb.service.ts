import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ImgbbService {
	http = inject(HttpClient);

	private imgbbApiKey = 'cb3b7fec7215b3181f55cd79b56f426c';

	upload(file: File): Observable<string> {
		const formData = new FormData();
		formData.append('image', file);

		return this.http.post<any>("/upload", formData, { params: { key: this.imgbbApiKey } })
			.pipe(map(response => response.data.url));
/*
		return this.http.post<{ data: { url: string } }>(`https://api.imgbb.com/1/upload?key=${this.imgbbApiKey}`, formData)
			.pipe(map(response => response
				.data.url));
*/
	}
}
