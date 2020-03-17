export default class Result<T> {
  data: T;
  error: any;

  constructor(data: T, error: any) {
    this.data = data;
    this.error = error;
  }

  isFailure(): boolean {
    return this instanceof ErrorResult;
  }

  isSuccessful(): boolean {
    return this instanceof SuccessResult;
  }

  hasContent(): boolean {
    if (this.isFailure()) {
      throw new Error("Cannot call hasContent() on a failed result");
    }
    return (this as SuccessResult<T>).data != null;
  }
}

export class SuccessResult<T> extends Result<T> {
  constructor(data: T) {
    super(data, null);
  }
}

export class ErrorResult extends Result<any> {
  constructor(error: any) {
    super(null, error);
  }
}
