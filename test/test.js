const {
  runCatching,
  runCatchingAsync,
  SuccessResult,
  ErrorResult
} = require("../dist");

test("runcatching should return a successful result", () => {
  expect(
    runCatching(() => {
      return "hello world";
    })
  ).toEqual(new SuccessResult("hello world"));
});

test("runcatching should return a error result", () => {
  const errResult = new ErrorResult(new Error("Error thrown"));
  expect(
    runCatching(() => {
      throw new Error("Error thrown");
    })
  ).toEqual(errResult);
});

test("runcatchingasync should return a successful result", () => {
  const successResult = new SuccessResult("hello world");
  runCatchingAsync(async () => "hello world").then(result =>
    expect(result).toEqual(successResult)
  );
});

test("runcatchingasync should return a error result", () => {
  const errResult = new ErrorResult(new Error("Error thrown"));
  runCatchingAsync(async () => {
    throw new Error("Error thrown");
  }).then(result => expect(result).toEqual(errResult));
});
