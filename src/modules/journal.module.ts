import {Module} from '@nestjs/common'
import {JournalExtService} from '../services/journal.service'
import {JournalController} from '../controllers/journal.controller'
import { RabbitMqServer } from '../services/microService/rabbitmq-server'
@Module({
	imports: [],
	controllers: [JournalController],
	providers: [JournalExtService, RabbitMqServer],
})
export class JournalModule {}
