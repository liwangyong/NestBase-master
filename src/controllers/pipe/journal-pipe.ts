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
    if (!value.data.length) {
      throw new BadRequestException({
        content: {
          property: 'data',
          message: '日志提交不仅一条',
        },
      });
    }
    const object = plainToClass(metatype, value);
    const err = await validate(object)
    if (err) {
      throw new BadRequestException({
        content: {
          property: err[0].property,
          message: Object.values(err[0].constraints).join(','),
        },
      });
    }
    return value;
  }
}
