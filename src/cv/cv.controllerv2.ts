import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Request,
  } from '@nestjs/common';
  import { CvService } from './cv.service';
  import { CreateCvDto } from './dto/create-cv.dto';
  import { UpdateCvDto } from './dto/update-cv.dto';
  
  @Controller('v2/cv')
  export class CvsControllerV2 {
    constructor(private readonly CvService: CvService) {}
  
    @Post()
    async create(@Body() createCvDto: CreateCvDto, @Request() req) {
      const updatedCreateCvDto = { ...createCvDto, userId: req.user.userId };
      return this.CvService.create(updatedCreateCvDto);
    }
  
    
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const cv = await this.CvService.findOne(+id);
      if (!cv) {
        throw new NotFoundException(`Le CV #${id} n'a pas été trouvé.`);
      }
      return cv;
    }
  
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateCvDto: UpdateCvDto,
      @Request() req,
    ) {
      try {
        const cv = await this.CvService.findOneByIdAndUserId(
          +id,
          req?.user?.userId,
        );
        return this.CvService.update(cv.id, updateCvDto);
      } catch (error) {
        throw new ForbiddenException(
          `Le CV #${id} n'a pas été trouvé ou vous n'avez pas le droit de le modifier`,
        );
      }
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string, @Request() req) {
      try {
        const cv = await this.CvService.findOneByIdAndUserId(
          +id,
          req?.user?.userId,
        );
        return this.CvService.remove(cv.id);
      } catch (error) {
        throw new ForbiddenException(
          `Le CV #${id} n'a pas été trouvé ou vous n'avez pas le droit de le supprimer`,
        );
      }
    }
  }