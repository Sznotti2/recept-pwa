import { Component } from '@angular/core';
import { MultiselectDropdownComponent } from '../../shared/components/multiselect-dropdown/multiselect-dropdown.component';

interface Item {
	value: string;
	category: string;
}

@Component({
	selector: 'app-search',
	standalone: true,
	imports: [MultiselectDropdownComponent],
	templateUrl: './search.component.html',
	styleUrl: './search.component.scss'
})
export class SearchComponent {

	itemList : Item[] = [];

	constructor() {
		this.itemList = [
			{ value: 'Apple', category: 'Fruits' },
			{ value: 'Banana', category: 'Fruits' },
			{ value: 'Carrot', category: 'Vegetables' },
			{ value: 'Broccoli', category: 'Vegetables' }
		];
	}
}
