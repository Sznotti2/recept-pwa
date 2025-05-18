import { Component, HostListener, inject } from '@angular/core';
import { ThemeSwitcherService } from './theme-switcher.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-theme-switcher',
	standalone: true,
	imports: [FormsModule, CommonModule],
	templateUrl: './theme-switcher.component.html',
	styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent {
	themeService = inject(ThemeSwitcherService);

	isOpen = false;
	selectedTheme: 'light' | 'dark' = 'light';
	selectedColor = '';

	constructor() {
		// Alkalmazzuk az alapértelmezett témát indításkor.
		this.themeService.setTheme(this.selectedTheme, this.selectedColor);
	}

	// Toggle a lenyíló menü megjelenítését
	toggleMenu(): void {
		this.isOpen = !this.isOpen;
	}

	// A rádiógombok változása esetén frissítjük a témát
	onThemeChange(theme: 'light' | 'dark'): void {
		this.selectedTheme = theme;
		this.applyTheme();
	}

	// A színválasztás – bár checkbox‑okat használunk vizuálisan, a megoldás egyszínű (vagy semmi)
	onColorChange(color: string, event: Event): void {
		const input = event.target as HTMLInputElement;
		// Ha a checkbox be van pipálva, azt a színt választjuk; ha kikapcsolódik, akkor töröljük a színválasztást.
		if (input.checked) {
			this.selectedColor = color;
		} else {
			this.selectedColor = '';
		}
		this.applyTheme();
	}

	// Meghívja a service‑t, hogy alkalmazza az aktuális beállításokat az oldalra.
	applyTheme(): void {
		this.themeService.setTheme(this.selectedTheme, this.selectedColor);
	}

	// Ha nem a komponens elemeire kattintunk, akkor bezárjuk a lenyíló menüt.
	@HostListener('document:click', ['$event'])
	onClickOutside(event: MouseEvent): void {
		const target = event.target as HTMLElement;
		if (!target.closest('.theme-switcher')) {
			this.isOpen = false;
		}
	}
}
