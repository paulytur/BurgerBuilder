import React, { Component } from 'react';

import Aux from '../../hoc/ReactAuxilary/ReactAuxilary';
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad   :   0.5,
    cheese  :   0.4,
    meat    :   1.3,
    bacon   :   0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients : null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-51a2e.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error =>{
                this.setState({error:true})
            });
    }

    updatePurchaseState(ingredients) {
        // console.log(ingredients);
        const sum = Object.keys(ingredients)
            .map(igKey => {
                // console.log(sum);
                return ingredients[igKey];
            })
            .reduce(( sum , el ) => {
                return sum + el;
            }, 0);


        this.setState({
            purchasable: sum > 0
        })

        // console.log(this.state.purchasable);
    }

    addIngredientHandler = (type) => {
        //Updating Type Count
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;

        //Price Computation
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        //Updating Count
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;

        //Price Computation
        const priceRemove = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceRemove;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true   
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        this.setState({
            loading: true
        })
        const order = {
            ingrendients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Paul Matthew',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '123456',
                    country: 'Philippines'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            })
            .catch(error => {
                this.setState({
                    purchasing: false,
                    loading: false
                })
            })

    }

    render(){

        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error? <p>Ingredients can't be loadad</p> : <Spinner />;

        if (this.state.ingredients){
            burger  = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded     =   {this.addIngredientHandler}
                        ingredientRemoved   =   {this.removeIngredientHandler}
                        disabled            =   {disabledInfo}
                        purchasable         =   {this.state.purchasable}
                        price               =   {this.state.totalPrice}
                        ordered              =   {this.purchaseHandler}
                    />
                </Aux>
            );

           
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice.toFixed(2)}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>
        }

        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler        }>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
            
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);