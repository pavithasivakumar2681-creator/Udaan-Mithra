import React, { useState } from 'react';
import type { Lesson } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { CheckCircleIcon, XCircleIcon, StarIcon, TrophyIcon } from './Icons';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: (lessonId: string, score: number, totalQuestions: number) => void;
  onBack: () => void;
}

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export const LessonView: React.FC<LessonViewProps> = ({ lesson, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const { t, tObj } = useTranslation();

  const questions = lesson.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const isFinished = currentQuestionIndex >= questions.length;

  const handleAnswer = (optionIndex: number) => {
    if (answerState !== 'unanswered') return;

    setSelectedAnswer(optionIndex);
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
      setAnswerState('correct');
    } else {
      setAnswerState('incorrect');
    }
  };

  const handleNext = () => {
    setAnswerState('unanswered');
    setSelectedAnswer(null);
    setCurrentQuestionIndex(i => i + 1);
  };
  
  if (isFinished) {
    const xpGained = questions.length > 0 ? Math.round((score / questions.length) * lesson.xp) : lesson.xp;
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl shadow-xl">
        <TrophyIcon className="w-20 h-20 text-yellow-400" />
        <h1 className="text-3xl font-extrabold text-green-600 mt-4">{t('lesson_complete')}</h1>
        <p className="text-gray-600 mt-2">{t('great_job', { title: tObj(lesson.title) })}</p>
        
        <div className="flex items-center space-x-8 my-8">
            <div className="text-center">
                <p className="text-3xl font-bold text-gray-800">{score}/{questions.length}</p>
                <p className="text-gray-500">Score</p>
            </div>
            <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500 flex items-center">
                    <StarIcon className="w-7 h-7 mr-1" />
                    {xpGained}
                </p>
                <p className="text-gray-500">XP Earned</p>
            </div>
        </div>

        <button
          onClick={() => onComplete(lesson.id, score, questions.length)}
          className="w-full max-w-xs bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          {t('continue')}
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-orange-600 hover:text-orange-800 p-2 rounded-full -ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="text-gray-500 font-semibold">{currentQuestionIndex + 1} / {questions.length}</div>
      </div>
       <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <p className="text-2xl font-semibold text-gray-800 mb-8 min-h-[6rem] flex items-center justify-center text-center">{tObj(currentQuestion.question)}</p>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = currentQuestion.correctAnswer === index;
            
            let stateStyles = 'border-gray-200 bg-white hover:bg-orange-50 text-gray-700';
            
            if (answerState !== 'unanswered') {
                if (isSelected && answerState === 'correct') {
                    stateStyles = 'border-green-500 bg-green-50 text-green-800 scale-105';
                } else if (isSelected && answerState === 'incorrect') {
                    stateStyles = 'border-red-500 bg-red-50 text-red-800';
                } else if (isCorrectAnswer) {
                    stateStyles = 'border-green-500 bg-green-50 text-green-800';
                } else {
                    stateStyles = 'border-gray-200 bg-gray-50 text-gray-400';
                }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answerState !== 'unanswered'}
                className={`flex items-center justify-between w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${stateStyles}`}
              >
                <span className="font-semibold">{tObj(option)}</span>
                {answerState !== 'unanswered' && isCorrectAnswer && <CheckCircleIcon className="w-6 h-6 text-green-600" />}
                {answerState === 'incorrect' && isSelected && <XCircleIcon className="w-6 h-6 text-red-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {answerState !== 'unanswered' && (
        <div className="mt-6 flex items-center justify-end">
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 px-10 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            {t('next')}
          </button>
        </div>
      )}
    </div>
  );
};
