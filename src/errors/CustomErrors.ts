export class CustomError extends Error {
  public readonly statusCode: number;
  public readonly timestamp: string;

  constructor(message: string, statusCode: number, path: string | null = null) {
    super(message);
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
}
