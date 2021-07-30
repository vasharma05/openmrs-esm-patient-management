import React from 'react';
import { RouteComponentProps } from 'react-router';
import { ExtensionSlot } from '@openmrs/esm-framework';
import styles from './patient-list-detail.scss';

const PatientListDetailsComponent: React.FC<RouteComponentProps<{ patientListUuid: string }>> = ({ match }) => {
  const patientListUuid = match?.params?.patientListUuid;
  console.log(patientListUuid);
  return (
    <main className="omrs-main-content">
      <ExtensionSlot extensionSlotName="breadcrumbs-slot" />
      <div className={styles.patientListHeader}></div>
    </main>
  );
};

export default PatientListDetailsComponent;
