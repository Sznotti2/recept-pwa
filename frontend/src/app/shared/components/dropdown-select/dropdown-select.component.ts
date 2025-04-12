import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
	selector: 'app-dropdown-select',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './dropdown-select.component.html',
	styleUrl: './dropdown-select.component.scss',
	providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => DropdownSelectComponent)
        }
    ]
})
export class DropdownSelectComponent implements ControlValueAccessor {
	// A komponens bemeneti paraméterei: placeholder szöveg és az opciók listája
	@Input() placeholder: string = 'Select an option';
	@Input() options: string[] = [];

	// A kiválasztott érték változásának jelezése az esetleges szülő komponens felé
	@Output() selectionChange = new EventEmitter<string>();

	selectedOption: string = '';
	isOpen: boolean = false;

	private onChange: (value: string) => void = () => {};
    private onTouched: () => void = () => {};

	constructor(private eRef: ElementRef) { }

	// A dropdown állapotának váltása (nyitás/zárás)
	toggleDropdown(): void {
		this.isOpen = !this.isOpen;
	}

	// Opciok közül egy elem kiválasztása: ha az elem már aktív, visszaállítja a placeholder-t
	onOptionClick(event: Event, option: string): void {
		event.preventDefault();
		if (this.selectedOption === option) {
			this.selectedOption = '';
			this.selectionChange.emit('');
            this.onChange(''); // értesítjük a formot az értékváltozásról
		} else {
			this.selectedOption = option;
			this.selectionChange.emit(option);
            this.onChange(option);
		}
		this.isOpen = false;
        this.onTouched();
	}

	// Dokumentumklikk figyelése: ha a kattintás nem a komponens belsejéből érkezik, lezárja a dropdown-t
	@HostListener('document:click', ['$event'])
	handleClickOutside(event: Event): void {
		if (!this.eRef.nativeElement.contains(event.target)) {
			this.isOpen = false;
		}
	}

	// ControlValueAccessor implementációja:
    writeValue(value: string): void {
        this.selectedOption = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        // Itt kezelheted, ha szükséges a disable állapotot
    }
}
