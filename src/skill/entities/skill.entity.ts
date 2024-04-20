import { Cv } from '../../cv/entities/cv.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  designation: string;

  @ManyToMany(()=>Cv, cv =>cv.skills)
  cvs: Cv[];

}