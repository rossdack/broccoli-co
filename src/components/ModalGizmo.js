import React, {Component} from 'react';
import FormValidator from '../form/FormValidator';
import Success from './Success';
import DataSource from './DataSource';

class ModalGizmo extends Component {
    constructor() {
        super();

        // setup validation rules
        this.validator = new FormValidator([
            {
                field: 'fullName',
                method: 'isEmpty',
                validWhen: false,
                message: '* Full name is required.'
            },
            {
                field: 'fullName',
                method: this.maxLength,
                validWhen: true,
                message: '* Full name must be at least 3 characters in length.'
            },
            {
                field: 'email',
                method: 'isEmpty',
                validWhen: false,
                message: '* Email is required.'
            },
            {
                field: 'email',
                method: 'isEmail',
                validWhen: true,
                message: '* That is not a valid email.'
            },
            {
                field: 'confirmEmail',
                method: 'isEmpty',
                validWhen: false,
                message: '* Email confirmation is required.'
            },
            {
                field: 'confirmEmail',
                method: 'isEmail',
                validWhen: true,
                message: '* That is not a valid email.'
            },
            {
                field: 'confirmEmail',
                method: this.emailMatch,
                validWhen: true,
                message: '* Email and email confirmation do not match.'
            }
        ]);

        this.state = {
            fullName: '',
            email: '',
            confirmEmail: '',
            validation: this.validator.valid(),
            backendError: undefined,
            submitted: false,
            success: false
        };

        this.dataSource = new DataSource();
    }

    maxLength = (name) => (name.length >= 3);
    emailMatch = (confirmEmail, state) => (confirmEmail === state.email);

    handleInputChange = event => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    /**
     * Close 'modal' and clear state
     */
    closeModal = () => {
        this.setState(
            {
                fullName: '',
                email: '',
                confirmEmail: '',
                backendError: undefined,
                validation: this.validator.valid(),
                submitted: false,
                success: false
            }
        );
        this.props.toggleModal();
    };

    /**
     * Post to backend, handle response appropriately
     */
    handleSubmit = event => {
        event.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({validation});

        if (validation.isValid) {

            this.setState({
                backendError: undefined,
                submitted: true
            });

            // handle actual form submission here
            this.dataSource.requestInvitation(this.state.fullName, this.state.confirmEmail).then(success => {
                this.setState({
                    submitted: false,
                    success: true
                });

            }).catch(failure => {
                if (failure.response && failure.response.data && failure.response.data.errorMessage) {
                    this.setState({backendError: failure.response.data.errorMessage});
                } else {
                    this.setState({backendError: failure.message});
                }

                this.setState({
                    submitted: false
                });
            });
        }
    };

    render() {

        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;

        if (this.props.showModal) {
            return (
                <div className='modal_outer'>
                    <div className='modal_inner'>

                        {/*If sending was successful, show success component, else render input form*/}
                        {this.state.success ? <Success {...{closeModal: this.closeModal}} /> :

                            <div>
                                <button type='button'
                                        className='close'
                                        aria-label='Close'
                                        title='Close'
                                        onClick={this.closeModal}>
                                    <div aria-hidden="true">&times;</div>
                                </button>

                                <h3>{this.props.header}Request an invite</h3>
                                <form onSubmit={this.handleSubmit}>

                                    <div className='form-group'>
                                        <div>
                                            <label className='modal-label' htmlFor="fullName">Full Name</label>
                                            <input name='fullName' placeholder='Full name'
                                                   disabled={this.state.submitted}
                                                   className={validation.fullName.isInvalid ? 'form-control has-error' : 'form-control'}
                                                   onChange={this.handleInputChange}/>
                                            <span className='error-block'>{validation.fullName.message}</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div>
                                            <label className='modal-label' htmlFor="email">Email address</label>
                                            <input name='email' placeholder='Email'
                                                   disabled={this.state.submitted}
                                                   className={validation.email.isInvalid ? 'form-control has-error' : 'form-control'}
                                                   onChange={this.handleInputChange}/>
                                            <span className='error-block'>{validation.email.message}</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div>
                                            <label className='modal-label' htmlFor="confirmEmail">Confirm email
                                                address</label>
                                            <input name='confirmEmail' placeholder='Confirm email'
                                                   disabled={this.state.submitted}
                                                   className={validation.confirmEmail.isInvalid ? 'form-control has-error' : 'form-control'}
                                                   onChange={this.handleInputChange}/>
                                            <span className='error-block'>{validation.confirmEmail.message}</span>
                                        </div>
                                    </div>

                                    <div className="form-spacer"/>

                                    <div>
                                        <button name='sendDetails'
                                                disabled={this.state.submitted}
                                                className='btn btn-success btn-block'
                                                title='Submit request for invite'
                                                onClick={this.handleFormSubmit}>{this.state.submitted ? 'Sending, please wait...' : 'Send'}</button>
                                        <div name='beErrors'
                                             className='error-block be-error'>{this.state.backendError}</div>
                                    </div>

                                </form>
                            </div>
                        }
                    </div>
                </div>
            );
        }
        ;
        return null;
    }
}

export default ModalGizmo;