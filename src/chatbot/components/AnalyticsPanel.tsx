import React from 'react';
import { AnalyticsData, Theme, Language } from '../types';

interface AnalyticsPanelProps {
  data: AnalyticsData;
  onClose: () => void;
  theme: Theme;
  locales: any;
  language: Language;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ data, onClose, theme, locales, language }) => {
  const topSuggestions = Object.entries(data.suggestions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const topTopics = Object.entries(data.topicTags)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
    
  const avgDurationMs = data.chatDurations.length > 0
    ? data.chatDurations.reduce((acc, curr) => acc + curr, 0) / data.chatDurations.length
    : 0;

  const formatDuration = (ms: number) => {
    if (ms === 0) return '0s';
    const totalSeconds = Math.round(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    let result = '';
    if (minutes > 0) {
        result += `${minutes}${locales.analyticsMetricMinutes[language]} `;
    }
    if (seconds > 0 || minutes === 0) {
        result += `${seconds}${locales.analyticsMetricSeconds[language]}`;
    }
    return result.trim();
  }

  const conversionRate = data.totalChats > 0
    ? ((data.totalConversions || 0) / data.totalChats) * 100
    : 0;

  const MetricCard: React.FC<{ title: string; value: string; icon: string }> = ({ title, value, icon }) => (
    <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg text-center flex flex-col">
        <div className="flex items-center justify-center gap-2">
            <i className={`bi ${icon} text-lg text-brand`}></i>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{value}</p>
    </div>
  );


  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-6 animate-slide-up ${theme}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{locales.analyticsPanelTitle[language]}</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition" aria-label={locales.analyticsClose[language]}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <MetricCard title={locales.analyticsTotalChats[language]} value={String(data.totalChats)} icon="bi-chat-dots-fill" />
            <MetricCard title={locales.analyticsAvgChatTime[language]} value={formatDuration(avgDurationMs)} icon="bi-clock-history" />
            <MetricCard title={locales.analyticsConversionRate[language]} value={`${conversionRate.toFixed(1)}%`} icon="bi-bullseye" />
        </div>

        <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{locales.analyticsFeedbackScore[language]}</p>
            <div className="flex justify-center items-center gap-4 mt-2">
                <span className="text-2xl font-bold text-green-500 flex items-center gap-2">
                <i className="bi bi-hand-thumbs-up-fill"></i> {data.feedback.likes}
                </span>
                <span className="text-2xl font-bold text-red-500 flex items-center gap-2">
                <i className="bi bi-hand-thumbs-down-fill"></i> {data.feedback.dislikes}
                </span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">{locales.analyticsTopTopics[language]}</h3>
                {topTopics.length > 0 ? (
                    <ul className="space-y-2">
                    {topTopics.map(([topic, count]) => (
                        <li key={topic} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate pr-4" title={topic}>{topic}</span>
                        <span className="font-bold text-purple-800 dark:text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full text-sm">{count}</span>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">No topic data yet.</p>
                )}
            </div>
            <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">{locales.analyticsTopSuggestions[language]}</h3>
            {topSuggestions.length > 0 ? (
                <ul className="space-y-2">
                {topSuggestions.map(([suggestion, count]) => (
                    <li key={suggestion} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate pr-4" title={suggestion}>{suggestion}</span>
                    <span className="font-bold text-brand-dark dark:text-brand bg-brand/20 dark:bg-brand/30 px-2 py-0.5 rounded-full text-sm">{count}</span>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">No suggestion data yet.</p>
            )}
            </div>
        </div>


      </div>
       <style>{`
        .animate-fade-in {
            animation: fadeIn 0.3s ease-in-out;
        }
        .animate-slide-up {
            animation: slideUp 0.4s ease-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `}</style>
    </div>
  );
};

export default AnalyticsPanel;