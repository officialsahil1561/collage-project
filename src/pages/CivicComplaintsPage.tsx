import React, { useState, useRef } from 'react';
import {
  Construction,
  Trash2,
  Droplets,
  Waves,
  Lightbulb,
  Ban,
  HeartPulse,
  MessageSquareWarning,
  ExternalLink,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Phone,
  Smartphone,
  MapPin,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';
import {
  COMPLAINT_PHOTO_EXTENSIONS,
  COMPLAINT_PHOTO_MIME_TYPES,
  ComplaintFormErrors,
  ComplaintFormInput,
  validateComplaintForm,
  validateUploadFile
} from '../utils/citizenFormValidation';

interface ComplaintCategoryItem {
  id: string;
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
}

const COMPLAINT_CATEGORIES: ComplaintCategoryItem[] = [
  {
    id: 'road-damage',
    label: 'Road damage and potholes',
    hint: 'Potholes, broken footpaths, cave-ins, or resurfacing needs',
    icon: Construction
  },
  {
    id: 'garbage-sanitation',
    label: 'Garbage collection and sanitation',
    hint: 'Missed door-to-door pickup, open dumping, or public toilets',
    icon: Trash2
  },
  {
    id: 'water-supply',
    label: 'Water supply problems',
    hint: 'Low water pressure, pipeline leaks, or contaminated supply',
    icon: Droplets
  },
  {
    id: 'drainage-sewage',
    label: 'Drainage and sewage issues',
    hint: 'Choked stormwater drains, overflowing manholes, or sewer leaks',
    icon: Waves
  },
  {
    id: 'streetlight-problems',
    label: 'Streetlight problems',
    hint: 'Non-working street lamps, flickering poles, or dark stretches',
    icon: Lightbulb
  },
  {
    id: 'public-encroachment',
    label: 'Public encroachment',
    hint: 'Footpath obstruction, unauthorized structures, or blocked roads',
    icon: Ban
  },
  {
    id: 'public-health',
    label: 'Public health and hygiene',
    hint: 'Mosquito fogging, stagnant water, or civic clinic sanitation',
    icon: HeartPulse
  },
  {
    id: 'other-civic',
    label: 'Other civic issues',
    hint: 'Parks, stray animal safety, trees, or general municipal services',
    icon: MessageSquareWarning
  }
];

const OFFICIAL_PMC_COMPLAINT_PORTAL = 'https://complaint.pmc.gov.in/';
const OFFICIAL_PMC_WARD_DIRECTORY = 'https://www.pmc.gov.in/en/ward-offices';
const OFFICIAL_PMC_HOME = 'https://www.pmc.gov.in/';

export const CivicComplaintsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [form, setForm] = useState<ComplaintFormInput>({
    category: '',
    title: '',
    description: '',
    locality: '',
    landmark: '',
    name: '',
    contactNumber: '',
    email: ''
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<ComplaintFormErrors>({});
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  const formSectionRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectCategory = (categoryLabel: string) => {
    setSelectedCategory(categoryLabel);
    setForm((prev) => ({ ...prev, category: categoryLabel }));
    setErrors((prev) => ({ ...prev, category: undefined }));
    setIsReviewing(false);

    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handleFieldChange = (field: keyof ComplaintFormInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'category') {
      setSelectedCategory(value);
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const check = validateUploadFile(
      file,
      COMPLAINT_PHOTO_EXTENSIONS,
      COMPLAINT_PHOTO_MIME_TYPES
    );
    if (!check.valid) {
      setErrors((prev) => ({ ...prev, photo: check.error }));
      e.target.value = '';
      return;
    }

    if (photoPreviewUrl) {
      URL.revokeObjectURL(photoPreviewUrl);
    }
    setPhotoFile(file);
    setPhotoPreviewUrl(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, photo: undefined }));
  };

  const handleRemovePhoto = () => {
    if (photoPreviewUrl) {
      URL.revokeObjectURL(photoPreviewUrl);
    }
    setPhotoFile(null);
    setPhotoPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateComplaintForm(form);
    if (Object.keys(validationErrors).length > 0 || errors.photo) {
      setErrors({ ...validationErrors, photo: errors.photo });
      return;
    }
    setErrors({});
    setIsReviewing(true);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const buildPlainSummary = () => {
    const lines = [
      `Category: ${form.category}`,
      `Subject: ${form.title.trim()}`,
      `Pune Area / Locality: ${form.locality.trim()}`,
      form.landmark.trim() ? `Landmark: ${form.landmark.trim()}` : null,
      `Description: ${form.description.trim()}`
    ].filter(Boolean);
    return lines.join('\n');
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildPlainSummary());
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      setCopiedSummary(false);
    }
  };

  const handleReset = () => {
    handleRemovePhoto();
    setSelectedCategory('');
    setForm({
      category: '',
      title: '',
      description: '',
      locality: '',
      landmark: '',
      name: '',
      contactNumber: '',
      email: ''
    });
    setErrors({});
    setIsReviewing(false);
    setCopiedSummary(false);
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Honest Integration & Boundary Disclosure */}
      <div className="bg-white p-5 sm:p-6 rounded-[6px] border border-[#E5E0D5] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0E7C74]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Official PMC Grievance Redressal Guidance (Local Preparation Only)</span>
          </div>
          <p className="text-xs sm:text-sm text-[#5A6560] leading-relaxed">
            JanDhan Insights is an independent public-information platform and is{' '}
            <strong className="text-[#1C2422]">not connected</strong> to Pune Municipal
            Corporation&apos;s internal complaint system. Prepare your complaint details below and
            submit them directly on the official{' '}
            <strong className="text-[#1C2422]">PMC CARE</strong> portal. Nothing entered on this
            page is stored on a server or published publicly.
          </p>
        </div>

        <a
          href={OFFICIAL_PMC_COMPLAINT_PORTAL}
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 px-4 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-colors"
        >
          <span>Submit through Official PMC Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* A. Complaint Categories Selection */}
      <section aria-label="Civic Complaint Categories" className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl font-semibold text-[#133429]">
            1. Choose a Civic Complaint Category
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6560]">
            Select the category that best matches the municipal issue in your Pune neighbourhood.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMPLAINT_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.label;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat.label)}
                aria-pressed={isSelected}
                className={`text-left p-5 rounded-[6px] border transition-colors duration-150 cursor-pointer flex flex-col gap-3 ${
                  isSelected
                    ? 'bg-[#E8F2EE] border-[#0E7C74] text-[#133429]'
                    : 'bg-white border-[#E5E0D5] hover:border-[#133429]/40 text-[#1C2422]'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-[6px] flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-[#133429] text-[#FAF8F3]'
                      : 'bg-[#FAF8F3] border border-[#E5E0D5] text-[#0E7C74]'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-[#133429] leading-snug">
                    {cat.label}
                  </div>
                  <p className="text-xs text-[#5A6560] leading-relaxed">{cat.hint}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* B & C. Complaint Form & Review Flow (shown after selecting a category) */}
      <div ref={formSectionRef} className="scroll-mt-24">
        {!selectedCategory ? (
          <div className="bg-white p-8 rounded-[6px] border border-[#E5E0D5] text-center space-y-2">
            <p className="font-serif text-lg font-semibold text-[#133429]">
              Select a category above to prepare your complaint details
            </p>
            <p className="text-xs text-[#5A6560] max-w-lg mx-auto">
              Once you choose a category, you can fill in the location, description, and optional
              contact details, review everything cleanly, and proceed to the official PMC portal.
            </p>
          </div>
        ) : !isReviewing ? (
          <form
            onSubmit={handleReviewSubmit}
            noValidate
            className="bg-white p-6 sm:p-8 rounded-[6px] border border-[#E5E0D5] space-y-6"
          >
            <div className="border-b border-[#E5E0D5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#133429]">
                  2. Complaint Information
                </h2>
                <p className="text-xs text-[#5A6560] mt-0.5">
                  Fields marked with <span className="text-[#B45309] font-semibold">*</span> are
                  required before review.
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-medium text-[#5A6560] hover:text-[#133429] self-start sm:self-auto cursor-pointer"
              >
                Clear Form
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Complaint category */}
              <div>
                <label
                  htmlFor="complaint-category"
                  className="block text-xs font-semibold text-[#133429] mb-1.5"
                >
                  Complaint category <span className="text-[#B45309]">*</span>
                </label>
                <select
                  id="complaint-category"
                  value={form.category}
                  onChange={(e) => handleFieldChange('category', e.target.value)}
                  className="w-full h-10 px-3 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] focus:bg-white focus:border-[#0E7C74] focus:outline-hidden text-sm text-[#1C2422]"
                >
                  <option value="">Select a category</option>
                  {COMPLAINT_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.label}>
                      {c.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1.5 text-xs text-[#B45309] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.category}</span>
                  </p>
                )}
              </div>

              {/* Area or locality in Pune */}
              <div>
                <label
                  htmlFor="complaint-locality"
                  className="block text-xs font-semibold text-[#133429] mb-1.5"
                >
                  Area or locality in Pune <span className="text-[#B45309]">*</span>
                </label>
                <input
                  id="complaint-locality"
                  type="text"
                  placeholder="e.g., Kothrud, Shivajinagar, Hadapsar, Baner"
                  value={form.locality}
                  onChange={(e) => handleFieldChange('locality', e.target.value)}
                  className="w-full h-10 px-3 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] focus:bg-white focus:border-[#0E7C74] focus:outline-hidden text-sm text-[#1C2422] placeholder-[#5A6560]/70"
                />
                {errors.locality && (
                  <p className="mt-1.5 text-xs text-[#B45309] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.locality}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Short complaint title */}
              <div>
                <label
                  htmlFor="complaint-title"
                  className="block text-xs font-semibold text-[#133429] mb-1.5"
                >
                  Short complaint title <span className="text-[#B45309]">*</span>
                </label>
                <input
                  id="complaint-title"
                  type="text"
                  maxLength={120}
                  placeholder="e.g., Deep pothole near Paud Road bus stop"
                  value={form.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="w-full h-10 px-3 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] focus:bg-white focus:border-[#0E7C74] focus:outline-hidden text-sm text-[#1C2422] placeholder-[#5A6560]/70"
                />
                {errors.title && (
                  <p className="mt-1.5 text-xs text-[#B45309] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.title}</span>
                  </p>
                )}
              </div>

              {/* Landmark (optional) */}
              <div>
                <label
                  htmlFor="complaint-landmark"
                  className="block text-xs font-semibold text-[#133429] mb-1.5"
                >
                  Landmark <span className="text-[#5A6560] font-normal">(optional)</span>
                </label>
                <input
                  id="complaint-landmark"
                  type="text"
                  placeholder="e.g., Opposite Karve Statue / Near Metro Pillar 14"
                  value={form.landmark}
                  onChange={(e) => handleFieldChange('landmark', e.target.value)}
                  className="w-full h-10 px-3 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] focus:bg-white focus:border-[#0E7C74] focus:outline-hidden text-sm text-[#1C2422] placeholder-[#5A6560]/70"
                />
              </div>
            </div>

            {/* Detailed description */}
            <div>
              <label
                htmlFor="complaint-description"
                className="block text-xs font-semibold text-[#133429] mb-1.5"
              >
                Detailed description <span className="text-[#B45309]">*</span>
              </label>
              <textarea
                id="complaint-description"
                rows={4}
                placeholder="Describe the problem clearly, including road/lane name, how long it has persisted, and any safety hazards."
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

            {/* Photo Upload (optional) */}
            <div>
              <label
                htmlFor="complaint-photo"
                className="block text-xs font-semibold text-[#133429] mb-1.5"
              >
                Photo upload <span className="text-[#5A6560] font-normal">(optional · JPG, PNG or WEBP, max 5 MB)</span>
              </label>
              {!photoFile ? (
                <div className="flex flex-wrap items-center gap-3">
                  <label
                    htmlFor="complaint-photo"
                    className="h-10 px-4 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] hover:bg-white text-xs font-semibold text-[#133429] inline-flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#0E7C74]" />
                    <span>Attach Photo for Review</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    id="complaint-photo"
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                    onChange={handlePhotoChange}
                    className="sr-only"
                  />
                  <span className="text-xs text-[#5A6560]">
                    Stays locally in your browser; not uploaded to a server.
                  </span>
                </div>
              ) : (
                <div className="p-3 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {photoPreviewUrl && (
                      <img
                        src={photoPreviewUrl}
                        alt="Uploaded civic issue preview"
                        className="w-12 h-12 rounded-[4px] object-cover border border-[#E5E0D5] shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#133429] truncate">
                        {photoFile.name}
                      </div>
                      <div className="text-[11px] font-mono text-[#5A6560]">
                        {(photoFile.size / 1024).toFixed(1)} KB
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="h-8 px-2.5 rounded-[6px] border border-[#E5E0D5] bg-white text-xs font-medium text-[#5A6560] hover:text-[#133429] inline-flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              )}
              {errors.photo && (
                <p className="mt-1.5 text-xs text-[#B45309] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.photo}</span>
                </p>
              )}
            </div>

            {/* Optional Personal Details */}
            <div className="pt-4 border-t border-[#E5E0D5] space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-[#133429]">
                  Optional Contact Details (Not Required &amp; Never Published)
                </h3>
                <p className="text-[11px] text-[#5A6560] mt-0.5">
                  You may leave these fields blank. When submitting on the official PMC CARE
                  portal, PMC may request your mobile number for SMS token updates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="complaint-name"
                    className="block text-xs font-semibold text-[#133429] mb-1.5"
                  >
                    Name <span className="text-[#5A6560] font-normal">(optional)</span>
                  </label>
                  <input
                    id="complaint-name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    className="w-full h-10 px-3 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] focus:bg-white focus:border-[#0E7C74] focus:outline-hidden text-sm text-[#1C2422]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="complaint-phone"
                    className="block text-xs font-semibold text-[#133429] mb-1.5"
                  >
                    Contact number <span className="text-[#5A6560] font-normal">(optional)</span>
                  </label>
                  <input
                    id="complaint-phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={form.contactNumber}
                    onChange={(e) => handleFieldChange('contactNumber', e.target.value)}
                    className="w-full h-10 px-3 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] focus:bg-white focus:border-[#0E7C74] focus:outline-hidden text-sm text-[#1C2422]"
                  />
                  {errors.contactNumber && (
                    <p className="mt-1.5 text-xs text-[#B45309] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.contactNumber}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="complaint-email"
                    className="block text-xs font-semibold text-[#133429] mb-1.5"
                  >
                    Email <span className="text-[#5A6560] font-normal">(optional)</span>
                  </label>
                  <input
                    id="complaint-email"
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
            </div>

            {/* Privacy Notice & Review Button */}
            <div className="pt-4 border-t border-[#E5E0D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-[11px] text-[#5A6560] max-w-xl leading-relaxed">
                <strong className="text-[#1C2422]">Privacy Notice:</strong> Personal details and
                photos are optional, remain strictly on your device, and are never stored on a
                server or displayed publicly on JanDhan Insights.
              </p>

              <button
                type="submit"
                className="h-10 px-6 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                <span>Review Complaint Details</span>
              </button>
            </div>
          </form>
        ) : (
          /* REVIEW & OFFICIAL PORTAL SUBMISSION STEP */
          <div className="bg-white p-6 sm:p-8 rounded-[6px] border border-[#E5E0D5] space-y-6">
            <div className="border-b border-[#E5E0D5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E7C74]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ready for Official PMC Submission (Local Preview Only)</span>
                </div>
                <h2 className="font-serif text-xl font-semibold text-[#133429]">
                  Review Your Civic Complaint Summary
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsReviewing(false)}
                className="h-9 px-3.5 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] hover:bg-white text-xs font-semibold text-[#133429] inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </button>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#FAF8F3] p-5 rounded-[6px] border border-[#E5E0D5]">
              <div>
                <dt className="text-[#5A6560] font-medium">Complaint Category</dt>
                <dd className="text-[#133429] font-semibold mt-0.5">{form.category}</dd>
              </div>
              <div>
                <dt className="text-[#5A6560] font-medium">Area / Locality in Pune</dt>
                <dd className="text-[#133429] font-semibold mt-0.5">
                  {form.locality}
                  {form.landmark.trim() ? ` (Near ${form.landmark.trim()})` : ''}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[#5A6560] font-medium">Complaint Title</dt>
                <dd className="text-[#133429] font-semibold mt-0.5">{form.title}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[#5A6560] font-medium">Detailed Description</dt>
                <dd className="text-[#1C2422] mt-1 leading-relaxed whitespace-pre-line">
                  {form.description}
                </dd>
              </div>
              {photoFile && (
                <div className="sm:col-span-2">
                  <dt className="text-[#5A6560] font-medium">Attached Photo (Local Browser Only)</dt>
                  <dd className="text-[#1C2422] mt-1 font-mono">{photoFile.name}</dd>
                </div>
              )}
              {(form.name.trim() || form.contactNumber.trim() || form.email.trim()) && (
                <div className="sm:col-span-2 pt-3 border-t border-[#E5E0D5]">
                  <dt className="text-[#5A6560] font-medium">
                    Optional Contact Details Entered (Private — Not Saved on Server)
                  </dt>
                  <dd className="text-[#1C2422] mt-0.5">
                    {[
                      form.name.trim() ? `Name: ${form.name.trim()}` : null,
                      form.contactNumber.trim() ? `Phone: ${form.contactNumber.trim()}` : null,
                      form.email.trim() ? `Email: ${form.email.trim()}` : null
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </dd>
                </div>
              )}
            </dl>

            {/* Clear Non-Integration Explanation */}
            <div className="p-4 rounded-[6px] bg-[#E8F2EE] border border-[#0E7C74]/25 text-xs text-[#1C2422] space-y-1.5 leading-relaxed">
              <p className="font-semibold text-[#133429]">
                Next Step: Submit Directly Through Pune Municipal Corporation
              </p>
              <p>
                JanDhan Insights does not transmit complaints to PMC, does not store your submission
                on a server, and does not generate complaint tracking numbers. Copy your prepared
                summary below and click{' '}
                <strong>&ldquo;Submit through Official PMC Portal&rdquo;</strong> to lodge your
                official grievance on PMC CARE.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={OFFICIAL_PMC_COMPLAINT_PORTAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 px-5 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <span>Submit through Official PMC Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="h-10 px-4 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] hover:bg-white text-xs font-semibold text-[#133429] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#0E7C74]" />
                      <span>Copied Summary</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#0E7C74]" />
                      <span>Copy Summary Text</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-medium text-[#5A6560] hover:text-[#133429] cursor-pointer"
              >
                Start Another Complaint
              </button>
            </div>
          </div>
        )}
      </div>

      {/* D. Official PMC Complaint Guidance */}
      <section
        aria-label="Official PMC Complaint Channels"
        className="bg-white p-6 sm:p-8 rounded-[6px] border border-[#E5E0D5] space-y-6"
      >
        <div className="space-y-1">
          <h2 className="font-serif text-xl font-semibold text-[#133429]">
            How to Report Civic Problems Through Official PMC Channels
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6560]">
            Use these verified Pune Municipal Corporation (PMC CARE) services to lodge, track, and
            escalate municipal grievances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <ExternalLink className="w-4 h-4 text-[#0E7C74] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-semibold text-[#133429]">PMC CARE Web Portal</div>
                <p className="text-[#5A6560] leading-relaxed">
                  Lodge ward-wise complaints online and check existing complaint token status on
                  PMC&apos;s grievance portal.
                </p>
                <a
                  href={OFFICIAL_PMC_COMPLAINT_PORTAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#0E7C74] hover:text-[#133429]"
                >
                  <span>complaint.pmc.gov.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#0E7C74] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-semibold text-[#133429]">
                  Regional Ward Offices Directory (15 Wards)
                </div>
                <p className="text-[#5A6560] leading-relaxed">
                  Find your nearest Regional Ward Office (Kshetriya Karyalaya) for in-person civic
                  petitions across PMC limits.
                </p>
                <a
                  href={OFFICIAL_PMC_WARD_DIRECTORY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#0E7C74] hover:text-[#133429]"
                >
                  <span>pmc.gov.in/en/ward-offices</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#0E7C74] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-semibold text-[#133429]">
                  PMC Toll-Free Helpline &amp; WhatsApp Helpdesk
                </div>
                <p className="text-[#5A6560] leading-relaxed">
                  Call PMC&apos;s toll-free citizen helpline at{' '}
                  <strong className="font-mono text-[#133429]">1800-103-0222</strong> or message
                  the official PMC CARE WhatsApp service at{' '}
                  <strong className="font-mono text-[#133429]">+91 88882 51001</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Smartphone className="w-4 h-4 text-[#0E7C74] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-semibold text-[#133429]">PMC CARE Mobile App &amp; Main Site</div>
                <p className="text-[#5A6560] leading-relaxed">
                  Geo-tagged civic complaints and utility notices are also supported on the official
                  PMC CARE mobile app listed on PMC&apos;s website.
                </p>
                <a
                  href={OFFICIAL_PMC_HOME}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#0E7C74] hover:text-[#133429]"
                >
                  <span>www.pmc.gov.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
