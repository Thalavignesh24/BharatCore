import { applyDecorators, SetMetadata } from '@nestjs/common';

export const SUCCESS_MESSAGE_KEY = 'customSuccessMessage';
export const SUCCESS_STATUS_CODE_KEY = 'customSuccessStatusCode';

export function SuccessMessage(message: string, statusCode = 200) {
  return applyDecorators(
    SetMetadata(SUCCESS_MESSAGE_KEY, message),
    SetMetadata(SUCCESS_STATUS_CODE_KEY, statusCode),
  );
}
