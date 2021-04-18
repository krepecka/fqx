import { FC, useRef, RefObject, useEffect } from 'react';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';

import './FormStepContainer.scss';

type Props = {
  stepNumber: number;
  stepTitle: string;
  proceedToNextStep: (ref: RefObject<HTMLElement>) => void;
  isVisible: boolean;
};

const FormStepContainer: FC<Props> = ({
  stepNumber,
  stepTitle,
  proceedToNextStep,
  isVisible,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isVisible]);

  return (
    <div ref={containerRef} className="scrollContainer">
      <div className={classnames('formContainer', { visible: isVisible })}>
        <div className="stepHeader">
          <div className="stepNumber">{stepNumber}</div>
          <div className="stepTitle">{stepTitle}</div>
        </div>
        {children}

        <div className="buttonContainer">
          <Button
            onClick={() => proceedToNextStep(containerRef)}
            variant="contained"
            color="primary"
            disableElevation
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormStepContainer;
