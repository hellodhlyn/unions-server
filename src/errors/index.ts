export class UnionsError extends Error {
  statusCode(): number {
    return 400;
  }
}
