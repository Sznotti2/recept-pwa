import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { catchError, map, Observable, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
	const authService = inject(AuthService);
	const router = inject(Router);
	
	return authService.user$.pipe(
		map(user => {
			if (user) {
				return true; // User is authenticated
			} else {
				router.navigate(['/']);
				return false; // User is not authenticated
			}
		}
		),
		catchError(error => {
			console.error('Error checking authentication:', error);
			return of(false); // In case of error, deny access
		})
	);
};
