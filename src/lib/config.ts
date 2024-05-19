// loadConfig.ts
import fs from "fs";
import path from "path";
import { Config, defaultConfig } from "../types/config";

export function loadConfig(): Config {
  const configPath = path.resolve(__dirname, "config.json");
  if (fs.existsSync(configPath)) {
    const configFile = fs.readFileSync(configPath, "utf-8");
    const userConfig: Partial<Config> = JSON.parse(configFile);
    return {
      workingHours: {
        ...defaultConfig.workingHours,
        ...userConfig.workingHours,
      },
      googleCalendarIntegration:
        userConfig.googleCalendarIntegration ??
        defaultConfig.googleCalendarIntegration,
    };
  } else {
    return defaultConfig;
  }
}
