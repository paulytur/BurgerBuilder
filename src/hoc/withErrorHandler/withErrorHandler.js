import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../ReactAuxilary/ReactAuxilary'


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req; 
            })
            this.resInterceptors = axios.interceptors.response.use(res=>res, 
                error => {
                    this.setState({
                        error: error
                    });
                });
        }

        componentWillUnmount(){
            // console.log('Will Unmount', this.reqInterceptor, this.resInterceptors)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }
        render(){
            return(
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.renderprops} />
                </Aux>
               
            );
        }
    }
}

export default withErrorHandler;