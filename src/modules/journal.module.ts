import {Module} from '@nestjs/common'
import {JournalExtService} from '../services/journal.service'
import {JournalController} from '../controllers/journal.controller'
@Module({
	imports: [],
	controllers: [JournalController],
	providers: [JournalExtService],
})
export class JournalModule {}
