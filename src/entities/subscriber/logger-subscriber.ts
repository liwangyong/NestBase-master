import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { LoggerExtEntity } from '../logger-entity';

@EventSubscriber()
export class LoggerSubscriber
  implements EntitySubscriberInterface<LoggerExtEntity> {
  listenTo() {
    return LoggerExtEntity;
  }

  beforeInsert(event: InsertEvent<LoggerExtEntity>): Promise<LoggerExtEntity> | void | any {
    return event.entity
  }
}
