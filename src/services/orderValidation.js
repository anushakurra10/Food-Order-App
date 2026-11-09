const REQUIRED_FIELDS = ['name', 'email', 'street', 'postal-code', 'city'];

export function validateOrderCustomer(formData) {
  // Trim text first so whitespace-only values fail required-field validation.
  const customer = Object.fromEntries(
    REQUIRED_FIELDS.map((field) => [
      field,
      String(formData.get(field) || '').trim(),
    ]),
  );

  if (REQUIRED_FIELDS.some((field) => !customer[field])) {
    return {
      customer,
      error: 'Please complete every field with a valid value.',
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    return { customer, error: 'Please enter a valid email address.' };
  }

  return { customer, error: null };
}
