import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [
    {
      id: 1,
      name: 'test_category_1',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium autem est nesciunt repellendus pariatur officia quisquam eligendi eius in quibusdam?',
    },
    {
      id: 2,
      name: 'test_category_2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quisquam.',
    },
    {
      id: 3,
      name: 'test_category_3',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ex dolor quod blanditiis, fuga nostrum, dolore ipsum exercitationem itaque sequi natus corporis vel quis. Dolor praesentium obcaecati consectetur iusto libero.',
    },
  ];
  constructor() {}
  ngOnInit(): void {}
}
