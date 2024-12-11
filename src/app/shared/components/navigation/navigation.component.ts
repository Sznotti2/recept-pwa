import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-navigation',
	standalone: true,
	imports: [RouterLink, RouterLinkActive, NgClass],
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
	authService = inject(AuthService);
	isOpen = false;

	ngOnInit(): void {
		this.authService.user$.subscribe(user => {
			if (user) {
				this.authService.currentUserSignal.set({
					name: user.displayName!,
					email: user.email!,
				});
			} else {
				this.authService.currentUserSignal.set(null);
			}
			// console.log("current user:")
			// console.log(this.authService.currentUserSignal()); //! törölj
		})
	}

	logout() {
		this.authService.logout();
	}

	toggleDropdown() {
		this.isOpen = !this.isOpen;
	}
}
