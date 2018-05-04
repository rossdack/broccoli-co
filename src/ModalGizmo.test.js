import React from 'react';
import { shallow, render } from 'enzyme';
import renderer from 'react-test-renderer';

import ModalGizmo from './components/ModalGizmo';

describe(ModalGizmo, () => {
    const fizBucks = jest.fn();

    let props = {
        showModal: false,
        toggleModal: fizBucks
    };

    test('Renders and matches the snapshot', () => {
        const component = renderer.create(
            <ModalGizmo {...props}/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});