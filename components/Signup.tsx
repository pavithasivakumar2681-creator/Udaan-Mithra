
import React, { useState } from 'react';
import type { UserRole, SubjectId } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { SUBJECTS } from '../constants';

interface SignupProps {
  onSignup: (name: string, email: string, role: UserRole, grade: 11 | 12 | null, subjects: SubjectId[]) => void;
  onSwitchToLogin: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onSignup, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [grade, setGrade] = useState<11 | 12>(11);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>([]);
  const [error, setError] = useState('');
  const { t, tObj } = useTranslation();

  const toggleSubject = (subjectId: SubjectId) => {
    setSelectedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError(t('valid_name_error'));
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError(t('valid_email_error'));
      return;
    }
    setError('');
    onSignup(name, email, role, role === 'student' ? grade : null, role === 'teacher' ? selectedSubjects : []);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">{t('get_started')}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('full_name')}</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder={t('name_placeholder')}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('email_address')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder={t('email_address_placeholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{t('i_am_a')}</label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setRole('student')} className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${role === 'student' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-gray-50'}`}>{t('student')}</button>
              <button type="button" onClick={() => setRole('teacher')} className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${role === 'teacher' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-gray-50'}`}>{t('teacher')}</button>
            </div>
          </div>

          {role === 'student' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('my_grade')}</label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setGrade(11)} className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${grade === 11 ? 'bg-green-50 border-green-500 text-green-700' : 'bg-gray-50'}`}>{t('class_11')}</button>
                <button type="button" onClick={() => setGrade(12)} className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${grade === 12 ? 'bg-green-50 border-green-500 text-green-700' : 'bg-gray-50'}`}>{t('class_12')}</button>
              </div>
            </div>
          )}
          
          {role === 'teacher' && (
            <div>
                <label className="block text-sm font-medium text-gray-700">{t('select_subjects_teacher')}</label>
                 <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SUBJECTS.map(subject => (
                        <button
                        type="button"
                        key={subject.id}
                        onClick={() => toggleSubject(subject.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 text-xs ${
                            selectedSubjects.includes(subject.id)
                            ? 'border-orange-500 bg-orange-50 scale-105'
                            : 'border-gray-200 bg-white hover:border-orange-300'
                        }`}
                        >
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${subject.color} mb-1`}>
                            <subject.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-gray-700">{tObj(subject.name)}</span>
                        </button>
                    ))}
                </div>
            </div>
          )}


          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
            disabled={!name || !email}
          >
            {t('create_account')}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          {t('already_have_account')}{' '}
          <button onClick={onSwitchToLogin} className="font-semibold text-orange-600 hover:underline">{t('login')}</button>
        </p>
      </div>
    </div>
  );
};
