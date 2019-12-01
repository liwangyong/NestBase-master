import { INestApplication } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { logger } from './config/logger'
import * as compression from 'compression';
import * as log4js from 'log4js'
export class PreInit {
  /**
   * 描述 生成swagger 等中间件
   * @param {Nest} app:Nest实列
   */
  generatorMiddle(app: INestApplication) {
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }))
    log4js.configure(logger)
    app.use(log4js.connectLogger(log4js.getLogger('info'), {
      format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]',
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
