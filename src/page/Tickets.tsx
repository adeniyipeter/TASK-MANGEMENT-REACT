import { useEffect, useState } from 'react';
import { Plus, ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, type Ticket } from '../lib/supabase';
import { Layout } from '../components/Layout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { TicketCard } from '../components/TicketCard';
import { TicketForm } from '../components/TicketForm';

type TicketsProps = {
  onNavigate: (page: 'login' | 'dashboard') => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
};

export function Tickets({ onNavigate, onShowToast }: TicketsProps) {
  const { user, signOut } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTickets(data || []);
    } catch (error) {
      onShowToast('Failed to load tickets. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (ticketData: Omit<Ticket, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .insert([{ ...ticketData, user_id: user!.id }]);

      if (error) throw error;

      onShowToast('Ticket created successfully!', 'success');
      setShowForm(false);
      loadTickets();
    } catch (error) {
      onShowToast('Failed to create ticket. Please try again.', 'error');
    }
  };

  const handleUpdateTicket = async (ticketData: Omit<Ticket, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!editingTicket) return;

    try {
      const { error } = await supabase
        .from('tickets')
        .update(ticketData)
        .eq('id', editingTicket.id);

      if (error) throw error;

      onShowToast('Ticket updated successfully!', 'success');
      setEditingTicket(null);
      setShowForm(false);
      loadTickets();
    } catch (error) {
      onShowToast('Failed to update ticket. Please try again.', 'error');
    }
  };

  const handleDeleteTicket = async (ticketId: string) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('tickets')
        .delete()
        .eq('id', ticketId);

      if (error) throw error;

      onShowToast('Ticket deleted successfully!', 'success');
      loadTickets();
    } catch (error) {
      onShowToast('Failed to delete ticket. Please try again.', 'error');
    }
  };

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTicket(null);
  };

  const handleLogout = async () => {
    await signOut();
    onShowToast('Successfully logged out.', 'success');
    onNavigate('login');
  };

  return (
    <ProtectedRoute onUnauthorized={() => onNavigate('login')}>
      <Layout>
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Ticket Management</h1>
                <p className="text-slate-600">Create, view, edit, and manage your tickets</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Back to dashboard"
                >
                  <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" aria-hidden="true" />
                  Logout
                </button>
              </div>
            </div>

            {showForm ? (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  {editingTicket ? 'Edit Ticket' : 'Create New Ticket'}
                </h2>
                <TicketForm
                  initialData={editingTicket}
                  onSubmit={editingTicket ? handleUpdateTicket : handleCreateTicket}
                  onCancel={handleCancelForm}
                />
              </div>
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-8"
              >
                <Plus className="w-5 h-5" aria-hidden="true" />
                Create New Ticket
              </button>
            )}

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : tickets.length === 0 ? (
              <div className="bg-white rounded-xl p-12 shadow-lg border border-slate-200 text-center">
                <p className="text-slate-600 mb-4">No tickets found. Create your first ticket to get started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onEdit={handleEdit}
                    onDelete={handleDeleteTicket}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
