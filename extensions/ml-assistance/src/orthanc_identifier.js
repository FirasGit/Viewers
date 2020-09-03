var crypto = require('crypto');

function insert_dash(orthanc_identifier_) {
  let orthanc_identifier = '';
  for (let i = 0; i <= 32; i += 8) {
    orthanc_identifier += orthanc_identifier_.substring(i, i + 8);
    if (i < 32) {
      orthanc_identifier += '-';
    }
  }
  return orthanc_identifier;
}

function generate_orthanc_identifier_instance(
  PatientID,
  StudyInstanceUID,
  SeriesInstanceUID,
  SOPInstanceUID
) {
  var shasum = crypto.createHash('sha1');

  shasum.update(
    PatientID +
      '|' +
      StudyInstanceUID +
      '|' +
      SeriesInstanceUID +
      '|' +
      SOPInstanceUID
  );

  let orthanc_identifier_ = shasum.digest('hex');
  let orthanc_identifier = insert_dash(orthanc_identifier_);
  return orthanc_identifier;
}

function generate_orthanc_identifier_study(
  PatientID,
  StudyInstanceUID,
  SeriesInstanceUID,
  SOPInstanceUID
) {
  var shasum = crypto.createHash('sha1');

  shasum.update(PatientID + '|' + StudyInstanceUID + '|' + SeriesInstanceUID);

  let orthanc_identifier_ = shasum.digest('hex');
  let orthanc_identifier = insert_dash(orthanc_identifier_);
  return orthanc_identifier;
}

export {
  generate_orthanc_identifier_instance,
  generate_orthanc_identifier_study,
};
