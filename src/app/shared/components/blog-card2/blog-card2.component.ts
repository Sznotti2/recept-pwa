import { Component, Input } from '@angular/core';
import { Blog } from '../../../core/interfaces/blog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-card2',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './blog-card2.component.html',
  styleUrl: './blog-card2.component.scss'
})
export class BlogCard2Component {
  @Input() blog!: Blog;

}
