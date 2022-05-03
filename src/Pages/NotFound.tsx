import React from 'react';
import { FormattedMessage } from 'react-intl';

export const NotFound: React.FC = () => {
  return (
    <div className={'container'}>
      <div style={{ textAlign: 'center' }}>
        <h1>404</h1>
        <h2>
          <FormattedMessage id={'NotFound.message'} />
        </h2>
      </div>
    </div>
  );
};
