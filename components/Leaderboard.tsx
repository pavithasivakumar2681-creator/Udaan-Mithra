
import React from 'react';
import { LEADERBOARD_DATA } from '../constants';
import type { UserData } from '../types';
import { TrophyIcon } from './Icons';
import { useTranslation } from '../hooks/useTranslation';

interface LeaderboardProps {
  currentUser: UserData;
  onBack: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ currentUser, onBack }) => {
  const { t } = useTranslation();
  const sortedLeaderboard = [...LEADERBOARD_DATA]
    .map(user => user.name === 'You' ? { ...user, xp: currentUser.xp } : user)
    .sort((a, b) => b.xp - a.xp);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-800 text-lg">&larr; {t('back')}</button>
        <h1 className="text-2xl font-extrabold text-gray-800 flex items-center">
          <TrophyIcon className="w-7 h-7 text-yellow-500 mr-2" />
          {t('leaderboard')}
        </h1>
        <div className="w-12"></div>
      </div>

      <div className="space-y-3">
        {sortedLeaderboard.map((user, index) => {
          const isCurrentUser = user.name === 'You';
          const rank = index + 1;
          
          let rankIcon;
          if (rank === 1) rankIcon = <span className="text-yellow-400">🥇</span>;
          else if (rank === 2) rankIcon = <span className="text-gray-400">🥈</span>;
          else if (rank === 3) rankIcon = <span className="text-orange-400">🥉</span>;
          else rankIcon = <span className="text-gray-500">{rank}</span>;

          return (
            <div
              key={user.name}
              className={`flex items-center p-4 rounded-lg transition-all duration-200 ${
                isCurrentUser ? 'bg-orange-100 border-2 border-orange-400 scale-105' : 'bg-gray-50'
              }`}
            >
              <div className="w-8 text-lg font-bold text-center">{rankIcon}</div>
              <div className="flex-1 ml-4">
                <p className={`font-bold ${isCurrentUser ? 'text-orange-800' : 'text-gray-800'}`}>{user.name}</p>
              </div>
              <div className="text-right">
                <p className={`font-bold text-lg ${isCurrentUser ? 'text-orange-700' : 'text-gray-600'}`}>{user.xp.toLocaleString()} XP</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
