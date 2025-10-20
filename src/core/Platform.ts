export interface Platform {
  browser(): boolean;
  server(): boolean;
}

export class DefaultPlatform implements Platform {
  browser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  server(): boolean {
    return !this.browser();
  }
}

export class FakePlatform implements Platform {
  private readonly front: boolean;
  private readonly back: boolean;

  constructor(browser: boolean, server: boolean) {
    this.front = browser;
    this.back = server;
  }

  browser(): boolean {
    return this.front;
  }

  server(): boolean {
    return this.back;
  }
}
