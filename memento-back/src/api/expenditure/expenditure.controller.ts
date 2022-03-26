import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
  Req,
} from '@nestjs/common';
import { ExpenditureService } from './expenditure.service';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../auth/permission.guard';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: { sub: string };
}

@Controller('expenditure')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ExpenditureController {
  private readonly logger = new Logger(ExpenditureController.name);

  constructor(private readonly expenditureService: ExpenditureService) {}

  @Post()
  create(
    @Req() request: RequestWithUser,
    @Body() createExpenditureDto: CreateExpenditureDto,
  ) {
    return this.expenditureService.create(
      request.user.sub,
      createExpenditureDto,
    );
  }

  @Get()
  findAll(@Req() request: RequestWithUser) {
    return this.expenditureService.findAll(request.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenditureService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpenditureDto: UpdateExpenditureDto,
  ) {
    return this.expenditureService.update(+id, updateExpenditureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenditureService.remove(+id);
  }
}
