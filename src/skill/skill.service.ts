import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepo: Repository<Skill>,
  ) {}

  async create(createSkillDto: CreateSkillDto) {
    const skill = this.skillRepo.create(createSkillDto);
    return await this.skillRepo.save(skill);
  }

  async addSkill(skill: Skill) {
    return await this.skillRepo.save(skill);
  }

  async findAll() {
    return await this.skillRepo.find();
  }

  async findOne(id: number) {
    return await this.skillRepo.findOneBy({ id: id });
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    return await this.skillRepo.update(id, updateSkillDto);
  }

  async remove(id: number) {
    return await this.skillRepo.delete(id);
  }
}