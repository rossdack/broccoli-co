import React, {Component} from 'react';
import ModalGizmo from '../components/ModalGizmo';

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        }
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    render() {

        let nextProps = {
            showModal: this.state.showModal,
            toggleModal: this.toggleModal.bind(this)
        };

        return (
            <div className='content'>
                <div className='main_text'>A better way to enjoy every day.</div>
                <div className='secondary_text'>Be the first to know when we launch.</div>
                <div className='control'>
                    <ModalGizmo {...nextProps}/>
                    <div className='form-group text-center'>
                        <button className='btn btn-success' onClick={this.toggleModal.bind(this)}>Request an invite</button>
                    </div>
                </div>
            </div>
        )
    }

};

export default Content;