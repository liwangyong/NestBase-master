import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class JournalValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    value['pageIndex'] = Number(value['pageIndex']) || null
    value['pageSize'] = Number(value['pageSize']) || null
    const object = plainToClass(metatype, value);
    const err = await validate(object)
    if (err.length) {
      throw new BadRequestException('类型错误');
    }
    return value;
  }
}
