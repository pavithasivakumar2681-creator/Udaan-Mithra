import React, { useState, useMemo } from 'react';
import type { UserData, StudentReport, SubjectId } from '../types';
import { STUDENT_REPORTS, SUBJECTS } from '../constants';
import { useTranslation } from '../hooks/useTranslation';
import { UserGroupIcon, FireIcon, StarIcon, ChartBarIcon, ExclamationTriangleIcon } from './Icons';

interface TeacherDashboardProps {
  userData: UserData;
  onLogout: () => void;
}

const StatCard: React.FC<{ icon: React.ReactNode, value: string | number, label: string, color: string }> = ({ icon, value, label, color }) => (
  <div className={`flex-1 p-4 rounded-xl flex items-center text-white ${color}`}>
    <div className="mr-3">{icon}</div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm opacity-90">{label}</div>
    </div>
  </div>
);

const StudentCard: React.FC<{ report: StudentReport }> = ({ report }) => {
  const { t } = useTranslation();
  const progress = (report.lessonsCompleted / report.totalLessonsInSubject) * 100;
  const subjectInfo = SUBJECTS.find(s => s.id === report.subject);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{report.name}</h3>
          <p className="text-sm text-gray-500">{t('class_grade', { grade: report.grade })}</p>
          <div className="mt-2 text-xs font-semibold text-gray-500">{t('last_active', { date: new Date(report.lastActiveDate).toLocaleDateString() })}</div>
        </div>
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${subjectInfo?.color || 'bg-gray-400'}`}>
          {subjectInfo && <subjectInfo.icon className="w-6 h-6 text-white" />}
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
            <span className="flex items-center text-orange-600 font-semibold"><FireIcon className="w-4 h-4 mr-1"/> {report.streak}</span>
            <span className="flex items-center text-yellow-600 font-semibold"><StarIcon className="w-4 h-4 mr-1"/> {report.xp.toLocaleString()} XP</span>
            <span className="flex items-center text-blue-600 font-semibold"><ChartBarIcon className="w-4 h-4 mr-1"/> {t('avg_score_percent', { score: report.averageScore })}</span>
        </div>
        <div>
          <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
            <span>{t('lesson_progress')}</span>
            <span>{report.lessonsCompleted} / {report.totalLessonsInSubject}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ userData, onLogout }) => {
  const { t } = useTranslation();
  const [activeSubject, setActiveSubject] = useState<SubjectId | 'all'>('all');

  const teacherSubjects = useMemo(() => SUBJECTS.filter(s => userData.selectedSubjects.includes(s.id)), [userData.selectedSubjects]);
  
  const filteredStudents = useMemo(() => {
    return activeSubject === 'all'
      ? STUDENT_REPORTS.filter(report => userData.selectedSubjects.includes(report.subject))
      : STUDENT_REPORTS.filter(report => report.subject === activeSubject);
  }, [activeSubject, userData.selectedSubjects]);

  const stats = useMemo(() => {
    const totalStudents = filteredStudents.length;
    const avgScore = totalStudents > 0 ? Math.round(filteredStudents.reduce((sum, s) => sum + s.averageScore, 0) / totalStudents) : 0;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const activeThisWeek = filteredStudents.filter(s => new Date(s.lastActiveDate) >= sevenDaysAgo).length;
    return { totalStudents, avgScore, activeThisWeek };
  }, [filteredStudents]);

  const studentsNeedingAttention = useMemo(() => {
     const sevenDaysAgo = new Date();
     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
     return filteredStudents.filter(s => s.averageScore < 70 || new Date(s.lastActiveDate) < sevenDaysAgo);
  }, [filteredStudents]);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">{t('teacher_dashboard')}</h1>
          <p className="text-gray-500">{t('welcome_teacher', { name: userData.name || '' })}</p>
        </div>
        <button onClick={onLogout} className="bg-orange-100 text-orange-600 font-semibold px-4 py-2 rounded-lg hover:bg-orange-200 transition-colors">
          {t('logout')}
        </button>
      </header>
      
      <div>
        <h2 className="text-xl font-bold mb-4">{t('class_statistics')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={<UserGroupIcon className="w-8 h-8"/>} value={stats.totalStudents} label={t('total_students')} color="bg-blue-500" />
          <StatCard icon={<ChartBarIcon className="w-8 h-8"/>} value={`${stats.avgScore}%`} label={t('avg_score')} color="bg-green-500" />
          <StatCard icon={<FireIcon className="w-8 h-8"/>} value={stats.activeThisWeek} label={t('active_this_week')} color="bg-orange-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold mb-4">{t('student_analytics')}</h2>
        <div className="border-b border-gray-200 mb-4">
            <nav className="-mb-px flex space-x-4 overflow-x-auto">
                <button onClick={() => setActiveSubject('all')} className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${activeSubject === 'all' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    {t('all_subjects')}
                </button>
                {teacherSubjects.map(sub => (
                    <button key={sub.id} onClick={() => setActiveSubject(sub.id)} className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${activeSubject === sub.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                        {t(sub.id)}
                    </button>
                ))}
            </nav>
        </div>

        {studentsNeedingAttention.length > 0 && (
             <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <div className="flex">
                    <div className="flex-shrink-0">
                        {/* Fix: Pass boolean value for aria-hidden prop */}
                        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden={true} />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-bold text-yellow-800">{t('needs_attention')}</p>
                         <p className="text-sm text-yellow-700">{t('low_score_or_inactive')}</p>
                    </div>
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {studentsNeedingAttention.map(report => (
                        <StudentCard key={report.id} report={report} />
                    ))}
                </div>
            </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.filter(s => !studentsNeedingAttention.find(sna => sna.id === s.id)).map(report => (
            <StudentCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
};
