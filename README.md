[![Build Status](https://travis-ci.com/varun508/runcatching.svg?branch=master)](https://travis-ci.com/varun508/runcatching)
# runcatching

A Node.js module that runs the code in try-catch block and wraps the result in Either ErrorResult or SuccessResult

## Installation

```sh
npm install runcatching --save
yarn add runcatching
bower install runcatching --save
```

## Usage

### Javascript

```javascript
async function login() {
  const result = await AuthService.login(credentials);

  if (result.isFailure()) {
    return next(result.error);
  }
  return result.payload;
}

// AuthService.js
async function login(credentials) {
  return await runCatchingAsync(async () => {
    const loginResponse = await LoginUseCase.loginUser(credentials);
    return loginResponse;
  });
}
```

### TypeScript

```typescript
async function login(): Promise<Result<LoginResponseDTO>> {
  const result = await AuthService.login(credentials);

  if (result.isFailure()) {
    return next(result.error);
  }
  return result.payload;
}

// AuthService.js
async function login(credentials: LoginRequestDTO): Promise<Result<LoginResponseDTO>> {
  return await runCatchingAsync(async () => {
    const loginResponse = await LoginUseCase.loginUser(credentials);
    return loginResponse;
  });
}
```

## Test

```sh
npm run test
```
