export const Validations = {
  required: 'To pole jest wymagane.',
  minLength: (min: number) => ({
    value: min,
    message: `Minimalna ilość znaków: ${min}.`,
  }),
  maxLength: (min: number) => ({
    value: min,
    message: `Maksymalna ilość znaków: ${min}.`,
  }),
  email: {
    value: /\S+@\S+\.\S+/,
    message: 'Niepoprawny adres email.',
  },
};
