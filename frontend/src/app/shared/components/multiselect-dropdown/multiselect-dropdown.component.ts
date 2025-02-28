import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

interface Item {
	value: string;
	category: string;
}

@Component({
	selector: 'app-multiselect-dropdown',
	standalone: true,
	imports: [NgClass, ReactiveFormsModule],
	templateUrl: './multiselect-dropdown.component.html',
	styleUrl: './multiselect-dropdown.component.scss'
})
export class MultiselectDropdownComponent implements OnInit, OnDestroy {

	@Input() items: Item[] = [];  // A beérkező lista
	isDropdownOpen = false;
	selectedItems: Item[] = [];

	categorySerlectForm: FormGroup;

	private subscription!: Subscription;
	constructor(private elementRef: ElementRef, private formBuilder: FormBuilder) {
		this.categorySerlectForm = this.formBuilder.group({});
	}
	ngOnInit(): void {
		// this.subscription = this.categorySerlectForm.valueChanges.subscribe(() => {
		// 	console.log(this.categorySerlectForm.value);
		// });
		// ezt muszály az onInit-ben különben nem vesti észre a létrehozott elemeket
		this.items.forEach(item => {
			this.categorySerlectForm.addControl(item.value, this.formBuilder.control(false));	// 200iq
		});

		this.subscription = this.categorySerlectForm.valueChanges.subscribe((value) => {
			console.log(value);
		});
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}


	get categories(): string[] {
		// Egyedi kategóriák visszaadása
		return [...new Set(this.items.map(item => item.category))];
	}

	getItemsByCategory(category: string): Item[] {
		// A kategóriához tartozó elemek szűrése
		return this.items.filter(item => item.category === category);
	}

	toggleDropdown() {
		this.isDropdownOpen = !this.isDropdownOpen;
	}

	@HostListener('document:click', ['$event']) // Figyeljük a kattintást a dokumentumon
	clickOutside(event: Event) {
		// Ha a kattintás nem a komponensen belül történt, zárjuk be a dropdown-t
		if (!this.elementRef.nativeElement.contains(event.target)) {
			this.isDropdownOpen = false;
		}
	}

	isSelected(item: Item): boolean {
		// Ellenőrizzük, hogy egy elem ki van-e választva
		return this.selectedItems.some(selected => selected.value === item.value);
	}

	onItemSelect(item: Item) {
		// Elem kiválasztása vagy eltávolítása
		if (this.isSelected(item)) {
			this.selectedItems = this.selectedItems.filter(selected => selected.value !== item.value);
		} else {
			this.selectedItems.push(item);
		}
	}

	removeItem(item: Item) {
		// Kiválasztott elem eltávolítása
		this.selectedItems = this.selectedItems.filter(selected => selected.value !== item.value);
	}
}
