// loadConfig.ts
import fs from "fs";
import path from "path";
import { Config } from "../types";
import { defaultConfig } from "../defaultConfig";

export function loadConfig(): Config {
  const configPath = path.resolve(__dirname, "config.json");
  if (fs.existsSync(configPath)) {
    const configFile = fs.readFileSync(configPath, "utf-8");
    const userConfig: Partial<Config> = JSON.parse(configFile);
    return {
      calendar: {
        workingHours: {
          ...defaultConfig?.calendar?.workingHours,
          ...userConfig.calendar?.workingHours,
        },
        googleCalendarIntegration:
          userConfig.calendar?.googleCalendarIntegration ??
          defaultConfig.calendar.googleCalendarIntegration,
      },
    };
  } else {
    return defaultConfig;
  }
}
