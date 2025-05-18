import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ThemeSwitcherService {
	private renderer: Renderer2;
	private body: HTMLElement;

	constructor(rendererFactory: RendererFactory2) {
		this.renderer = rendererFactory.createRenderer(null, null);
		this.body = document.body;
	}

	/**
	 * @param theme - 'light' vagy 'dark'
	 * @param color - üres string (nincs szín), 'blue', 'red' vagy 'green'
	 */
	setTheme(theme: 'light' | 'dark', color: string): void {
		// Töröljük az esetlegesen létező téma- és színosztályokat
		const classesToRemove = ['dark', 'blue', 'red', 'green'];
		classesToRemove.forEach(className => {
			if (this.body.classList.contains(className)) {
				this.renderer.removeClass(this.body, className);
			}
		});

		// Ha a sötét téma lett kiválasztva, adjuk hozzá a "dark" osztályt.
		if (theme === 'dark') {
			this.renderer.addClass(this.body, 'dark');
		}

		// Ha van kiválasztott szín, adjuk hozzá a megfelelő osztályt (blue, red vagy green)
		if (color) {
			this.renderer.addClass(this.body, color);
		}
	}
}
