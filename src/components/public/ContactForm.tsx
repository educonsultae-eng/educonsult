'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const schema = z.object({
  name:     z.string().min(2, 'Please enter your full name'),
  email:    z.string().email('Please enter a valid email'),
  phone:    z.string().optional(),
  school:   z.string().optional(),
  position: z.string().optional(),
  message:  z.string().min(10, 'Please provide a brief message (min 10 characters)'),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Submission failed');
      }

      setSubmitted(true);
      reset();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
        <p className="text-slate-600">
          Your enquiry has been received. A member of our team will be in touch within one business day.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-primary-700 font-semibold hover:text-primary-900"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Full Name *</label>
          <input {...register('name')} className="form-input" placeholder="Dr. Sarah Al-Mansouri" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="form-label">Email Address *</label>
          <input {...register('email')} type="email" className="form-input" placeholder="you@school.ae" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Phone / WhatsApp</label>
          <input {...register('phone')} className="form-input" placeholder="+971 50 000 0000" />
        </div>
        <div>
          <label className="form-label">School / Organisation</label>
          <input {...register('school')} className="form-input" placeholder="Your school name" />
        </div>
      </div>

      <div>
        <label className="form-label">Your Role</label>
        <select {...register('position')} className="form-input">
          <option value="">Select your role</option>
          <option>School Owner / Operator</option>
          <option>Principal / Head of School</option>
          <option>Vice Principal</option>
          <option>HOD / Teacher</option>
          <option>Education Group Leader</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="form-label">How Can We Help? *</label>
        <textarea
          {...register('message')}
          rows={5}
          className="form-input resize-none"
          placeholder="Tell us about your school's goals and how we can support you..."
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-4 text-base">
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send size={18} /> Send Enquiry
          </span>
        )}
      </button>

      <p className="text-xs text-slate-400 text-center">
        We respect your privacy. Your information will never be shared with third parties.
      </p>
    </form>
  );
}
