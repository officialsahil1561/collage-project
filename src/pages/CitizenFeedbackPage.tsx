import React, { useState, useRef, useMemo } from 'react';
import { dataProvider } from '../services/dataProvider';
import {
  AlertCircle,
  CheckCircle2,
  Upload,
  X,
  Download,
  ShieldCheck,
  FileText
} from 'lucide-react';
import {
  FEEDBACK_DOC_EXTENSIONS,
  FEEDBACK_DOC_MIME_TYPES,
  FeedbackFormErrors,
  FeedbackFormInput,
  validateFeedbackForm,
  validateUploadFile
} from '../utils/citizenFormValidation';

const FEEDBACK_CATEGORIES = [
  'Incorrect financial information',
  'Missing financial records',
  'Incorrect project information',
  'Broken source document link',
  'Website improvement suggestion',
  'General feedback'
] as const;

const FINANCIAL_YEARS = [
  'FY 2025-26',
  'FY 2024-25',
  'FY 2023-24',
  'FY 2022-23',
  'Earlier / Multiple Years'
];

interface SubmittedPreview {
  category: string;
  department: string;
  financialYear: string;
  description: string;
  attachmentName: string | null;
  submittedAtLocal: string;
  hasOptionalContact: boolean;
}

export const CitizenFeedbackPage: React.FC = () => {
  const departments = useMemo(() => dataProvider.getDepartments(), []);

  const [form, setForm] = useState<FeedbackFormInput>({
    category: 'Incorrect financial information',
    name: '',
    email: '',
    department: '',
    financialYear: '',
    description: '',
    confirmedAccurate: false
  });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [errors, setErrors] = useState<FeedbackFormErrors>({});
  const [submittedPreview, setSubmittedPreview] = useState<SubmittedPreview | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFieldChange = <K extends keyof FeedbackFormInput>(
    field: K,
    value: FeedbackFormInput[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const check = validateUploadFile(file, FEEDBACK_DOC_EXTENSIONS, FEEDBACK_DOC_MIME_TYPES);
    if (!check.valid) {
      setErrors((prev) => ({ ...prev, attachment: check.error }));
      e.target.value = '';
      return;
    }

    setAttachment(file);
    setErrors((prev) => ({ ...prev, attachment: undefined }));
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFeedbackForm(form);
    if (Object.keys(validationErrors).length > 0 || errors.attachment) {
      setErrors({ ...validationErrors, attachment: errors.attachment });
      return;
    }

    setErrors({});
    setSubmittedPreview({
      category: form.category,
      department: form.department || 'Not specified',
      financialYear: form.financialYear || 'Not specified',
      description: form.description.trim(),
      attachmentName: attachment ? attachment.name : null,
      submittedAtLocal: new Date().toLocaleString('en-IN'),
      hasOptionalContact: Boolean(form.name.trim() || form.email.trim())
    });
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleDownloadCopy = () => {
    if (!submittedPreview) return;
    const payload = {
      platform: 'JanDhan Insights (Pune Municipal Corporation)',
      mode: 'Local Preview Demonstration (Not Stored on Server)',
      category: submittedPreview.category,
      related_department: submittedPreview.department,
      related_financial_year: submittedPreview.financialYear,
      description: submittedPreview.description,
      attachment_filename: submittedPreview.attachmentName,
      confirmed_accurate_by_citizen: true,
      prepared_at: submittedPreview.submittedAtLocal
    };
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', 'jandhan_citizen_feedback_copy.json');
    link.click();
  };

  const handleReset = () => {
    handleRemoveAttachment();
    setForm({
      category: 'Incorrect financial information',
      name: '',
      email: '',
      department: '',
      financialYear: '',
      description: '',
      confirmedAccurate: false
    });
    setErrors({});
    setSubmittedPreview(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Backend / Local Preview Storage Disclosure */}
      <div className="bg-white p-5 sm:p-6 rounded-[6px] border border-[#E5E0D5] space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#0E7C74]">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Local Preview Demonstration · No Backend Database Configured</span>
        </div>
        <p className="text-xs sm:text-sm text-[#5A6560] leading-relaxed">
          Help keep JanDhan Insights accurate for Pune citizens. Because this deployment currently
          runs as a frontend application without a connected backend database, submitting this form
          generates a <strong className="text-[#1C2422]">local preview confirmation</strong> and
          downloadable report rather than permanently storing data on a server.
        </p>
      </div>

      {submittedPreview ? (
        /* C. Honest Post-Submission Confirmation */
        <section
          aria-live="polite"
          className="bg-white p-6 sm:p-8 rounded-[6px] border border-[#E5E0D5] space-y-6"
        >
          <div className="space-y-2 border-b border-[#E5E0D5] pb-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0E7C74]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Feedback Preview Prepared (Not Yet Reviewed · Not Saved on Server)</span>
            </div>
            <h2 className="font-serif text-2xl font-semibold text-[#133429]">
              Thank You for Contributing to Financial Accuracy
            </h2>
            <p className="text-sm text-[#5A6560] leading-relaxed max-w-2xl">
              Your feedback summary has been validated and prepared in this browser session. No
              fake tracking number has been issued, and this submission has not been automatically
              saved to a backend database or reviewed by an editor yet.
            </p>
          </div>

          <div className="bg-[#FAF8F3] p-5 rounded-[6px] border border-[#E5E0D5] space-y-3 text-xs">
            <div className="font-semibold text-[#133429]">What Happens Next</div>
            <ul className="space-y-1.5 text-[#5A6560] leading-relaxed list-disc pl-4">
              <li>
                In a backend-enabled deployment, this report is queued for cross-checking against
                primary PMC budget books, OpenCity datasets, and audited PDF statements.
              </li>
              <li>
                Because permanent server storage is not active in this demo environment, download a
                JSON copy below if you wish to keep or share your verification note.
              </li>
              <li>
                Optional contact details are kept private and are never published on the public
                website.
              </li>
            </ul>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs border border-[#E5E0D5] rounded-[6px] p-5">
            <div>
              <dt className="text-[#5A6560] font-medium">Feedback Category</dt>
              <dd className="text-[#133429] font-semibold mt-0.5">{submittedPreview.category}</dd>
            </div>
            <div>
              <dt className="text-[#5A6560] font-medium">Related Department</dt>
              <dd className="text-[#133429] font-semibold mt-0.5">{submittedPreview.department}</dd>
            </div>
            <div>
              <dt className="text-[#5A6560] font-medium">Related Financial Year</dt>
              <dd className="text-[#133429] font-semibold mt-0.5">
                {submittedPreview.financialYear}
              </dd>
            </div>
            <div className="sm:col-span-3 pt-3 border-t border-[#E5E0D5]">
              <dt className="text-[#5A6560] font-medium">Feedback Description</dt>
              <dd className="text-[#1C2422] mt-1 leading-relaxed whitespace-pre-line">
                {submittedPreview.description}
              </dd>
            </div>
            {submittedPreview.attachmentName && (
              <div className="sm:col-span-3">
                <dt className="text-[#5A6560] font-medium">Supporting File Attached Locally</dt>
                <dd className="text-[#1C2422] mt-0.5 font-mono">
                  {submittedPreview.attachmentName}
                </dd>
              </div>
            )}
            {submittedPreview.hasOptionalContact && (
              <div className="sm:col-span-3">
                <dt className="text-[#5A6560] font-medium">Contact Information Privacy</dt>
                <dd className="text-[#0E7C74] mt-0.5">
                  Optional name/email excluded from public display and not saved to any server.
                </dd>
              </div>
            )}
          </dl>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleDownloadCopy}
              className="h-10 px-5 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Copy (JSON)</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="h-10 px-4 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] hover:bg-white text-xs font-semibold text-[#133429] transition-colors cursor-pointer"
            >
              Submit Another Feedback
            </button>
          </div>
        </section>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white p-6 sm:p-8 rounded-[6px] border border-[#E5E0D5] space-y-6"
        >
          <div className="border-b border-[#E5E0D5] pb-4">
            <h2 className="font-serif text-xl font-semibold text-[#133429]">
              Submit Data Correction or Portal Feedback
            </h2>
            <p className="text-xs text-[#5A6560] mt-0.5">
              Fields marked with <span className="text-[#B45309] font-semibold">*</span> are
              required. Name and email remain completely optional.
            </p>
          </div>

          {/* A. Feedback Categories */}
          <div>
            <span className="block text-xs font-semibold text-[#133429] mb-2">
              Feedback category <span className="text-[#B45309]">*</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {FEEDBACK_CATEGORIES.map((cat) => {
                const isSelected = form.category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleFieldChange('category', cat)}
                    aria-pressed={isSelected}
                    className={`px-3.5 py-2.5 rounded-[6px] border text-left text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#E8F2EE] border-[#0E7C74] text-[#133429] font-semibold'
                        : 'bg-[#FAF8F3] border-[#E5E0D5] text-[#1C2422] hover:bg-white font-medium'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            {errors.category && (
              <p className="mt-1.5 text-xs text-[#B45309] flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.category}</span>
              </p>
            )}
          </div>

          {/* Related Department & Financial Year (optional) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="feedback-department"
                className="block text-xs font-semibold text-[#133429] mb-1.5"
              >
                Related department <span className="text-[#5A6560] font-normal">(optional)</span>
              </label>
              <select
                id="feedback-department"
                value={form.department}
                onChange={(e) => handleFieldChange('department', e.target.value)}
                className="w-full h-10 px-3 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] focus:bg-white focus:border-[#0E7C74] focus:outline-hidden text-sm text-[#1C2422]"
              >
                <option value="">General / Not Department Specific</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="feedback-fy"
                className="block text-xs font-semibold text-[#133429] mb-1.5"
              >
                Related financial year{' '}
                <span className="text-[#5A6560] font-normal">(optional)</span>
              </label>
              <select
                id="feedback-fy"
                value={form.financialYear}
                onChange={(e) => handleFieldChange('financialYear', e.target.value)}
                className="w-full h-10 px-3 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] focus:bg-white focus:border-[#0E7C74] focus:outline-hidden text-sm text-[#1C2422]"
              >
                <option value="">Select Financial Year (Optional)</option>
                {FINANCIAL_YEARS.map((fy) => (
                  <option key={fy} value={fy}>
                    {fy}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description of feedback */}
          <div>
            <label
              htmlFor="feedback-description"
              className="block text-xs font-semibold text-[#133429] mb-1.5"
            >
              Description of feedback <span className="text-[#B45309]">*</span>
            </label>
            <textarea
              id="feedback-description"
              rows={5}
              placeholder="Include the PMC Record ID (e.g., PMC_202526_BE_001), project name, or page details along with the correction or suggestion."
              value={form.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="w-full p-3 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] focus:bg-white focus:border-[#0E7C74] focus:outline-hidden text-sm text-[#1C2422] placeholder-[#5A6560]/70 leading-relaxed"
            />
            {errors.description && (
              <p className="mt-1.5 text-xs text-[#B45309] flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.description}</span>
              </p>
            )}
          </div>

          {/* Supporting document or screenshot upload (optional) */}
          <div>
            <label
              htmlFor="feedback-attachment"
              className="block text-xs font-semibold text-[#133429] mb-1.5"
            >
              Supporting document or screenshot{' '}
              <span className="text-[#5A6560] font-normal">
                (optional · PDF, JPG, PNG, WEBP, or CSV, max 5 MB)
              </span>
            </label>
            {!attachment ? (
              <div className="flex flex-wrap items-center gap-3">
                <label
                  htmlFor="feedback-attachment"
                  className="h-10 px-4 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] hover:bg-white text-xs font-semibold text-[#133429] inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-[#0E7C74]" />
                  <span>Attach Supporting File</span>
                </label>
                <input
                  ref={fileInputRef}
                  id="feedback-attachment"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.csv"
                  onChange={handleFileChange}
                  className="sr-only"
                />
                <span className="text-xs text-[#5A6560]">
                  Validated locally; not uploaded to a remote server.
                </span>
              </div>
            ) : (
              <div className="p-3 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText className="w-4 h-4 text-[#0E7C74] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#133429] truncate">
                      {attachment.name}
                    </div>
                    <div className="text-[11px] font-mono text-[#5A6560]">
                      {(attachment.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveAttachment}
                  className="h-8 px-2.5 rounded-[6px] border border-[#E5E0D5] bg-white text-xs font-medium text-[#5A6560] hover:text-[#133429] inline-flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            )}
            {errors.attachment && (
              <p className="mt-1.5 text-xs text-[#B45309] flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.attachment}</span>
              </p>
            )}
          </div>

          {/* Optional Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-[#E5E0D5]">
            <div>
              <label
                htmlFor="feedback-name"
                className="block text-xs font-semibold text-[#133429] mb-1.5"
              >
                Name <span className="text-[#5A6560] font-normal">(optional)</span>
              </label>
              <input
                id="feedback-name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                className="w-full h-10 px-3 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] focus:bg-white focus:border-[#0E7C74] focus:outline-hidden text-sm text-[#1C2422]"
              />
            </div>

            <div>
              <label
                htmlFor="feedback-email"
                className="block text-xs font-semibold text-[#133429] mb-1.5"
              >
                Email <span className="text-[#5A6560] font-normal">(optional)</span>
              </label>
              <input
                id="feedback-email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                className="w-full h-10 px-3 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] focus:bg-white focus:border-[#0E7C74] focus:outline-hidden text-sm text-[#1C2422]"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-[#B45309] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Accuracy Confirmation Checkbox */}
          <div className="pt-2">
            <label className="inline-flex items-start gap-2.5 text-xs text-[#1C2422] cursor-pointer">
              <input
                type="checkbox"
                checked={form.confirmedAccurate}
                onChange={(e) => handleFieldChange('confirmedAccurate', e.target.checked)}
                className="mt-0.5 rounded border-[#D4CEC2] text-[#0E7C74] focus:ring-[#0E7C74]"
              />
              <span>
                I confirm that the submitted information is accurate to the best of my knowledge.{' '}
                <span className="text-[#B45309] font-semibold">*</span>
              </span>
            </label>
            {errors.confirmedAccurate && (
              <p className="mt-1.5 text-xs text-[#B45309] flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.confirmedAccurate}</span>
              </p>
            )}
          </div>

          {/* Privacy Notice & Submit */}
          <div className="pt-4 border-t border-[#E5E0D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[11px] text-[#5A6560] max-w-xl leading-relaxed">
              <strong className="text-[#1C2422]">Privacy Notice:</strong> Optional contact details
              are never exposed publicly and are not persisted on a server in this client-only
              environment.
            </p>

            <button
              type="submit"
              className="h-10 px-6 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              <span>Preview Feedback Submission</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
