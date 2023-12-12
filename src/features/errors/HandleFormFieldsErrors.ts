import { FieldError } from 'react-hook-form';
import { IApiError } from '~/shared/errors';

type IhandleFormFieldsErrors = (
  error: IApiError,
  fields: Array<string>,
  setError: (key: string, error: FieldError) => void
) => void;

export const handleFormFieldsErrors: IhandleFormFieldsErrors = (
  error,
  fields,
  setError
) => {
  if (error.detail) {
    Object.entries(error.detail).forEach((entry) => {
      const [key, value] = entry;
      if (fields.some((field) => field === key)) {
        setError(key, {
          type: 'server',
          message: value.join(' '),
        });
      }
    });
  }
  // return { key: 'none', error: { type: 'server' } };
};
