import { Component, Input } from '@angular/core';
import { Blog } from '../interfaces/blog';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [DatePipe, AsyncPipe, RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  @Input() blogs$!: Observable<Blog[]>;
}
