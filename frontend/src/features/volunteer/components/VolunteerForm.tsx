'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import {
  volunteerSchema,
  DAYS_OF_WEEK,
  type VolunteerFormData,
} from '@/features/volunteer/schemas/volunteer.schema';

const FIELD_CLASS =
  'w-full rounded border border-gray-200 bg-white px-4 py-2.5 text-sm text-heading placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition mt-1';

const ERROR_CLASS = 'mt-1 text-xs text-red-500';

export function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      volunteeringDays: [],
      agreementAccepted: false,
    },
  });

  const selectedDays = watch('volunteeringDays') ?? [];
  const occupationStatus = watch('occupationStatus');

  const toggleDay = (day: (typeof DAYS_OF_WEEK)[number]) => {
    const current = selectedDays;
    if (current.includes(day)) {
      setValue(
        'volunteeringDays',
        current.filter((d) => d !== day),
        { shouldValidate: true }
      );
    } else {
      setValue('volunteeringDays', [...current, day], { shouldValidate: true });
    }
  };

  const onSubmit = async (_data: VolunteerFormData) => {
    // TODO: wire to backend API
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-green-200 bg-green-50 px-8 py-16 text-center">
        <CheckCircle2 className="size-14 text-green-500" />
        <h3 className="font-serif text-2xl font-semibold text-heading">
          Application Submitted!
        </h3>
        <p className="max-w-md text-foreground">
          Thank you for choosing to volunteer with Nehemiah Autism Center. We
          will review your application and get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 rounded bg-primary px-8 py-2.5 text-sm font-semibold uppercase text-white transition hover:bg-primary-hover"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
      {/* ── Section 1: Personal Information ── */}
      <fieldset>
        <legend className="mb-4 border-b border-gray-100 pb-2 font-serif text-lg font-semibold text-heading">
          Personal Information
        </legend>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder=""
              {...register('fullName')}
              className={`mt-1 ${errors.fullName ? 'border-red-400' : ''}`}
            />
            {errors.fullName && (
              <p className={ERROR_CLASS}>{errors.fullName.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <Label htmlFor="gender">Gender *</Label>
            <select id="gender" {...register('gender')} className={FIELD_CLASS}>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            {errors.gender && (
              <p className={ERROR_CLASS}>{errors.gender.message}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              type="number"
              
              min={16}
              max={80}
              {...register('age')}
              className={`mt-1 ${errors.age ? 'border-red-400' : ''}`}
            />
            {errors.age && (
              <p className={ERROR_CLASS}>{errors.age.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
             
              {...register('address')}
              className={`mt-1 ${errors.address ? 'border-red-400' : ''}`}
            />
            {errors.address && (
              <p className={ERROR_CLASS}>{errors.address.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              
              {...register('phone')}
              className={`mt-1 ${errors.phone ? 'border-red-400' : ''}`}
            />
            {errors.phone && (
              <p className={ERROR_CLASS}>{errors.phone.message}</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* ── Section 2: Education & Employment ── */}
      <fieldset>
        <legend className="mb-4 border-b border-gray-100 pb-2 font-serif text-lg font-semibold text-heading">
          Education &amp; Employment
        </legend>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Education Background */}
          <div className="sm:col-span-2">
            <Label htmlFor="educationBackground">Education Background *</Label>
            <Input
              id="educationBackground"
              placeholder=""
              {...register('educationBackground')}
              className={`mt-1 ${errors.educationBackground ? 'border-red-400' : ''}`}
            />
            {errors.educationBackground && (
              <p className={ERROR_CLASS}>{errors.educationBackground.message}</p>
            )}
          </div>

          {/* Occupation Status */}
          <div>
            <Label htmlFor="occupationStatus">Occupation Status *</Label>
            <select
              id="occupationStatus"
              {...register('occupationStatus')}
              className={FIELD_CLASS}
            >
              <option value="">Select status</option>
              <option value="Student">Student</option>
              <option value="Employed">Employed</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Other">Other</option>
            </select>
            {errors.occupationStatus && (
              <p className={ERROR_CLASS}>{errors.occupationStatus.message}</p>
            )}
          </div>

          {/* Institution / Company Name — conditional label */}
          <div>
            <Label htmlFor="institutionName">
              {occupationStatus === 'Student'
                ? 'Name of School / University'
                : occupationStatus === 'Employed' || occupationStatus === 'Self-employed'
                ? 'Name of Company / Workplace'
                : 'Institution or Workplace (if applicable)'}
            </Label>
            <Input
              id="institutionName"
              placeholder={
                occupationStatus === 'Student'
                  ? ''
                  : ''
              }
              {...register('institutionName')}
              className="mt-1"
            />
          </div>
        </div>
      </fieldset>

      {/* ── Section 3: Volunteering Details ── */}
      <fieldset>
        <legend className="mb-4 border-b border-gray-100 pb-2 font-serif text-lg font-semibold text-heading">
          Volunteering Details
        </legend>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Reason for Volunteering */}
          <div className="sm:col-span-2">
            <Label htmlFor="reasonForVolunteering">
              Reason for Volunteering *
            </Label>
            <Textarea
              id="reasonForVolunteering"
              placeholder="Please describe why you want to volunteer with Nehemiah Autism Center and what skills or experience you bring..."
              rows={4}
              {...register('reasonForVolunteering')}
              className={`mt-1 ${errors.reasonForVolunteering ? 'border-red-400' : ''}`}
            />
            {errors.reasonForVolunteering && (
              <p className={ERROR_CLASS}>
                {errors.reasonForVolunteering.message}
              </p>
            )}
          </div>

          {/* Volunteering From Date */}
          <div>
            <Label htmlFor="volunteeringFromDate">Volunteering From *</Label>
            <input
              id="volunteeringFromDate"
              type="date"
              {...register('volunteeringFromDate')}
              className={`${FIELD_CLASS} ${errors.volunteeringFromDate ? 'border-red-400' : ''}`}
            />
            {errors.volunteeringFromDate && (
              <p className={ERROR_CLASS}>
                {errors.volunteeringFromDate.message}
              </p>
            )}
          </div>

          {/* Volunteering To Date */}
          <div>
            <Label htmlFor="volunteeringToDate">Volunteering To *</Label>
            <input
              id="volunteeringToDate"
              type="date"
              {...register('volunteeringToDate')}
              className={`${FIELD_CLASS} ${errors.volunteeringToDate ? 'border-red-400' : ''}`}
            />
            {errors.volunteeringToDate && (
              <p className={ERROR_CLASS}>{errors.volunteeringToDate.message}</p>
            )}
          </div>

          {/* Days of the Week */}
          <div className="sm:col-span-2">
            <Label>Days Available to Volunteer *</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {DAYS_OF_WEEK.map((day) => {
                const isSelected = selectedDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                      isSelected
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 bg-white text-heading hover:border-primary hover:text-primary'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            {errors.volunteeringDays && (
              <p className={ERROR_CLASS}>{errors.volunteeringDays.message}</p>
            )}
          </div>

          {/* Time From */}
          <div>
            <Label htmlFor="volunteeringTimeFrom">
              Volunteering Time — From *
            </Label>
            <input
              id="volunteeringTimeFrom"
              type="time"
              {...register('volunteeringTimeFrom')}
              className={`${FIELD_CLASS} ${errors.volunteeringTimeFrom ? 'border-red-400' : ''}`}
            />
            {errors.volunteeringTimeFrom && (
              <p className={ERROR_CLASS}>
                {errors.volunteeringTimeFrom.message}
              </p>
            )}
          </div>

          {/* Time To */}
          <div>
            <Label htmlFor="volunteeringTimeTo">
              Volunteering Time — To *
            </Label>
            <input
              id="volunteeringTimeTo"
              type="time"
              {...register('volunteeringTimeTo')}
              className={`${FIELD_CLASS} ${errors.volunteeringTimeTo ? 'border-red-400' : ''}`}
            />
            {errors.volunteeringTimeTo && (
              <p className={ERROR_CLASS}>{errors.volunteeringTimeTo.message}</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* ── Section 4: Volunteer Agreement ── */}
      <fieldset>
        <legend className="mb-4 border-b border-gray-100 pb-2 font-serif text-lg font-semibold text-heading">
          Volunteer Agreement
        </legend>
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 text-sm leading-relaxed text-foreground">
          <p>
            I, the volunteer whose name is mentioned above, agree to assist and
            care for autistic children at the{' '}
            <strong className="text-heading">Nehemiah Autism Center</strong> in
            my profession, free of charge, during the period specified above.
          </p>
          <p className="mt-3">
            I also agree to serve and perform my duties according to the hours
            of other regular employees of the organization during the period
            specified above.
          </p>
          <p className="mt-3">
            I also confirm that I will{' '}
            <strong className="text-heading">
              not take any photos or videos
            </strong>{' '}
            without the permission of the organization.
          </p>
        </div>

        <label className="mt-4 flex cursor-pointer items-start gap-3">
          <input
            id="agreementAccepted"
            type="checkbox"
            {...register('agreementAccepted')}
            className="mt-0.5 size-4 accent-primary"
          />
          <span className="text-sm text-foreground">
            I have read and agree to the volunteer agreement stated above. *
          </span>
        </label>
        {errors.agreementAccepted && (
          <p className={ERROR_CLASS}>{errors.agreementAccepted.message}</p>
        )}
      </fieldset>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-primary px-8 py-3.5 font-semibold uppercase tracking-wide text-white transition hover:bg-primary-hover disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? 'Submitting…' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
}
