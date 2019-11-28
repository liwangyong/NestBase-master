import { Module } from '@nestjs/common';
import { LoginController } from '../controllers/login-controller'
@Module({
    imports: [],
    controllers: [LoginController],
    providers: [],
    exports: [],
})
export class LoginModule {}
