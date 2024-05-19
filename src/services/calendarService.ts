import { CalendarConfig, CalendarEvent } from "../types";
import { Web5 } from "@web5/api";

export type CalendarStorage = {
  getEvents(): Promise<CalendarEvent[]>;
  storeEvent(event: CalendarEvent): Promise<string>;
  updateEvent(event: CalendarEvent): Promise<void>;
  deleteEvent(id: string): Promise<void>;
  getConfig(): Promise<CalendarConfig>;
  setConfig(config: CalendarConfig): Promise<void>;
};

class CalendarService {
  private storage: CalendarStorage;

  constructor(storage: CalendarStorage) {
    this.storage = storage;
  }

  public async getCalendarEvents(): Promise<CalendarEvent[]> {
    return this.storage.getEvents();
  }

  public async createCalendarEvent(event: CalendarEvent): Promise<string> {
    return this.storage.storeEvent(event);
  }

  public async updateCalendarEvent(event: CalendarEvent): Promise<void> {
    return this.storage.updateEvent(event);
  }

  public async deleteCalendarEvent(id: string): Promise<void> {
    return this.storage.deleteEvent(id);
  }

  public async syncCalendarEvents(): Promise<void> {
    // Additional logic for syncing with external calendars could go here
  }

  public async getCalendarConfig(): Promise<CalendarConfig> {
    return this.storage.getConfig();
  }

  public async setCalendarConfig(config: CalendarConfig): Promise<void> {
    return this.storage.setConfig(config);
  }
}

class DWNCalendarStorage implements CalendarStorage {
  private web5: Web5;

  constructor(web5: Web5) {
    this.web5 = web5;
  }

  public async getEvents(): Promise<CalendarEvent[]> {
    const records = await this.web5.dwn.records.query({
      message: {
        filter: {
          protocol: "calendarProtocol",
          protocolPath: "event",
          dataFormat: "application/json",
          schema: "eventSchema",
        },
      },
    });
    const ret = records.records?.map((record: any) => record.data.json());
    return ret as CalendarEvent[];
  }

  public async storeEvent(event: CalendarEvent): Promise<string> {
    const payload = JSON.stringify(event);
    const response = await this.web5.dwn.records.create({
      store: true,
      data: payload,
      message: {
        dataFormat: "application/json",
        schema: "eventSchema",
        protocol: "calendarProtocol",
        protocolPath: "event",
      },
    });
    if (response.status.code !== 202) {
      throw new Error("Failed to store event");
    }
    return response.record!.id;
  }

  public async updateEvent(event: CalendarEvent): Promise<void> {
    let { record } = await this.web5.dwn.records.read({
      message: {
        filter: {
          recordId: event.id,
        },
      },
    });
    if (!record) {
      throw new Error(`Event with id ${event.id} not found`);
    }
    const updateStatus = await record.update({ data: JSON.stringify(event) });
    if (updateStatus.status.code !== 202) {
      throw new Error("Failed to update event");
    }
  }

  public async deleteEvent(id: string): Promise<void> {
    const deleteResult = await this.web5.dwn.records.delete({
      message: {
        recordId: id,
      },
    });
    if (deleteResult.status.code !== 202) {
      throw new Error("Failed to delete event");
    }
  }

  public async getConfig(): Promise<CalendarConfig> {
    throw new Error("Method not implemented.");
  }

  public async setConfig(config: CalendarConfig): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { CalendarService, DWNCalendarStorage };
