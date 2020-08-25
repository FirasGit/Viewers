import React from 'react';
import { State } from 'react-powerplug';
import {
  TableList,
  TableListItem,
} from '/home/firas/Desktop/ARISTRA/ML_Deploy/OHIF/Viewers/platform/ui/src/components/tableList/index.js';
import { useSelector } from 'react-redux';

const getViewportSpecificData = () => {
  const viewportSpecificData = useSelector(
    state => state.viewports.viewportSpecificData
  );
  return viewportSpecificData;
};

const getActiveViewportIndex = () => {
  const activeViewportIndex = useSelector(
    state => state.viewports.activeViewportIndex
  );
  return activeViewportIndex;
};
const getCurrentUIDs = () => {
  const viewportSpecificData = getViewportSpecificData();
  const activeViewportIndex = getActiveViewportIndex();

  const {
    SeriesInstanceUID,
    StudyInstanceUID,
    SOPInstanceUID,
  } = viewportSpecificData[activeViewportIndex];

  return { SeriesInstanceUID, StudyInstanceUID, SOPInstanceUID };
};

const tableList = () => {
  const { SOPInstanceUID } = getCurrentUIDs();
  return (
    <State
      initial={{
        selectedIndex: null,
        listItems: [{ label: 'Gaussian Filter' }, { label: 'nnUNet' }],
      }}
    >
      {({ state, setState }) => (
        <TableList headerTitle="Available Algorithms">
          {state.listItems.map((item, index) => {
            return (
              <TableListItem
                key={`item_${index}`}
                itemClass={state.selectedIndex === index ? 'selected' : ''}
                itemIndex={index}
                onItemClick={() =>
                  alert(item.label + ' is used. ' + SOPInstanceUID)
                }
              >
                <label>{item.label}</label>
              </TableListItem>
            );
          })}
        </TableList>
      )}
    </State>
  );
};

export default tableList;
