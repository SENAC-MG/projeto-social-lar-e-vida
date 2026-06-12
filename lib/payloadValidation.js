const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRequiredString(value, fieldName) {
  if (value == null || value.toString().trim() === "") {
    throw new Error(`Campo "${fieldName}" é obrigatório.`);
  }
  return String(value).trim();
}

export function validateOptionalString(value, fieldName) {
  if (value == null) return undefined;
  const stringValue = String(value).trim();
  return stringValue.length === 0 ? undefined : stringValue;
}

export function validateEmail(value, fieldName = 'email') {
  const normalized = String(value || '').trim().toLowerCase();
  if (!EMAIL_REGEX.test(normalized)) {
    throw new Error(`Campo "${fieldName}" deve ser um e-mail válido.`);
  }
  return normalized;
}

export function validateRequiredDate(value, fieldName) {
  if (value == null || value.toString().trim() === "") {
    throw new Error(`Campo "${fieldName}" é obrigatório.`);
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Campo "${fieldName}" deve ser uma data válida.`);
  }
  return date;
}

export function validateOptionalDate(value, fieldName) {
  if (value == null || String(value).trim() === "") {
    return undefined;
  }
  const date = new Date(String(value).trim());
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Campo "${fieldName}" deve ser uma data válida.`);
  }
  return date;
}

export function validateRequiredNumber(value, fieldName) {
  if (value == null || String(value).trim() === "") {
    throw new Error(`Campo "${fieldName}" é obrigatório.`);
  }
  const number = Number(String(value).trim());
  if (Number.isNaN(number)) {
    throw new Error(`Campo "${fieldName}" deve ser um número válido.`);
  }
  return number;
}

export function validateOptionalNumber(value, fieldName) {
  if (value == null || String(value).trim() === "") {
    return undefined;
  }
  const number = Number(String(value).trim());
  if (Number.isNaN(number)) {
    throw new Error(`Campo "${fieldName}" deve ser um número válido.`);
  }
  return number;
}

export function validateEnum(value, validValues, fieldName) {
  const normalized = String(value || '').trim();
  if (!validValues.includes(normalized)) {
    throw new Error(`Campo "${fieldName}" deve ser um dos valores: ${validValues.join(', ')}.`);
  }
  return normalized;
}
