import { useState ,useEffect } from "react";
import Layout from "./Layout";
import { getProducts, getBraintreeClientToken, processPayment } from "./apiCore";
import { emptyCart } from "./cartHelpers";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products }) => {

    const [ data, setData ] = useState({
        sucess: false,
        loading: false,
        clientToken: null,
        error: "",
        instance: {},
        adress: ""
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error) {
                setData({...data, error: data.error});
            } else { 
                setData({ clientToken: data.clientToken})
            }
        
        });
    }   

    useEffect(() => {
        getToken(userId, token)
    }, [])


    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const buy = () => {
        let nonce;
        let getNonce = data.instance
        .requestPaymentMethod()
        .then(data => {
            // console.log(data)
            nonce = data.nonce;

            // console.log("send nonce and total to process: ", nonce, getTotal(products))
            const paymentData = {
                paymentMethondNonce: nonce,
                amount: getTotal(products)
            }

            processPayment(userId, token, paymentData)
            .then(response => {
                setData({...data, sucess: response.success})
                emptyCart(() => {
                    console.log("payment sucess and empty cart")
                })

            })
            .catch(error => console.log(error))
        })
        .catch(error => {
            // console.log("dropin error: ", error)
            setData({... data, error: error.message})
        })
    }

    const showDropIn = () => (
        <div onBlur={() => setData({...data, error: ""})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn options={{
                        authorization: data.clientToken,
                        
                    }} onInstance={instance => (setData({...data, instance: instance}))} />
                    <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                   
                </div>
            ) : null}
        </div>
    )
    

    const showCheckout = () => {
        return  isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">
                    Sign in to checkout
               </button>
            </Link>
        )
    }

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    )

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? "" : "none" }}>
           Thanks! Your payment was successful!
        </div>
    )
        
    



    return (
      <div>
          <h2>Total: ${getTotal()}</h2>
          {showSuccess(data.sucess)}
        {showError(data.error)}
        {showCheckout()}
      </div>
    )
}

export default Checkout;