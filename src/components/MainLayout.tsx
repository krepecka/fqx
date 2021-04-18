import { FC, useState } from 'react';

import FormStepContainer from './FormStepContainer';
import ENoteDetailsForm from './ENoteDetailsForm';
import ProfitabilityChart from './ProfitabilityChart';
import useDetailsFormReducer from '../hooks/useDetailsFormReducer';

const steps = [
  {
    Component: ENoteDetailsForm,
    stepTitle: 'details',
  },
  {
    Component: ProfitabilityChart,
    stepTitle: 'investment growth',
  },
];

const MainLayout: FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, dispatch] = useDetailsFormReducer();

  const proceedToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <>
      {steps.map(({ Component, stepTitle }, index) => (
        <FormStepContainer
          key={stepTitle}
          stepNumber={index + 1}
          stepTitle={stepTitle}
          proceedToNextStep={proceedToNextStep}
          isVisible={currentStep >= index}
        >
          <Component state={state} dispatch={dispatch} />
        </FormStepContainer>
      ))}
    </>
  );
};

export default MainLayout;
