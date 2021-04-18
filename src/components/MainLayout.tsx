import { FC, useState, RefObject } from 'react';

import FormStepContainer from './FormStepContainer';
import ENoteDetailsForm from './ENoteDetailsForm';

const steps = [
  {
    Component: ENoteDetailsForm,
    stepTitle: 'details',
  },
  {
    Component: ENoteDetailsForm,
    stepTitle: 'investment growth',
  },
];

const MainLayout: FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

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
          <Component />
        </FormStepContainer>
      ))}
    </>
  );
};

export default MainLayout;
