import { Controller, Get } from '@nestjs/common';
import { CategoryService } from '../services/category.services';
import { CategoryDto } from '../dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<CategoryDto[]> {
    return this.categoryService.findAll();
  }
}
