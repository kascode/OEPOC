import * as React from 'react';
import PeriodStart from '../Selectors/PeriodStart';
import PeriodEnd from '../Selectors/PeriodEnd';

const PeriodEditorForm = (): JSX.Element => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }} >
            <div>
                <PeriodStart />
            </div>

            <div>
                <PeriodEnd />
            </div>
        </div>
    );
};

export default PeriodEditorForm;
