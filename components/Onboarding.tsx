
import React, { useState } from 'react';
import { SUBJECTS } from '../constants';
import type { SubjectId } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface OnboardingProps {
  onComplete: (subjects: SubjectId[], goal: number) => void;
}

const goals = [10, 15, 20, 30];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>([]);
  const [dailyGoal, setDailyGoal] = useState<number>(15);
  const { t, tObj } = useTranslation();

  const toggleSubject = (subjectId: SubjectId) => {
    setSelectedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleNext = () => {
    if (selectedSubjects.length > 0) {
      setStep(2);
    }
  };

  const handleComplete = () => {
    if (selectedSubjects.length > 0) {
      onComplete(selectedSubjects, dailyGoal);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center transition-all duration-500">
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('choose_subjects')}</h1>
            <p className="text-gray-500 mb-6">{t('change_later')}</p>
            <div className="grid grid-cols-2 gap-4">
              {SUBJECTS.map(subject => (
                <button
                  key={subject.id}
                  onClick={() => toggleSubject(subject.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedSubjects.includes(subject.id)
                      ? 'border-orange-500 bg-orange-50 scale-105'
                      : 'border-gray-200 bg-white hover:border-orange-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${subject.color} mb-2`}>
                     <subject.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700">{tObj(subject.name)}</span>
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={selectedSubjects.length === 0}
              className="mt-8 w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:shadow-none"
            >
              {t('continue')}
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('set_daily_goal')}</h1>
            <p className="text-gray-500 mb-6">{t('learning_adds_up')}</p>
            <div className="flex justify-center space-x-3">
              {goals.map(goal => (
                <button
                  key={goal}
                  onClick={() => setDailyGoal(goal)}
                  className={`px-4 py-8 rounded-xl border-2 transition-all duration-200 flex-1 ${
                    dailyGoal === goal
                      ? 'border-orange-500 bg-orange-50 scale-105'
                      : 'border-gray-200 bg-white hover:border-orange-300'
                  }`}
                >
                  <span className="text-2xl font-bold text-gray-800">{goal}</span>
                  <span className="text-gray-500 block">{t('minutes_short')}</span>
                </button>
              ))}
            </div>
            <button
              onClick={handleComplete}
              className="mt-8 w-full bg-gradient-to-r from-green-500 to-green-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {t('start_learning')}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
