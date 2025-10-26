import { Edit2, Trash2, Calendar } from 'lucide-react';
import type { Ticket } from '../lib/supabase';

type TicketCardProps = {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticketId: string) => void;
};

const statusConfig = {
  open: {
    label: 'Open',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
  },
  in_progress: {
    label: 'In Progress',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-800',
    borderColor: 'border-amber-200',
  },
  closed: {
    label: 'Closed',
    bgColor: 'bg-slate-100',
    textColor: 'text-slate-800',
    borderColor: 'border-slate-200',
  },
};

const priorityConfig = {
  low: { label: 'Low', color: 'text-blue-600' },
  medium: { label: 'Medium', color: 'text-amber-600' },
  high: { label: 'High', color: 'text-red-600' },
};

export function TicketCard({ ticket, onEdit, onDelete }: TicketCardProps) {
  const status = statusConfig[ticket.status];
  const priority = ticket.priority ? priorityConfig[ticket.priority] : null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
            {ticket.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${status.bgColor} ${status.textColor} ${status.borderColor}`}
            >
              {status.label}
            </span>
            {priority && (
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white border border-slate-200 ${priority.color}`}>
                {priority.label}
              </span>
            )}
          </div>
        </div>
      </div>

      {ticket.description && (
        <p className="text-sm text-slate-600 mb-4 line-clamp-3">
          {ticket.description}
        </p>
      )}

      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
        <Calendar className="w-4 h-4" aria-hidden="true" />
        <span>Created {formatDate(ticket.created_at)}</span>
      </div>

      <div className="flex gap-2 pt-4 border-t border-slate-200">
        <button
          onClick={() => onEdit(ticket)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`Edit ticket: ${ticket.title}`}
        >
          <Edit2 className="w-4 h-4" aria-hidden="true" />
          Edit
        </button>
        <button
          onClick={() => onDelete(ticket.id)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label={`Delete ticket: ${ticket.title}`}
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
          Delete
        </button>
      </div>
    </div>
  );
}
