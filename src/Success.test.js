import React from 'react';
import { shallow, render } from 'enzyme';
import renderer from 'react-test-renderer';

import Success from './components/Success';

describe(Success, () => {
   // testing, testing 123

    const okSuccess = jest.fn();

    // const component = shallow(
    //     <Success {...{closeModal: okSuccess}}/>
    // );

    test('Renders and matches the snapshot', () => {
        const component = renderer.create(
            <Success {...{closeModal: okSuccess}}/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    // test('Contains a button', () => {
    //     //btn btn-success btn-block
    //     const component = render(
    //         <Success {...{closeModal: okSuccess}}/>
    //     );
    //     expect(component.toString()).contains('button');
    // });
});