import React, {Component} from 'react';

import Aux from '../../../hoc/ReactAuxilary/ReactAuxilary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //This could be a functional component

    componentWillUpdate(){
        console.log('[OrderSummery] - WillUpdate')
    }

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                // console.log(props.ingredients[igKey]);
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {igKey}
                    </span> : 
                        {this.props.ingredients[igKey]}
                </li>
             )
        });

        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <p><strong>Total Price: {this.props.price} </strong></p>
            <Button
                btnType='Danger'
                click={this.props.purchaseCancelled}>
                CANCEL
            </Button>
            <Button
                btnType='Success'
                click={this.props.purchaseContinued }>
                CONTINUE
            </Button>
        </Aux>
        );
    }
}
export default OrderSummary;