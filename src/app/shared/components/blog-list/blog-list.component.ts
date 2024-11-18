import { Component, Input } from '@angular/core';
import { Blog } from '../../../core/interfaces/blog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
	@Input() blogs!: Blog[];
}
