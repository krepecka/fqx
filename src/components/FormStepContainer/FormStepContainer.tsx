import { FC } from 'react';
import './FormStepContainer.scss';

type Props = {
  stepNumber: number;
  stepTitle: string;
};

const FormStepContainer: FC<Props> = ({ stepNumber, stepTitle, children }) => {
  return (
    <div className="formContainer">
      <div className="stepHeader">
        <div className="stepNumber">{stepNumber}</div>
        <div className="stepTitle">{stepTitle}</div>
      </div>
      {children}
    </div>
  );
};

export default FormStepContainer;
