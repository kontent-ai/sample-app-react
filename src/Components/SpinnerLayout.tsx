import { Spinner } from '@simply007org/react-spinners';
import React from 'react';

interface SpinnerLayoutProps {
  children: React.ReactNode;
}

const SpinnerLayout: React.FC<SpinnerLayoutProps> = ({ children }) => {
  return (
    <div id="spinnerBox">
      <Spinner name="apiSpinner" show={false}>
        <div className="loader-bg">
          <div className="loader" />
        </div>
      </Spinner>
      {children}
    </div>
  );
};

export default SpinnerLayout;
