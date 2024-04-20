import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SkillService } from '../skill/skill.service';
import { UserService } from '../user/user.service';
import { CvService } from '../cv/cv.service';
import { Skill } from '../skill/entities/skill.entity';
import { User } from '../user/entities/user.entity';
import { Cv } from '../cv/entities/cv.entity';

import {
  randEmail,
  randFilePath,
  randFirstName,
  randJobTitle,
  randLastName,
  randNumber,
  randPassword,
  randSkill,
  randUserName,
} from '@ngneat/falso';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  // app logic = seed de base de données
  const skillService = app.get(SkillService);
  const userService = app.get(UserService);
  const cvService = app.get(CvService);

  const skills = [];
  for (let j = 0; j < 10; j++) {
    const skill = new Skill();
    skill.designation = randSkill();
    await skillService.addSkill(skill);
    skills.push(skill);
  }

  for (let i = 0; i < 10; i++) {
    const user = new User();
    user.email = randEmail();
    user.username = randUserName();
    user.password = randPassword();
    const userEntity = await userService.register(user) as User;
    await userService.addUser(userEntity);

    const cv = new Cv();
    cv.firstname = randFirstName();
    cv.name = randLastName();
    cv.job = randJobTitle();
    cv.age = i + 18;
    cv.path = randFilePath();
    cv.cin = randNumber().toString();
    cv.user = userEntity as User;
    cv.skills = [skills[i], skills[i + 1], skills[i + 2]];
    await cvService.addCv(cv);
  }

  await app.close();
}
bootstrap();
