import { Module } from '@nestjs/common';
import { JournalExtService } from '../services/journal.service';
import { JournalController } from '../controllers/journal-controller';
import { RabbitMqMicroService } from '../services/microService/rabbitmq-server';
@Module({
    imports: [],
    controllers: [JournalController],
    providers: [JournalExtService, RabbitMqMicroService],
    exports: [RabbitMqMicroService],
})
export class JournalModule {}
