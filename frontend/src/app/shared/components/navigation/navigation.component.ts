import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-navigation',
	standalone: true,
	imports: [RouterLink, NgClass],
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
	authService = inject(AuthService);
	isOpen = false;

	ngOnInit(): void {

	}

	logout() {
		
	}

	toggleDropdown() {
		this.isOpen = !this.isOpen;
	}
}
