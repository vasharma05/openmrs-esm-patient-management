import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PatientListList from './patientListList';
import PatientListDetail from './patientListDetails';

const PatientListRootComponent = () => {
  return (
    <BrowserRouter>
      <Route exact path="patient-list" component={PatientListList} />
      <Route exact path="patient-list/:patientListUuid" component={PatientListDetail} />
    </BrowserRouter>
  );
};

export default PatientListRootComponent;
