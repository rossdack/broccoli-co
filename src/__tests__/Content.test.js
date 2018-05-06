import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, render , mount} from 'enzyme';
import renderer from 'react-test-renderer';

import Content from '../pages/Content';

describe(Content, () => {

    // sanity
    it('renders and matches the snapshot', () => {
        const component = renderer.create(
            <Content />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('the button click opens the modal', () => {
        const wrapper = mount(
            <Content />
        );

        const button = wrapper.find('.btn');
        button.simulate('click');
        expect(wrapper.find('.modal_outer').length).toEqual(1);
        expect(wrapper.find('.modal_inner').length).toEqual(1);
    });

    test('the close button closes the modal', () => {
        const wrapper = mount(
            <Content />
        );

        const button = wrapper.find('.btn');
        button.simulate('click');
        // A repeat of above, but it needs to pass to ensure the validity of below
        expect(wrapper.find('.modal_inner').length).toEqual(1);

        const close = wrapper.find('.close');
        close.simulate('click');

        expect(wrapper.find('.modal_inner').length).toEqual(0);
    });


});