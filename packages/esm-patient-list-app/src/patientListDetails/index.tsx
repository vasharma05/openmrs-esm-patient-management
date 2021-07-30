import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { ExtensionSlot, OpenmrsResource } from '@openmrs/esm-framework';
import styles from './patient-list-detail.scss';
import { useEffect } from 'react';
import {
  fetchPatientListMembers,
  getPatientListDetails,
  getPatientListMembers,
  OpenmrsCohort,
  OpenmrsCohortMember,
} from '../patientListData';

function getPatientListUuidFromUrl(): string {
  const match = /\/patient-list\/([a-zA-Z0-9\-]+)\/?/.exec(location.pathname);
  return match && match[1];
}

const PatientListDetailsComponent: React.FC<RouteComponentProps<{ patientListUuid: string }>> = ({ match }) => {
  const patientListUuid = getPatientListUuidFromUrl();
  const [patientListDetail, setPatientListDetail] = useState<OpenmrsCohort>(null);
  const [patientListMembers, setPatientListMembers] = useState<OpenmrsResource[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    if (patientListUuid) {
      getPatientListDetails(patientListUuid, abortController)
        .then((data) => setPatientListDetail(data))
        .catch((err) => {
          throw err;
        });
      fetchPatientListMembers(patientListUuid, abortController).then((patients) => console.log(patients));
    }
    return () => abortController.abort();
  }, []);

  return (
    <main className="omrs-main-content">
      <ExtensionSlot extensionSlotName="breadcrumbs-slot" />
      {patientListUuid && (
        <div className={styles.patientListHeader}>
          <p>{patientListDetail?.name}</p>
          <p className={`${styles.bodyLong01} ${styles.secondaryText} ${styles.patientListDescription}`}>Check</p>
        </div>
      )}
    </main>
  );
};

export default PatientListDetailsComponent;
