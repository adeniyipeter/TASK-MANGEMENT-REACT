import { Ticket, CheckCircle, Clock, TrendingUp } from 'lucide-react';

import { Layout } from '../components/Layout';

type LandingProps = {
  onNavigate: (page: 'login' | 'signup') => void;
};

export function Landing({ onNavigate }: LandingProps) {
  return (
    <Layout>
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <section className="relative py-20 sm:py-24 lg:py-32">
            <div className="absolute top-10 left-[5%] w-32 h-32 bg-blue-400 rounded-full opacity-30"></div>

            <div className="relative z-10 text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Welcome to <span className="text-blue-600">TicketFlow</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Streamline your support workflow with our powerful ticket management system.
                Track, manage, and resolve customer issues efficiently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Get started with TicketFlow"
                >
                  Get Started
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Login to your account"
                >
                  Login
                </button>
              </div>
            </div>

            <svg
              className="absolute bottom-0 left-0 w-full h-24"
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0,64 C240,100 480,40 720,64 C960,88 1200,24 1440,64 L1440,120 L0,120 Z"
                fill="white"
              />
            </svg>
          </section>
        </div>
      </div>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 mb-12">
            Why Choose TicketFlow?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Ticket className="w-6 h-6 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Easy Ticket Creation</h3>
              <p className="text-slate-600 leading-relaxed">
                Create and organize tickets effortlessly with our intuitive interface.
                Never lose track of customer requests.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Real-time Status</h3>
              <p className="text-slate-600 leading-relaxed">
                Track ticket progress in real-time with clear status indicators.
                Know exactly where each ticket stands.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-200">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-amber-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Priority Management</h3>
              <p className="text-slate-600 leading-relaxed">
                Set priorities and manage urgent issues first.
                Optimize your team's response time effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20 bg-slate-50">
        <div className="absolute bottom-10 left-[10%] w-40 h-40 bg-blue-300 rounded-full opacity-20"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-12 shadow-xl text-center">
            <TrendingUp className="w-12 h-12 text-white mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Support?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of teams already using TicketFlow to deliver exceptional customer support.
            </p>
            <button
              onClick={() => onNavigate('signup')}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              aria-label="Get started now"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
