import { Response, NextFunction } from "express";

import Result from "./result";
import { asSuccess, asError } from "./utils";
import {
  Function,
  AsyncFunction,
  MiddlewareFunction,
  AsyncMiddlewareFunction
} from "./types";

export function runCatching<T>(execute: Function): Result<T> {
  try {
    const result = execute();
    return asSuccess(result);
  } catch (error) {
    return asError(error);
  }
}

export async function runCatchingAsync<T>(
  execute: AsyncFunction
): Promise<Result<T>> {
  try {
    const result = await execute();
    return asSuccess(result);
  } catch (error) {
    return asError(error);
  }
}

export function runCatchingExpress(execute: Function): MiddlewareFunction {
  return (req: any, res: Response, next: NextFunction) => {
    return runCatching(execute);
  };
}

export function runCatchingExpressAsync(
  execute: AsyncFunction
): AsyncMiddlewareFunction {
  return async (req: any, res: Response, next: NextFunction) => {
    return await runCatchingAsync(execute);
  };
}
