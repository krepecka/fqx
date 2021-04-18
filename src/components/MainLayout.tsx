import { FC, useState } from 'react';

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

  return (
    <>
      {steps.map(({ Component, stepTitle }, index) =>
        currentStep >= index ? (
          <FormStepContainer
            key={stepTitle}
            stepNumber={index + 1}
            stepTitle={stepTitle}
          >
            <Component />
          </FormStepContainer>
        ) : null
      )}
    </>
  );
};

export default MainLayout;
