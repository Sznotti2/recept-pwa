import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'sentenceCorrector',
	standalone: true
})
export class SentenceCorrectorPipe implements PipeTransform {

	transform(value: unknown, ...args: unknown[]): unknown {
		if (typeof value !== 'string') {
			return value;
		}

		// Split sentences by common sentence delimiters
		const sentences = value.split(/(?<=[.!?])\s+/);

		// Capitalize the first letter of each sentence
		const correctedSentences = sentences.map(sentence => {
			return sentence.charAt(0).toUpperCase() + sentence.slice(1);
		});

		// Join the sentences back together
		return correctedSentences.join(' ');
	}

}
