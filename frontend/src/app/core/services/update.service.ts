import { inject, Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
	providedIn: 'root'
})
export class UpdateService {

	swUpdate = inject(SwUpdate);

	constructor() {
		if (this.swUpdate) {
			this.swUpdate.checkForUpdate().then((update: any) => {
				if (update) {
					alert('Update available, reload application!');
					window.location.reload();
				}
			});
		}
	}
}
