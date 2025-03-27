import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink, NgClass],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent {
	router = inject(Router);
	authService = inject(AuthService);

	registerForm: FormGroup;
	constructor(private formBuilder: FormBuilder) {
		this.registerForm = this.formBuilder.group({
			username: ["", {
				validators: [Validators.required, Validators.minLength(3), Validators.maxLength(32)],
			}],
			email: ["", {
				validators: [Validators.required, Validators.email],
			}],
			password: ["", {
				validators: [Validators.required, Validators.minLength(6), Validators.maxLength(32)],
			}],
			passwordAgain: ["", {
				validators: [Validators.required],
			}],
			terms: [false, {
				validators: [Validators.requiredTrue],
			}]
		});
	}

	errorMessage: string | null = null;
	public register(): void {
		if (this.registerForm.valid) {
			const form = this.registerForm.value;
			this.authService.register(form.username, form.email, form.password, form.passwordAgain)
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

	get username() {
		return this.registerForm.controls["username"];
	}
	get email() {
		return this.registerForm.controls["email"];
	}
	get password() {
		return this.registerForm.controls["password"];
	}
	get passwordAgain() {
		return this.registerForm.controls["passwordAgain"];
	}
	get terms() {
		return this.registerForm.controls["terms"];
	}

	passwordVisible = false;
	inputType = "password";
	revealPassword() {
		this.passwordVisible = !this.passwordVisible;
		this.inputType = this.passwordVisible ? "text" : "password";
	}
}
