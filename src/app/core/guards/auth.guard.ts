import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
	const authService = inject(AuthService);
	return authService.user$.pipe(
		map(user => {
			if (user) {
				return true;
			}
			return false;
		})
	);
};
