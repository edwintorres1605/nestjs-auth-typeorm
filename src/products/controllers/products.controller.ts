import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductsService } from './../services/products.service';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of Products' })
  getAll(
    @Query('limit') limit: number,
    @Query('offset') offset = 5,
    @Query('brand') brand: string,
  ) {
    /* return {
      message: `Lista de productos: limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    }; */
    return this.productsService.findAll();
  }

  @Get('filter')
  getFilter() {
    return `yo soy un filter`;
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    /* return {
      message: `Producto con id ${id}`,
    }; */
    return this.productsService.findOne(id);
  }

  /*   @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  } */
}
