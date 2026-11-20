export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

export const COMPLAINT_PHOTO_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
export const COMPLAINT_PHOTO_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const FEEDBACK_DOC_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.webp', '.csv'];
export const FEEDBACK_DOC_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'text/csv',
  'application/vnd.ms-excel'
];

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

export function validateUploadFile(
  file: { name: string; size: number; type?: string },
  allowedExtensions: string[],
  allowedMimeTypes: string[]
): FileValidationResult {
  if (file.size <= 0) {
    return { valid: false, error: 'The selected file appears to be empty.' };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return {
      valid: false,
      error: `File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds the 5 MB limit.`
    };
  }

  const lowerName = file.name.toLowerCase();
  const hasAllowedExt = allowedExtensions.some((ext) => lowerName.endsWith(ext));
  const mime = (file.type || '').toLowerCase();
  const hasAllowedMime = mime === '' || allowedMimeTypes.includes(mime);

  if (!hasAllowedExt || !hasAllowedMime) {
    return {
      valid: false,
      error: `Unsupported file format. Accepted types: ${allowedExtensions.join(', ').toUpperCase()}.`
    };
  }

  return { valid: true };
}

export function validateOptionalEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address (or leave this optional field blank).';
  }
  return null;
}

export function validateOptionalPhone(phone: string): string | null {
  const trimmed = phone.trim();
  if (!trimmed) return null;
  const digits = trimmed.replace(/[\s\-()+]/g, '');
  const normalized = digits.startsWith('91') && digits.length === 12 ? digits.slice(2) : digits;
  if (!/^[6-9]\d{9}$/.test(normalized) && !/^\d{8,12}$/.test(digits)) {
    return 'Please enter a valid 10-digit Indian mobile or landline number (or leave blank).';
  }
  return null;
}

export interface ComplaintFormInput {
  category: string;
  title: string;
  description: string;
  locality: string;
  landmark: string;
  name: string;
  contactNumber: string;
  email: string;
}

export type ComplaintFormErrors = Partial<Record<keyof ComplaintFormInput | 'photo', string>>;

export function validateComplaintForm(input: ComplaintFormInput): ComplaintFormErrors {
  const errors: ComplaintFormErrors = {};

  if (!input.category.trim()) {
    errors.category = 'Please choose a civic complaint category.';
  }
  if (!input.title.trim()) {
    errors.title = 'Please enter a short complaint title.';
  } else if (input.title.trim().length < 5) {
    errors.title = 'Complaint title should be at least 5 characters.';
  }
  if (!input.description.trim()) {
    errors.description = 'Please provide a description of the civic issue.';
  } else if (input.description.trim().length < 20) {
    errors.description = 'Please enter at least 20 characters describing the issue and exact spot.';
  }
  if (!input.locality.trim()) {
    errors.locality = 'Please enter the area or locality in Pune (e.g., Kothrud, Hadapsar).';
  }

  const phoneErr = validateOptionalPhone(input.contactNumber);
  if (phoneErr) errors.contactNumber = phoneErr;

  const emailErr = validateOptionalEmail(input.email);
  if (emailErr) errors.email = emailErr;

  return errors;
}

export interface FeedbackFormInput {
  category: string;
  name: string;
  email: string;
  department: string;
  financialYear: string;
  description: string;
  confirmedAccurate: boolean;
}

export type FeedbackFormErrors = Partial<
  Record<keyof FeedbackFormInput | 'attachment', string>
>;

export function validateFeedbackForm(input: FeedbackFormInput): FeedbackFormErrors {
  const errors: FeedbackFormErrors = {};

  if (!input.category.trim()) {
    errors.category = 'Please select a feedback category.';
  }
  const emailErr = validateOptionalEmail(input.email);
  if (emailErr) errors.email = emailErr;

  if (!input.description.trim()) {
    errors.description = 'Please describe your feedback, correction, or broken link.';
  } else if (input.description.trim().length < 20) {
    errors.description = 'Please provide at least 20 characters so the issue is clear.';
  }

  if (!input.confirmedAccurate) {
    errors.confirmedAccurate =
      'Please confirm that the submitted information is accurate to the best of your knowledge.';
  }

  return errors;
}
