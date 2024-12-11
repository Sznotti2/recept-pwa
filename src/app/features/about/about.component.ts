import { Component } from '@angular/core';
import { SentenceCorrectorPipe } from '../../shared/pipes/sentence-corrector.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SentenceCorrectorPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  public aboutText: string[] = [
    'this is a sentence. this is another sentence. this is a third sentence.',
    "I'm a paragraph. i'm another paragraph. i'm a third paragraph.",
    "for the past 15 years, i've worked as a Product Designer designing and building a wide range of digital products. I believe that good design should be both functional and aesthetically pleasing, and strive to create intuitive and engaging user experiences.",
    "during my career, i've had the pleasure of working with a variety of clients in fields such as Editorial, Healthcare, Banking, Sports, Public Administration, E-commerce, and Information Technology.",
    "Some of my notable clients include Scuderia Ferrari F1, Enel Energia, ING Direct, and HCL Software. Most recently, I served as a Senior Product Designer at the Italian Department for Digital Transformation, where I managed complex ecosystems of user interfaces and front-end libraries for key government initiatives.",
    "In addition to my work as a designer, I co-founded Robodomain, a SaaS company focused on domain management tools. Our software was acquired by DNSimple in 2013, which was a valuable learning experience.",
    "From time to time, I write and speak about design methodologies, workflow, and tools at conferences and events. I am also a lecturer at UXUniversity, where I conduct a full-day workshop on Design Systems and Atomic Design.",
    "If you're interested in learning more about my work, feel free to connect with me or check out my work page."
  ];
}
