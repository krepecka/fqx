import { FC } from 'react';
import FormStepContainer from './FormStepContainer';

import ENoteDetailsForm from './ENoteDetailsForm';

const MainLayout: FC = () => {
  return (
    <>
      <FormStepContainer stepNumber={1} stepTitle={'details'}>
        <ENoteDetailsForm />
      </FormStepContainer>
    </>
  );
};

export default MainLayout;
