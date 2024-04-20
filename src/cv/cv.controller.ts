import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseInterceptors } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CurrentUser } from '../decorator/CurrentUser.decorator';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  create(@Body() createCvDto: CreateCvDto) {
    return this.cvService.create(createCvDto);
  }

  @Get('/filter')
  findAll(
    @Query('age') age:number,
    @Query('chaine') chaine:string,
    ) {
    return this.cvService.findAll(age,chaine);
  }

  @Get()
  GetAll(@CurrentUser() user) {
    return this.cvService.GetAll(user);
  }

  @Get('/pagination')
  public findAllPaginated(@Paginate() query: PaginateQuery) {
    return this.cvService.findAllPaginated(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
    storage : diskStorage({
      destination : "./public/uploads"
    })
  }))
  async uploadFile(@UploadedFile( new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1000000 }),
      new FileTypeValidator({fileType: 'image/jpg'}),
    ]
  })) file: Express.Multer.File) {
    console.log(file) ;
    return "success";
  }

}
