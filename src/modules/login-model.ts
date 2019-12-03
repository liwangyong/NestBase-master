import { Module } from '@nestjs/common';
import { LoginController } from '../controllers/login-controller'
import { LoginService } from '../services/login-service'
@Module({
    imports: [],
    controllers: [LoginController],
    providers: [LoginService],
    exports: [],
})
export class LoginModule {}
