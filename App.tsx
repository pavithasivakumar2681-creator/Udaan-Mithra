
import React, { useState, useCallback } from 'react';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { LessonView } from './components/LessonView';
import { Leaderboard } from './components/Leaderboard';
import { SubjectLessonsView } from './components/SubjectLessonsView';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useUserData } from './hooks/useUserData';
import type { Lesson, SubjectId, UserRole } from './types';

export type View = 'signup' | 'login' | 'onboarding' | 'dashboard' | 'teacherDashboard' | 'subjectLessons' | 'lesson' | 'leaderboard';

export default function App() {
  const { userData, signUpUser, logout, selectSubjects, completeLesson, setDailyGoal, isLoading } = useUserData();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeSubjectId, setActiveSubjectId] = useState<SubjectId | null>(null);
  const [loginError, setLoginError] = useState('');

  React.useEffect(() => {
    if (!isLoading) {
      if (!userData.email) {
        setCurrentView('signup');
      } else {
        setCurrentView('login');
      }
    }
  }, [userData.email, isLoading]);
  
  const handleSignUp = useCallback((name: string, email: string, role: UserRole, grade: 11 | 12 | null, subjects: SubjectId[]) => {
    signUpUser(name, email, role, grade, subjects);
    if (role === 'student') {
      setCurrentView('onboarding');
    } else {
      setCurrentView('teacherDashboard');
    }
  }, [signUpUser]);

  const handleLogin = useCallback((email: string) => {
    if (email.toLowerCase() === userData.email?.toLowerCase()) {
      setLoginError('');
      if (userData.role === 'student' && (!userData.selectedSubjects || userData.selectedSubjects.length === 0)) {
        setCurrentView('onboarding');
      } else {
        setCurrentView(userData.role === 'student' ? 'dashboard' : 'teacherDashboard');
      }
    } else {
      setLoginError("Email not found. Please sign up.");
    }
  }, [userData.role, userData.selectedSubjects, userData.email]);

  const handleLogout = useCallback(() => {
    logout();
    setCurrentView('login');
  }, [logout]);
  
  const handleOnboardingComplete = useCallback((subjects: SubjectId[], goal: number) => {
    selectSubjects(subjects);
    setDailyGoal(goal);
    setCurrentView('dashboard');
  }, [selectSubjects, setDailyGoal]);

  const handleSelectSubject = useCallback((subjectId: SubjectId) => {
    setActiveSubjectId(subjectId);
    setCurrentView('subjectLessons');
  }, []);
  
  const handleStartLesson = useCallback((lesson: Lesson) => {
    setActiveLesson(lesson);
    setCurrentView('lesson');
  }, []);

  const handleLessonComplete = useCallback((lessonId: string, score: number, totalQuestions: number) => {
    const xpGained = (score / totalQuestions) * (activeLesson?.xp || 50);
    completeLesson(lessonId, Math.round(xpGained));
    setCurrentView('subjectLessons'); // Return to subject lesson list
    setActiveLesson(null);
  }, [completeLesson, activeLesson]);

  const navigateTo = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 to-orange-600">
        <h1 className="text-4xl font-bold text-white animate-pulse">Udaan Mithra</h1>
      </div>
    );
  }
  
  const renderContent = () => {
    switch (currentView) {
      case 'signup':
        return <Signup onSignup={handleSignUp} onSwitchToLogin={() => setCurrentView('login')} />;
      case 'login':
        return <Login userData={userData} onLogin={handleLogin} onSwitchToSignup={() => setCurrentView('signup')} error={loginError} />;
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'teacherDashboard':
        return <TeacherDashboard userData={userData} onLogout={handleLogout} />;
      case 'subjectLessons':
        return activeSubjectId && <SubjectLessonsView subjectId={activeSubjectId} userData={userData} onStartLesson={handleStartLesson} onBack={() => setCurrentView('dashboard')} />;
      case 'lesson':
        return activeLesson && <LessonView lesson={activeLesson} onComplete={handleLessonComplete} onBack={() => setCurrentView('subjectLessons')} />;
      case 'leaderboard':
        return <Leaderboard currentUser={userData} onBack={() => setCurrentView('dashboard')} />;
      case 'dashboard':
      default:
        return (
          <Dashboard
            userData={userData}
            onSelectSubject={handleSelectSubject}
            navigateTo={navigateTo}
            onLogout={handleLogout}
          />
        );
    }
  };
  
  const showHeader = !['signup', 'login', 'onboarding'].includes(currentView);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {showHeader && (
        <header className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 flex justify-end">
           <LanguageSwitcher />
        </header>
      )}
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 pt-0">
        {renderContent()}
      </main>
    </div>
  );
}
