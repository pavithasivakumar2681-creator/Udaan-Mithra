
import { useState, useEffect, useCallback } from 'react';
import type { UserData, SubjectId, UserRole } from '../types';

const USER_DATA_KEY = 'udaanMithraUserData';

const getInitialUserData = (): UserData => {
  const savedData = localStorage.getItem(USER_DATA_KEY);
  if (savedData) {
     try {
      const parsedData = JSON.parse(savedData);
      if (parsedData.name && parsedData.role && parsedData.email) {
        return parsedData;
      }
    } catch (e) {
      console.error("Failed to parse user data", e);
      localStorage.removeItem(USER_DATA_KEY);
    }
  }
  return {
    name: null,
    email: null,
    role: null,
    grade: null,
    xp: 0,
    streak: 0,
    lastActiveDate: null,
    dailyGoal: 15,
    selectedSubjects: [],
    completedLessons: [],
  };
};

export function useUserData() {
  const [userData, setUserData] = useState<UserData>(getInitialUserData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = getInitialUserData();
    
    const today = new Date().toISOString().split('T')[0];
    const lastActive = data.lastActiveDate;
    if (lastActive) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastActive !== today && lastActive !== yesterdayStr) {
        data.streak = 0;
      }
    }
    setUserData(data);
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    }
  }, [userData, isLoading]);
  
  const signUpUser = useCallback((name: string, email: string, role: UserRole, grade: 11 | 12 | null, subjects: SubjectId[]) => {
    const newUser: UserData = {
        name,
        email,
        role,
        grade,
        xp: 0,
        streak: 0,
        lastActiveDate: null,
        dailyGoal: 15,
        selectedSubjects: subjects, // Used for student's learning subjects or teacher's teaching subjects
        completedLessons: [],
    };
    setUserData(newUser);
  }, []);

  const logout = useCallback(() => {
    setUserData({
      name: null,
      email: null,
      role: null,
      grade: null,
      xp: 0,
      streak: 0,
      lastActiveDate: null,
      dailyGoal: 15,
      selectedSubjects: [],
      completedLessons: [],
    });
    localStorage.removeItem(USER_DATA_KEY);
  }, []);


  const selectSubjects = useCallback((subjects: SubjectId[]) => {
    setUserData(prev => ({ ...prev, selectedSubjects: subjects }));
  }, []);

  const setDailyGoal = useCallback((minutes: number) => {
    setUserData(prev => ({ ...prev, dailyGoal: minutes }));
  }, []);

  const completeLesson = useCallback((lessonId: string, xpGained: number) => {
    setUserData(prev => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }

      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      let newStreak = prev.streak;
      if (prev.lastActiveDate === yesterdayStr) {
        newStreak += 1;
      } else if (prev.lastActiveDate !== todayStr) {
        newStreak = 1;
      }

      return {
        ...prev,
        xp: prev.xp + xpGained,
        streak: newStreak,
        lastActiveDate: todayStr,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  }, []);

  return { userData, signUpUser, logout, selectSubjects, setDailyGoal, completeLesson, isLoading };
}
