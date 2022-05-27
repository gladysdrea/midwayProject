export class ResultRtn<T> {
  public code: number;
  public msg: string;
  public data: T;

  static of<T>(code: number, msg: string, data: T): ResultRtn<T> {
    const result = new ResultRtn<T>();
    result.code = code;
    result.msg = msg;
    result.data = data;
    return result;
  }

  static ofSuccess<T>(data: T): ResultRtn<T> {
    return this.of(200, 'success msg', data);
  }

  static ofError<T>(data: T): ResultRtn<T> {
    return this.of(500, 'error msg', data);
  }
}
