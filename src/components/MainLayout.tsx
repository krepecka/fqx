import { FC, useState } from 'react';

import FormStepContainer from './FormStepContainer';
import ENoteDetailsForm from './ENoteDetailsForm';
import ProfitabilityChart from './ProfitabilityChart';
import useDetailsReducer from '../hooks/useDetailsReducer';

const steps = [
  {
    Component: ENoteDetailsForm,
    stepTitle: 'details',
    submitText: 'Continue',
  },
  {
    Component: ProfitabilityChart,
    stepTitle: 'investment growth',
    submitText: 'Submit',
  },
];

const MainLayout: FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, dispatch] = useDetailsReducer();

  const proceedToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <>
      {steps.map(({ Component, stepTitle, submitText }, index) => (
        <FormStepContainer
          key={stepTitle}
          stepNumber={index + 1}
          stepTitle={stepTitle}
          submitText={submitText}
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
