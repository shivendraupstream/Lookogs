import {
  LogRepository,
  type FindLogsQuery,
} from "../repositories/log.repositories.js";

export class LogService {
  private logRepository = new LogRepository();

  async getLogs(query: FindLogsQuery) {
    return this.logRepository.findMany(query);
  }
}