import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { Category,  } from './../entities/category.entities';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    {
      id: 1,
      man: 'Toyota',
      woman: '4x4',
      child: 'google.com',
      sport: 'red',
      news: '',
    },
    {
      id: 2,
      man: 'Toyota',
      woman: '4x4',
      child: 'google.com',
      sport: 'red',
      news: '',
    },
  ];
  getCategory(categoryId: string, productId: string): string {
    return `categories:${categoryId}, ${productId}`;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    const newCategory = {
      id: this.categories.length + 1,
      ...payload,
    };

    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const newCategory = {
      id,
      ...payload,
    } as Category;

    const newCategories = this.categories.map((item: Category) => {
      return item.id === id ? newCategory : item;
    });

    this.categories = newCategories;
    return newCategory;
  }

  remove(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Category #${id} not found`);
    return this.categories.splice(index, 1);
  }
}
