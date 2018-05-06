import React from 'react';
import {shallow, render, mount} from 'enzyme';
import renderer from 'react-test-renderer';

import ModalGizmo from '../components/ModalGizmo';

describe(ModalGizmo, () => {
    const mockFunc = jest.fn();

    let props = {
        showModal: true,
        toggleModal: mockFunc
    };

    // sanity
    it('renders and matches the snapshot', () => {
        const component = renderer.create(
            <ModalGizmo {...props}/>
        );
        const tree = component.toTree();

        expect(tree).toMatchSnapshot();
    });

    test('validation errors are shown when button is clicked with empty fields', () => {
        const wrapper = mount(
            <ModalGizmo {...props}/>
        );

        const button = wrapper.find('.btn-success');
        button.simulate('submit');

        expect(wrapper.find('.has-error').length).toEqual(3);

    });

    test('a validation error shows when email address does not match the confirmation', () => {
        const wrapper = mount(
            <ModalGizmo {...props}/>
        );

        const nameField = wrapper.find('.form-control').at(0);
        const emailField = wrapper.find('.form-control').at(1);
        const confirmField = wrapper.find('.form-control').at(2);

        nameField.instance().value = 'First Name';
        emailField.instance().value = 'email@email.com';
        confirmField.instance().value = 'emailx@email.com';

        nameField.simulate('change');
        emailField.simulate('change');
        confirmField.simulate('change');

        wrapper.update();

        const button = wrapper.find('.btn-success');
        button.simulate('submit');

        expect(wrapper.find('.error-block').at(2).text()).toContain('Email and email confirmation do not match.');
    });

    test('a validation error shows when email address is not the correct format', () => {
        const wrapper = mount(
            <ModalGizmo {...props}/>
        );

        const nameField = wrapper.find('.form-control').at(0);
        const emailField = wrapper.find('.form-control').at(1);

        nameField.instance().value = 'First Name';
        emailField.instance().value = 'this is not a valid email';

        nameField.simulate('change');
        emailField.simulate('change');

        wrapper.update();

        const button = wrapper.find('.btn-success');
        button.simulate('submit');

        expect(wrapper.find('.error-block').at(1).text()).toContain('That is not a valid email');
    });

});