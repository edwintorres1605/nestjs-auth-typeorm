import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      relations: ['products'],
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(data);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOneBy({ id: id });
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }

  delete(id: number) {
    return this.categoryRepo.delete(id);
  }

  /* private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    this.counterId = this.counterId + 1;
    const newCategory = {
      id: this.counterId,
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, changes: UpdateCategoryDto) {
    const category = this.findOne(id);
    const index = this.categories.findIndex((item) => item.id === id);
    this.categories[index] = {
      ...category,
      ...changes,
    };
    return this.categories[index];
  }

  remove(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categories.splice(index, 1);
    return true;
  } */
}
