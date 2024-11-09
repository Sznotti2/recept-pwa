import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
	authService = inject(AuthService);

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
			console.log(this.authService.currentUserSignal())
		})
	}

	logout() {
		
	}
}
