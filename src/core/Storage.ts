import { DefaultPlatform, type Platform } from './Platform';

export interface Storage {
  store(key: string, value: string): void;
  remove(key: string): void;
  value(key: string): string[];
}

export class BrowserStorage implements Storage {
  private readonly platform: Platform;

  constructor(platform: Platform = new DefaultPlatform()) {
    this.platform = platform;
  }

  store(key: string, value: string): void {
    if (this.platform.browser()) {
      localStorage.setItem(key, value);
    }
  }

  remove(key: string): void {
    if (this.platform.browser()) {
      localStorage.removeItem(key);
    }
  }

  value(key: string): string[] {
    if (this.platform.browser()) {
      const value = localStorage.getItem(key);
      if (value) {
        return [value];
      }
    }
    return [];
  }
}

export class MemoryStorage implements Storage {
  private readonly map: Map<string, string>;

  constructor(entries: readonly [string, string][] = []) {
    this.map = new Map<string, string>(entries);
  }

  store(key: string, value: string): void {
    this.map.set(key, value);
  }

  remove(key: string): void {
    this.map.delete(key);
  }

  value(key: string): string[] {
    const value = this.map.get(key);
    if (value) {
      return [value];
    }
    return [];
  }
}
