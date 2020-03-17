import { SuccessResult, ErrorResult } from "./result";

export function asSuccess(data: any) {
  return new SuccessResult(data);
}

export function asError(error: any) {
  return new ErrorResult(error);
}
