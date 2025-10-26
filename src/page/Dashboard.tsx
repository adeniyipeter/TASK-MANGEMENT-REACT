import { useEffect, useState } from 'react';

import { Ticket, Clock, CheckCircle, LogOut, List } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase.ts';
import { Layout } from '../components/Layout';
import { ProtectedRoute } from '../components/ProtectedRoute';

type DashboardProps = {
  onNavigate: (page: 'login' | 'tickets') => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
};

type Stats = {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
};

export function Dashboard({ onNavigate, onShowToast }: DashboardProps) {
  const { user, signOut } = useAuth();
  const [stats, setStats] = useState<Stats>({ total: 0, open: 0, inProgress: 0, closed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

 const loadStats = async () => {
  try {
    const { data } = await supabase
      .from('tickets')
      .select('status');

    const total = data?.length || 0;
    const open = data?.filter(t => t.status === 'open').length || 0;
    const inProgress = data?.filter(t => t.status === 'in_progress').length || 0;
    const closed = data?.filter(t => t.status === 'closed').length || 0;

    setStats({ total, open, inProgress, closed });
  } catch {
    onShowToast('Failed to load statistics. Please try again.', 'error');
  } finally {
    setLoading(false);
  }
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
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
                <p className="text-slate-600">
                  Welcome back, <span className="font-semibold">{user?.email}</span>
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" aria-hidden="true" />
                Logout
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Ticket className="w-6 h-6 text-blue-600" aria-hidden="true" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Total Tickets</p>
                    <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Ticket className="w-6 h-6 text-green-600" aria-hidden="true" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Open Tickets</p>
                    <p className="text-3xl font-bold text-green-600">{stats.open}</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-amber-600" aria-hidden="true" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-slate-600 mb-1">In Progress</p>
                    <p className="text-3xl font-bold text-amber-600">{stats.inProgress}</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-slate-600" aria-hidden="true" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Closed Tickets</p>
                    <p className="text-3xl font-bold text-slate-600">{stats.closed}</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
                  <button
                    onClick={() => onNavigate('tickets')}
                    className="flex items-center gap-3 w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <List className="w-5 h-5" aria-hidden="true" />
                    Manage Tickets
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
