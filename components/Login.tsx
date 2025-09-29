
import React, { useState } from 'react';
import type { UserData } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface LoginProps {
  userData: UserData;
  onLogin: (email: string) => void;
  onSwitchToSignup: () => void;
  error: string;
}

export const Login: React.FC<LoginProps> = ({ userData, onLogin, onSwitchToSignup, error }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState(userData.email || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('welcome_back_login')}</h1>
        <p className="text-gray-500 mb-6">{userData.name ? t('welcome_back_dashboard', { name: userData.name }) : t('login_to_continue')}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">{t('email_address')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder={t('email_address_placeholder')}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
            disabled={!email}
          >
            {t('continue_learning')}
          </button>
        </form>
        
        <button
          onClick={onSwitchToSignup}
          className="mt-4 text-sm text-gray-500 hover:text-orange-600"
        >
          {t('not_you')}
        </button>
      </div>
    </div>
  );
};
