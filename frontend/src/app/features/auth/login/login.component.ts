import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const hasOnlyLowercaseLetters = (control: AbstractControl): ValidationErrors | null => {
	return /[A-Z]/.test(control.value) ? null : { hasOnlyLowercaseLetters: true };
}

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink, NgClass],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	private router = inject(Router);
	private authService = inject(AuthService);

	loginForm: FormGroup;
	constructor(private formBuilder: FormBuilder) {
		this.loginForm = this.formBuilder.group({
			email: ["", { validators: [Validators.required] }],
			password: ["", { validators: [Validators.required] }],
		});
	}

	errorMessage: string | null = null;
	public login(): void {
		if (this.loginForm.valid) {
			const form = this.loginForm.value;
			this.authService.login(form.email, form.password)
				.subscribe({
					next: () => {
						this.router.navigateByUrl("/")
					},
					error: (error) => {
						this.errorMessage = error.error.error;
					}
				});
		} else {
			console.log("Invalid form");
		}
	}

	get email() {
		return this.loginForm.controls["email"];
	}
	get password() {
		return this.loginForm.controls["password"];
	}

	passwordVisible = false;
	inputType = "password";
	revealPassword() {
		this.passwordVisible = !this.passwordVisible;
		this.inputType = this.passwordVisible ? "text" : "password";
	}
}
