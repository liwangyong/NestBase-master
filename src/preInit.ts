import { INestApplication } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
export class PreInit {
  /**
   * 描述 生成swagger
   * @param {any} app:Nest实列
   * @returns {any} swagger
   */
  generatorMiddle(app: INestApplication) {
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }))
    app.use(helmet())
    app.enableCors()
    app.use(compression());
    const swaggerOptions = new DocumentBuilder()
      .setTitle('nestjs')
      .setDescription('The logger API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('swagger', app, swaggerDoc);
  }
}
