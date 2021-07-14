import * as React from 'react';
import PeriodStart from '../Selectors/PeriodStart';
import PeriodEnd from '../Selectors/PeriodEnd';
import OrderContentEditorWrapper from '../OrderContentEditorWrapper';

const PeriodEditorForm = (): JSX.Element => {
    return (
        <OrderContentEditorWrapper>
            <h3>Period editor</h3>

            <div style={{ display: 'flex', flexDirection: 'row' }} >
                <div>
                    <PeriodStart />
                </div>

                <div>
                    <PeriodEnd />
                </div>
            </div>
        </OrderContentEditorWrapper>
    );
};

export default PeriodEditorForm;
