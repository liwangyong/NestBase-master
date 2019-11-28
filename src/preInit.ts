import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export class PreInit {
  /**
   * 描述 生成swagger
   * @param {any} app:Nest实列
   * @returns {any} swagger
   */
  generatorSwagger(app: INestApplication) {
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
