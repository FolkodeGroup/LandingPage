import React, { useState, useMemo } from 'react';
import { ProjectScope, Language } from '../types';

interface ProjectScopingWizardProps {
  onConfirm: (scope: ProjectScope) => void;
  locales: any;
  language: Language;
}

const ProjectScopingWizard: React.FC<ProjectScopingWizardProps> = ({ onConfirm, locales, language }) => {
  const [step, setStep] = useState(1);
  const [scope, setScope] = useState<ProjectScope>({
    projectType: '',
    audience: '',
    features: [],
    extraDetails: '',
  });

  const projectTypes = useMemo(() => locales.wizardProjectTypes[language], [locales, language]);

  const featuresForSelectedType = useMemo(() => {
    if (!scope.projectType) return [];
    
    const selectedType = projectTypes.find((pt: any) => pt.label === scope.projectType);
    if (!selectedType) return [];
    
    return locales.wizardFeatures[language][selectedType.id] || [];
  }, [scope.projectType, projectTypes, locales, language]);


  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);
  const handleFinish = () => onConfirm(scope);

  const toggleFeature = (feature: string) => {
    setScope(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h4 className="font-bold text-lg mb-4 text-center">{locales.wizardStep1Title[language]}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {projectTypes.map((pt: any) => (
                <button
                  key={pt.id}
                  onClick={() => { setScope({ ...scope, projectType: pt.label, features: [] }); handleNext(); }}
                  className="flex flex-col items-center justify-center p-3 text-center rounded-lg border-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-brand hover:text-brand transition-all h-28"
                >
                  <i className={`bi ${pt.icon} text-3xl mb-2`}></i>
                  <span className="font-semibold text-sm">{pt.label}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h4 className="font-bold text-lg mb-4">{locales.wizardStep2Title[language]}</h4>
            <input
              type="text"
              value={scope.audience}
              onChange={e => setScope({ ...scope, audience: e.target.value })}
              placeholder={locales.wizardStep2Placeholder[language]}
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h4 className="font-bold text-lg mb-4">{locales.wizardStep3Title[language]}</h4>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2">
              {featuresForSelectedType.map((feature: string) => (
                <label key={feature} className="flex items-center p-2 rounded-lg bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <input
                    type="checkbox"
                    checked={scope.features.includes(feature)}
                    onChange={() => toggleFeature(feature)}
                    className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
           <div>
            <h4 className="font-bold text-lg mb-4">{locales.wizardStep4Title[language]}</h4>
            <textarea
              value={scope.extraDetails}
              onChange={e => setScope({ ...scope, extraDetails: e.target.value })}
              placeholder={locales.wizardStep4Placeholder[language]}
              rows={3}
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
        )
      default:
        return null;
    }
  };

  return (
    <div className="p-4 rounded-2xl max-w-md w-full break-words shadow-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
      <div className="p-2 space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 text-center">{locales.wizardTitle[language]}</h3>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5">
            <div className="bg-brand h-2.5 rounded-full" style={{ width: `${(step / 4) * 100}%`, transition: 'width 0.3s' }}></div>
        </div>
        
        <div className="min-h-[200px] flex items-center justify-center">
            {renderStep()}
        </div>

        <div className="flex justify-between items-center">
          <button onClick={handleBack} disabled={step === 1} className="px-4 py-2 rounded-lg font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50">
            {locales.wizardBack[language]}
          </button>
          {step < 4 ? (
            <button onClick={handleNext} disabled={(step === 2 && !scope.audience) || (step === 1 && !scope.projectType)} className="px-6 py-2 rounded-lg font-bold text-white bg-brand hover:bg-brand-dark disabled:bg-gray-400">
               {locales.wizardNext[language]}
            </button>
          ) : (
            <button onClick={handleFinish} className="px-6 py-2 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700">
                {locales.wizardFinish[language]}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectScopingWizard;