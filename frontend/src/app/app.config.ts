import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptor';


export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes), 
		provideServiceWorker('ngsw-worker.js', {
			enabled: !isDevMode(),
			registrationStrategy: 'registerWhenStable:30000'
		}), 
		provideAnimationsAsync(),
		provideHttpClient(
			withFetch(),
			withInterceptorsFromDi()
		),
		{ 
			provide: HTTP_INTERCEPTORS, 
			useClass: TokenInterceptor, 
			multi: true 
		},

	],
};
