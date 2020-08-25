import React from 'react';

import { Playground, Props } from 'docz';
import { State } from 'react-powerplug';
import { LayoutButton } from '/home/firas/Desktop/ARISTRA/ML_Deploy/OHIF/Viewers/platform/ui/src/components/layoutButton/index.js';
import '/home/firas/Desktop/ARISTRA/ML_Deploy/OHIF/Viewers/platform/ui/src/components/layoutButton/__docs__/layoutButton.css';
import NameSpace from '/home/firas/Desktop/ARISTRA/ML_Deploy/OHIF/Viewers/platform/ui/src/__docs__/NameSpace';

const layoutButton = () => {
  return (
    <State
      initial={{
        selectedCell: {
          className: 'hover',
          col: 1,
          row: 1,
        },
      }}
    >
      {({ state, setState }) => (
        <React.Fragment>
          {/* STATE */}
          <div>
            <pre>{JSON.stringify(state, null, 2)}</pre>
          </div>

          {/* COMPONENT */}
          <div className="LayoutExample">
            <LayoutButton
              {...state}
              onChange={cell => setState({ selectedCell: cell })}
            />
          </div>
        </React.Fragment>
      )}
    </State>
  );
};

export default layoutButton;
