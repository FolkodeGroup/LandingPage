
import React from 'react';
import { SummaryReport, Language } from '../types';

interface SummaryReportViewProps {
  summaryReport: SummaryReport;
  locales: any;
  language: Language;
}

const SummaryReportView: React.FC<SummaryReportViewProps> = ({ summaryReport, locales, language }) => {
  const temperatureColors = {
      Hot: 'bg-red-500 text-red-100',
      Warm: 'bg-orange-500 text-orange-100',
      Cold: 'bg-blue-500 text-blue-100',
  };

  const scoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 5) return 'text-yellow-400';
    return 'text-red-400';
  }

  return (
    <div className="space-y-4 text-sm">
      <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{locales.chatSummaryTitle[language]}</h3>
      
      {summaryReport.painPoint && (
         <div>
            <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wider">{locales.painPointLabel[language]}</p>
            <p className="italic text-gray-700 dark:text-gray-300">"{summaryReport.painPoint}"</p>
         </div>
      )}
      
      <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap font-mono">{summaryReport.summary}</p>
      
      <div className="flex flex-wrap items-start gap-4 pt-2 border-t border-gray-300 dark:border-gray-600">
        
        {summaryReport.leadScore && (
             <div className="flex-shrink-0">
                <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-1">{locales.leadScoreLabel[language]}</p>
                <p className={`text-2xl font-bold ${scoreColor(summaryReport.leadScore)}`}>{summaryReport.leadScore} / 10</p>
             </div>
        )}

        <div className="flex-shrink-0">
          <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-1">{locales.leadTemperatureLabel[language]}</p>
          <span className={`px-3 py-1 text-sm font-bold rounded-full ${temperatureColors[summaryReport.temperature] || 'bg-gray-500 text-gray-100'}`}>
            {summaryReport.temperature}
          </span>
        </div>
        
        <div className="flex-1 min-w-[100px]">
          <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-1">{locales.tagsLabel[language]}</p>
          <div className="flex flex-wrap gap-2">
            {summaryReport.tags.map(tag => (
              <span key={tag} className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {(summaryReport.budgetMention || summaryReport.timelineMention) && (
        <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-600 pt-2">
            {summaryReport.budgetMention && <p><strong>Budget Note:</strong> {summaryReport.budgetMention}</p>}
            {summaryReport.timelineMention && <p><strong>Timeline Note:</strong> {summaryReport.timelineMention}</p>}
        </div>
      )}
    </div>
  );
};

export default SummaryReportView;