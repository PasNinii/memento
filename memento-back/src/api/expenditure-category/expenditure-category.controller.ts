import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpenditureCategoryService } from './expenditure-category.service';
import { CreateExpenditureCategoryDto } from './dto/create-expenditure-category.dto';
import { UpdateExpenditureCategoryDto } from './dto/update-expenditure-category.dto';

@Controller('expenditure-category')
export class ExpenditureCategoryController {
  constructor(
    private readonly expenditureCategoryService: ExpenditureCategoryService,
  ) {}

  @Post()
  create(@Body() createExpenditureCategoryDto: CreateExpenditureCategoryDto) {
    return this.expenditureCategoryService.create(createExpenditureCategoryDto);
  }

  @Get()
  findAll() {
    return this.expenditureCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenditureCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpenditureCategoryDto: UpdateExpenditureCategoryDto,
  ) {
    return this.expenditureCategoryService.update(
      +id,
      updateExpenditureCategoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenditureCategoryService.remove(+id);
  }
}
