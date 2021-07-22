import * as React from 'react';
import { render } from 'react-dom';

import 'antd/dist/antd.css';

import Form from './Form/Form';

import './model/init';

const Application: React.FC<{}> = () => (
    <>
        <h1 style={{ padding: '1em', textAlign: 'center' }}>Try Effector.js</h1>

        <Form />
    </>
);

render(<Application />, document.getElementById('root'));
