import { useState, type FormEvent } from 'react';
import type { Ticket } from '../lib/supabase';

type TicketFormProps = {
  initialData?: Ticket | null;
  onSubmit: (data: Omit<Ticket, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onCancel: () => void;
};

export function TicketForm({ initialData, onSubmit, onCancel }: TicketFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState<'open' | 'in_progress' | 'closed'>(initialData?.status || 'open');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | ''>(initialData?.priority || '');
  const [errors, setErrors] = useState<{ title?: string; status?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { title?: string; status?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (!status) {
      newErrors.status = 'Status is required';
    } else if (!['open', 'in_progress', 'closed'].includes(status)) {
      newErrors.status = 'Status must be open, in_progress, or closed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        status,
        priority: priority || undefined,
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title
                ? 'border-red-300 focus:ring-red-500'
                : 'border-slate-300 focus:ring-blue-500'
            }`}
            placeholder="Enter ticket title"
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <p id="title-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ticket description (optional)"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'open' | 'in_progress' | 'closed')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.status
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-blue-500'
              }`}
              aria-invalid={!!errors.status}
              aria-describedby={errors.status ? 'status-error' : undefined}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && (
              <p id="status-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.status}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-slate-700 mb-2">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high' | '')}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Saving...' : initialData ? 'Update Ticket' : 'Create Ticket'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
