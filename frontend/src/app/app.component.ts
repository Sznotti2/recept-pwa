import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { AuthService } from './features/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NavigationComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
	private authService = inject(AuthService);
	// Egy Subscription aggregátor, amelyhez felveszed az összes előfizetést
	private subscriptions = new Subscription();

	ngOnInit(): void {
		// this.authService.refreshToken();
		const authSubscription = this.authService.autoLogin().subscribe();
		this.subscriptions.add(authSubscription);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
