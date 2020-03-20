import { Response, NextFunction } from "express";

import Result from "./result";
import { asSuccess, asError } from "./utils";
import {
  Function,
  AsyncFunction,
  MiddlewareFunction,
  AsyncMiddlewareFunction,
  RunOptions
} from "./types";

export function runCatching<T>(
  execute: Function,
  options: RunOptions = { log: false }
): Result<T> {
  try {
    const result = execute();
    return asSuccess(result);
  } catch (error) {
    if (options.log) console.error(error);
    return asError(error);
  }
}

export async function runCatchingAsync<T>(
  execute: AsyncFunction,
  options: RunOptions = { log: false }
): Promise<Result<T>> {
  try {
    const result = await execute();
    return asSuccess(result);
  } catch (error) {
    if (options.log) console.error(error);
    return asError(error);
  }
}

export function runCatchingExpress(
  execute: Function,
  options: RunOptions = { log: false }
): MiddlewareFunction {
  return (req: any, res: Response, next: NextFunction) => {
    return runCatching(execute, options);
  };
}

export function runCatchingExpressAsync(
  execute: AsyncFunction,
  options: RunOptions = { log: false }
): AsyncMiddlewareFunction {
  return async (req: any, res: Response, next: NextFunction) => {
    return await runCatchingAsync(execute, options);
  };
}
