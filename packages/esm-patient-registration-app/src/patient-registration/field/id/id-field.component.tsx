import React, { useContext, useCallback, useMemo } from 'react';
import { IdentifierInput } from '../../input/custom-input/identifier/identifier-input.component';
import { IdentifierSource } from '../../patient-registration-types';
import styles from '../field.scss';
import { useTranslation } from 'react-i18next';
import { PatientRegistrationContext } from '../../patient-registration-context';
import { Button } from 'carbon-components-react';

function containsSourceWithAnOption(sources: Array<IdentifierSource>): boolean {
  for (const source of sources) {
    if (source.autoGenerationOption) {
      return true;
    }
  }

  return false;
}

export const IdField: React.FC = () => {
  const { identifierTypes, inEditMode, values, showPatientIdentifiersOverlay, patientIdentifiersMap } =
    useContext(PatientRegistrationContext);
  const { t } = useTranslation();

  const identifierInputs = useMemo(
    () =>
      identifierTypes
        .filter(
          (identifierType) =>
            patientIdentifiersMap[identifierType.uuid].selected &&
            patientIdentifiersMap[identifierType.uuid].sourceSelected,
        )
        .map((identifierType) => {
          const sources = identifierType.identifierSources;
          const hasSourcesButWithoutOptions = sources.length > 0 && !containsSourceWithAnOption(sources);
          const mayOnlySupportAuto =
            sources.length == 1
              ? sources[0].autoGenerationOption
                ? !sources[0].autoGenerationOption.manualEntryEnabled
                : true
              : false;

          if (inEditMode && values[identifierType.fieldName]) {
            return null;
          } else if (hasSourcesButWithoutOptions || mayOnlySupportAuto) {
            // identifier will be autogenerated
            identifierType.autoGenerationSource = identifierType.identifierSources[0];
            return null;
          } else {
            return (
              <div key={identifierType.fieldName} style={{ marginBottom: '1rem' }}>
                <IdentifierInput key={identifierType.fieldName} identifierType={identifierType} />
              </div>
            );
          }
        }),
    [patientIdentifiersMap],
  );

  return (
    <div>
      <h4 className={styles.productiveHeading02Light}>{t('idFieldLabelText', 'Id')}</h4>
      <div className={styles.grid}>
        {identifierInputs}
        <div className={styles.addNewIdentifierButton}>
          <Button kind="tertiary" size="sm" onClick={() => showPatientIdentifiersOverlay(true)}>
            Add new identifier
          </Button>
        </div>
      </div>
    </div>
  );
};
