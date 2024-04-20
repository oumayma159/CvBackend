import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleEnum } from '../enums/role.enum';
// for pagination
import { PaginateQuery, paginate } from 'nestjs-paginate'


@Injectable()
export class CvService {

  constructor(
    @InjectRepository(Cv)
    private cvRepo: Repository<Cv>)
  {
  }

  async create(createCvDto: CreateCvDto) {
    const cv = this.cvRepo.create(createCvDto);
    return await this.cvRepo.save(cv);
  }

  async findAll(age: number,chaine: string) {
    return await this.cvRepo.createQueryBuilder()
    .where('cv.name LIKE :search OR cv.firstname LIKE :search OR cv.job LIKE :search', { search: `%${chaine}%` })
    .orWhere('cv.age = :age', { age })
    .getMany()
  }

  async GetAll(user): Promise<Cv[]> {
    if (user.role === UserRoleEnum.ADMIN)
      return await this.cvRepo.find();
    return await this.cvRepo.findBy({user});
  }

  async Get(): Promise<Cv[]> {
    return await this.cvRepo.find();
  }

  async findAllPaginated(query: PaginateQuery) {
    return await paginate(query, this.cvRepo, {
      defaultSortBy: [['id', 'DESC']],
      select: ['id', 'name', 'firstname', 'age', 'cin', 'job'],
      sortableColumns: ['id']
    })
  }

  async findOne(id: number) {
    const cv = await this.cvRepo.findOneBy({id});
    return cv ;
  }

  findOneByIdAndUserId(id: number, userId: number): Promise<Cv> {
    return this.cvRepo.findOneOrFail({
      where: { id, user: { id: userId } },
    });
  }

  async update(id: number, updateCvDto: UpdateCvDto)  {
    return await this.cvRepo.update(id,updateCvDto);
  }

  async remove(id: number) {
    return await this.cvRepo.delete(id);
  }

  async addCv(cv: Cv) {
    return await this.cvRepo.save(cv);
  }
}
