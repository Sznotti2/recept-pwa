import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	// alapértelmezett header-ek, melyek minden kimenő kéréshez hozzá lesznek adva
	private defaultHeaders: { [header: string]: string } = {
		'Content-Type': 'application/json'
	};

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		// ha az imgbb API-ra megy a kérés, ne használjunk withCredentials
		const isImgBBRequest = request.url.includes('https://api.imgbb.com/');

		if (isImgBBRequest) {
			const clonedRequest = request.clone({
				withCredentials: false,
				headers: request.headers.delete('Content-Type')
			});

			return next.handle(clonedRequest);
		} else {
			// ellenőrizzük, hogy van-e már Content-Type header, ha nincs, akkor az alapértelmezettet használjuk
			const contentType = request.headers.has('Content-Type')
				? request.headers.get('Content-Type')
				: this.defaultHeaders['Content-Type'];

			// a lényeg
			const clonedRequest = request.clone({
				withCredentials: true,
				setHeaders: {
					'Content-Type': contentType as string
				}
			});

			return next.handle(clonedRequest);
		}
	}
}
