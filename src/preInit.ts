import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export class PreInit {
  generatorSwagger(app: INestApplication) {
    const swaggerOptions = new DocumentBuilder()
      .setTitle('nestjs')
      .setDescription('The logger API description')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('cats')
      .build();
    const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('swagger', app, swaggerDoc);
  }
}
