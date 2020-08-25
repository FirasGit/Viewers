import React from 'react';
import { State } from 'react-powerplug';
import { StudyList } from '/home/firas/Desktop/ARISTRA/ML_Deploy/OHIF/Viewers/platform/ui/src/components/index.js';
// Data
import defaultStudies from '/home/firas/Desktop/ARISTRA/ML_Deploy/OHIF/Viewers/platform/ui/src/components/studyList/__docs__/studies.js';
import onSearch from '/home/firas/Desktop/ARISTRA/ML_Deploy/OHIF/Viewers/platform/ui/src/components/studyList/__docs__/onSearch.js';
import moment from 'moment';

const studyList = () => {
  return (
    <State
      initial={{
        searchData: {},
        studies: defaultStudies
          .filter(study => {
            const studyDate = moment(study['studyDate'], 'YYYYMMDD');
            const startDate = moment().subtract(5, 'days');
            const endDate = moment();
            return studyDate.isBetween(startDate, endDate, 'days', '[]');
          })
          .slice(0, 5),
      }}
    >
      {({ state, setState }) => (
        <div
          className="row"
          style={{ backgroundColor: '#000', height: '600px' }}
        >
          <div className="col-xs-12" style={{ padding: 0 }}>
            <StudyList
              studies={state.studies}
              pageOptions={[1, 2, 3, 5, 10, 15, 20, 25, 50, 100]}
              studyListFunctionsEnabled={true}
              onImport={e => alert('Import study mock ' + e)}
              onSelectItem={studyInstanceUid => {
                alert(
                  studyInstanceUid +
                    ' has selected! Now you can open your study.'
                );
              }}
              rowsPerPage={5}
              defaultSort={{ field: 'patientName', order: 'desc' }}
              studyListDateFilterNumDays={7}
              onSearch={onSearch.bind({ setState, defaultStudies })}
            />
          </div>
        </div>
      )}
    </State>
  );
};

export default studyList;
