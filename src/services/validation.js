const NAME_RE = /^[A-Za-z][A-Za-z .'-]{1,59}$/;
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
export const isValidEmail = value => value.length <= 254 && EMAIL_RE.test(value.trim());
export function validateName(value) {
  const name = value.trim();
  if (!name) return 'Please enter your full name.';
  if (!NAME_RE.test(name)) return 'Use letters only (2 to 60 characters).';
  if (name.split(' ').filter(Boolean).length < 2) return 'Please enter your first and last name.';
  return '';
}
export function validateEmailField(value) {
  if (!value.trim()) return 'Please enter your email address.';
  if (!isValidEmail(value)) return 'Please enter a valid email, e.g. name@example.com.';
  return '';
}
export const PASSWORD_RULES = [{
  key: 'length',
  label: 'At least 8 characters',
  test: p => p.length >= 8 && p.length <= 128
}, {
  key: 'upper',
  label: 'One uppercase letter',
  test: p => /[A-Z]/.test(p)
}, {
  key: 'lower',
  label: 'One lowercase letter',
  test: p => /[a-z]/.test(p)
}, {
  key: 'digit',
  label: 'One number',
  test: p => /\d/.test(p)
}];
export const passwordIsStrong = password => PASSWORD_RULES.every(rule => rule.test(password));
export function validateNewPassword(password) {
  if (!password) return 'Please create a password.';
  if (!passwordIsStrong(password)) return 'Password does not meet all the requirements.';
  return '';
}
export function validateSignIn({
  email,
  password
}) {
  const errors = {};
  const emailError = validateEmailField(email);
  if (emailError) errors.email = emailError;
  if (!password) errors.password = 'Please enter your password.';else if (password.length > 128) errors.password = 'Password is too long.';
  return errors;
}
export function validateSignUp({
  name,
  email,
  password,
  confirm
}) {
  const errors = {};
  const nameError = validateName(name);
  if (nameError) errors.name = nameError;
  const emailError = validateEmailField(email);
  if (emailError) errors.email = emailError;
  const passwordError = validateNewPassword(password);
  if (passwordError) errors.password = passwordError;
  if (!confirm) errors.confirm = 'Please confirm your password.';else if (confirm !== password) errors.confirm = 'Passwords do not match.';
  return errors;
}
