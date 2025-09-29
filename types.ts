
export type SubjectId = 'punjabi' | 'math' | 'physics' | 'chemistry' | 'biology' | 'computer_science' | 'english';

export type UserRole = 'student' | 'teacher';
export type Language = 'en' | 'hi' | 'pa';

export interface LocalizedString {
  en: string;
  hi: string;
  pa: string;
}

export interface Subject {
  id: SubjectId;
  name: LocalizedString;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface Question {
  question: LocalizedString;
  options: LocalizedString[];
  correctAnswer: number;
}

export interface Lesson {
  id: string;
  title: LocalizedString;
  xp: number;
  grade: 11 | 12;
  questions: Question[];
}

export interface UserData {
  name: string | null;
  email: string | null;
  role: UserRole | null;
  grade: 11 | 12 | null;
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  dailyGoal: number; // in minutes
  selectedSubjects: SubjectId[];
  completedLessons: string[];
}

export interface StudentReport {
  id: string;
  name: string;
  grade: 11 | 12;
  xp: number;
  streak: number;
  lessonsCompleted: number;
  totalLessonsInSubject: number;
  subject: SubjectId;
  averageScore: number; // 0-100
  lastActiveDate: string; // YYYY-MM-DD
}
