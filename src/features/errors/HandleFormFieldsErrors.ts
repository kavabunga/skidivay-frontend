import { FieldError } from 'react-hook-form';
import { IApiError } from '~/shared/errors';

export const handleFormFieldsErrors = (
  error: IApiError,
  fields: Array<string>,
  setError: (name: string, error: FieldError) => void
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
};
