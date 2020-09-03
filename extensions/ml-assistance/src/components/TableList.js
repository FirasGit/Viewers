// TODO: Make reloading a promise based approach
// TODO: Add nnUNet

import React from 'react';
import { State } from 'react-powerplug';
import {
  TableList,
  TableListItem,
} from '@ohif/ui/src/components/tableList/index.js';
import { useSelector } from 'react-redux';
import {
  generate_orthanc_identifier_instance,
  generate_orthanc_identifier_study,
} from '../orthanc_identifier';
const http = require('http');

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

const getPatientID = () => {
  const PatientID = useSelector(
    state => state.timepointManager.timepoints[0].PatientID
  );
  return PatientID;
};

const getCurrentUIDs = () => {
  const viewportSpecificData = getViewportSpecificData();
  const activeViewportIndex = getActiveViewportIndex();

  const {
    SeriesInstanceUID,
    StudyInstanceUID,
    SOPInstanceUID,
  } = viewportSpecificData[activeViewportIndex];

  const PatientID = getPatientID();

  return { PatientID, SeriesInstanceUID, StudyInstanceUID, SOPInstanceUID };
};

const process_image = (
  PatientID,
  StudyInstanceUID,
  SeriesInstanceUID,
  SOPInstanceUID
) => {
  let image_processing_server_URL = 'http://localhost:5000/series/';

  let orthanc_identifier = generate_orthanc_identifier_study(
    PatientID,
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID
  );

  http.get(image_processing_server_URL + orthanc_identifier, resp => {
    // Force webpage to reload to include the processed image
  });
  document.location.reload(true); // TODO: Make this a promise based approach
};

const tableList = () => {
  const {
    PatientID,
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
  } = getCurrentUIDs();
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
                  process_image(
                    PatientID,
                    StudyInstanceUID,
                    SeriesInstanceUID,
                    SOPInstanceUID
                  )
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
