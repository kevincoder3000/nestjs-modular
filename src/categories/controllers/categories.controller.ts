import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { CategoriesService } from '../services/categories.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}


  @ApiOperation({ summary: 'List of categories' })
  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getCategories() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Get(':categoryId/products/:productId')
  getProductByCategory(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ): string {
    return this.categoriesService.getCategory(categoryId, productId);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    this.categoriesService.findOne(id);
    return this.categoriesService.update(id, payload);
  }

  @Patch(':id')
  updateMerge(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    const customer = this.categoriesService.findOne(id);
    const newCustomer = { ...customer, ...payload };
    return this.categoriesService.update(id, newCustomer);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
