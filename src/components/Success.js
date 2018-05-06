import React, {Component} from 'react';

class Success extends Component {

    render() {
        return (
            <div>
                <h3>All done!</h3>

                <div className='success'>
                    <div className='form-group text-center'>
                        <span>You will be one of the first to experience Broccoli & Co. when we launch.</span>
                    </div>

                    <div className='form-group'>
                        <button className='btn btn-success btn-block' onClick={this.props.closeModal}>OK</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default Success;