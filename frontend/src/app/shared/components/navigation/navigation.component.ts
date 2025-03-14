import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';

@Component({
	selector: 'app-navigation',
	standalone: true,
	imports: [RouterLink, NgClass, AsyncPipe, CommonModule],
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
