import { Module, HttpModule, Global } from '@nestjs/common';
import { HttpsService } from '../services/http-service'
@Global()
@Module({
  imports: [HttpModule.register({
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5000,
  })],
  providers: [HttpsService],
  exports: [HttpsService],
})
export class HttpsModule {}