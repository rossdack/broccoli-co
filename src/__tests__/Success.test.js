import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';

import Success from '../components/Success';

describe(Success, () => {

    // sanity
    it('renders and matches the snapshot', () => {
        const component = renderer.create(
            <Success {...{closeModal: jest.fn()}}/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('clicking on the close icon calls the close function', () => {

        let mock = jest.fn();

        const wrapper = shallow(
            <Success {...{closeModal: mock}}/>
        );

        const button = wrapper.find('.btn-success');
        button.simulate('click');

        expect(mock).toBeCalled();

    });

});