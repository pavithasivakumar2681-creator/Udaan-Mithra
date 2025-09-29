import React from 'react';
import type { UserData, Lesson, SubjectId } from '../types';
import { SUBJECTS, LESSONS } from '../constants';
import { useTranslation } from '../hooks/useTranslation';
import { BookOpenIcon, CheckCircleIcon } from './Icons';

interface SubjectLessonsViewProps {
  subjectId: SubjectId;
  userData: UserData;
  onStartLesson: (lesson: Lesson) => void;
  onBack: () => void;
}

export const SubjectLessonsView: React.FC<SubjectLessonsViewProps> = ({ subjectId, userData, onStartLesson, onBack }) => {
  const { t, tObj } = useTranslation();
  
  const subject = SUBJECTS.find(s => s.id === subjectId);
  const lessons = (LESSONS[subjectId] || []).filter(lesson => lesson.grade === userData.grade);

  if (!subject) {
    return (
      <div>
        <button onClick={onBack} className="text-gray-500 hover:text-gray-800 mb-4">&larr; {t('back')}</button>
        <p>Subject not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
        <header className="flex items-center mb-4">
          <button onClick={onBack} className="text-orange-600 hover:text-orange-800 p-2 rounded-full mr-2 -ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-2xl font-extrabold text-gray-800">{t('lessons_for_subject', { subject: tObj(subject.name) })}</h1>
        </header>

        {lessons.map((lesson) => {
          const isCompleted = userData.completedLessons.includes(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => onStartLesson(lesson)}
              className="w-full text-left p-5 rounded-xl transition-transform duration-200 transform bg-white shadow-md hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 ${
                        isCompleted ? 'bg-green-500' : subject.color
                    }`}>
                        {isCompleted ? <CheckCircleIcon className="w-7 h-7 text-white" /> : <BookOpenIcon className="w-7 h-7 text-white" />}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">{tObj(lesson.title)}</h3>
                        <p className="text-sm text-gray-500">{t('earn_xp', {xp: lesson.xp})}</p>
                    </div>
                </div>
                {!isCompleted && <div className="bg-yellow-400 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">{t('start')}</div>}
              </div>
            </button>
          );
        })}
      </div>
  );
};
