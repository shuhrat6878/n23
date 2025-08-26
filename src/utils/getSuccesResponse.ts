import { Iresponse } from 'src/interfaces/succes-response';

export const getSuccessRes = (
  data: object,
  statusCode: number = 200,
): Iresponse => {
  return {
    statusCode,
    message: 'success',
    data,
  };
};
