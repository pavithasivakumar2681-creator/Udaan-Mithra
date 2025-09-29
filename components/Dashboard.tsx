
import React from 'react';
import type { UserData, SubjectId } from '../types';
import type { View } from '../App';
import { SUBJECTS, LESSONS } from '../constants';
import { useTranslation } from '../hooks/useTranslation';
import { FireIcon, StarIcon, TrophyIcon } from './Icons';

interface DashboardProps {
  userData: UserData;
  onSelectSubject: (subjectId: SubjectId) => void;
  navigateTo: (view: View) => void;
  onLogout: () => void;
}

const StatCard: React.FC<{ icon: React.ReactNode, value: number | string, label: string, color: string }> = ({ icon, value, label, color }) => (
  <div className={`flex items-center p-3 rounded-xl ${color}`}>
    {icon}
    <div className="ml-2">
      <div className="text-white font-bold text-lg">{value}</div>
      <div className="text-white text-sm opacity-90">{label}</div>
    </div>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ userData, onSelectSubject, navigateTo, onLogout }) => {
  const { t, tObj } = useTranslation();

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">{t('welcome_back_dashboard', { name: userData.name || '' })}</h1>
          <p className="text-gray-500">{t('continue_journey')}</p>
        </div>
        <button 
          onClick={onLogout}
          className="bg-orange-100 text-orange-600 font-semibold px-4 py-2 rounded-lg hover:bg-orange-200 transition-colors"
        >
          {t('logout')}
        </button>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={<FireIcon className="w-8 h-8 text-white opacity-80" />} value={userData.streak} label={t('day_streak')} color="bg-gradient-to-br from-orange-400 to-orange-600" />
        <StatCard icon={<StarIcon className="w-8 h-8 text-white opacity-80" />} value={userData.xp.toLocaleString()} label={t('total_xp')} color="bg-gradient-to-br from-yellow-400 to-yellow-500" />
        <button onClick={() => navigateTo('leaderboard')} className="w-full text-left">
          <StatCard icon={<TrophyIcon className="w-8 h-8 text-white opacity-80" />} value="#4" label={t('leaderboard')} color="bg-gradient-to-br from-green-400 to-green-600" />
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">{t('your_subjects')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {SUBJECTS.map(subject => {
            const lessonsForSubject = (LESSONS[subject.id] || []).filter(l => l.grade === userData.grade);
            const completedCount = lessonsForSubject.filter(l => userData.completedLessons.includes(l.id)).length;
            const progress = lessonsForSubject.length > 0 ? (completedCount / lessonsForSubject.length) * 100 : 0;

            return (
              <button
                key={subject.id}
                onClick={() => onSelectSubject(subject.id)}
                className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-orange-400 hover:scale-105 transition-all duration-200 shadow-sm"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${subject.color} mb-3`}>
                  <subject.icon className="w-8 h-8 text-white" />
                </div>
                <span className="font-bold text-gray-800 text-center">{tObj(subject.name)}</span>
                <span className="text-xs text-gray-500 mt-1">{t('lessons_completed', { completed: completedCount, total: lessonsForSubject.length })}</span>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};
