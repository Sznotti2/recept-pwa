import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

@Component({
	selector: 'app-navigation',
	standalone: true,
	imports: [RouterLink, RouterLinkActive, NgClass, AsyncPipe, CommonModule, ThemeSwitcherComponent],
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
	authService = inject(AuthService);
	isOpen = false;

	ngOnInit(): void {
	}

	logout() {
		this.authService.logout().subscribe(() => {
			console.log("logged out");
		});
	}

	toggleDropdown() {
		this.isOpen = !this.isOpen;
	}
}
