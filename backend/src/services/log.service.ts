import {
  LogRepository,
  type FindLogsQuery,
} from "../repositories/log.repositories.js";
import {toLogDto} from "../dto/log.dto.js";
export class LogService {
  private logRepository = new LogRepository();

  async getLogs(query: FindLogsQuery) {
    const logs = await this.logRepository.findMany(query);
    return logs.map(toLogDto);
  }

  async getLogbyId(appId: string, Id: string) {
    const log = await this.logRepository.findById(appId, Id);

    if (!log){
        return null;
    }
    return toLogDto(log);
  }
}