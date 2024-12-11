import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	authService.user$.subscribe(user => {
		if (user) {
			return true;
		}
		return false;
	});
	return false;
};
