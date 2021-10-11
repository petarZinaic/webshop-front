import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment, { updateLocale } from "moment";
import { addItem, updateItem } from "./cartHelpers";

const Card = ({ product, showViewProductButton = true, showAddToCartButton = true, cartUpdate = false }) => {

    const [ redirect, setRedirect ] = useState(false);
    const [ count, setCount ] = useState(product.count);

    const showViewButton = showViewProductButton => { 
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2  mb-2">View Product</button>
                </Link>
            )
        )
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (showAddToCartButton) => {
        
        return (
            showAddToCartButton && (
                <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                    Add to cart
                </button>
            )
        )
    }

    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if(event.target.value >=1) {
            updateItem(productId, event.target.value);
        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
            </div>
        </div>
    }
    

    return (
            <div className="card">
                <div className="card-header">
                    {product.name}
                </div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    {<ShowImage item={product} url="product" />}
                    <p>{product.description.substring(0, 100)}</p>
                    <p className="black-10">${product.price}</p>
                    <p className="black-9"> Category: {product.category && product.category.name}</p>
                    <p className="black-8">
                        Added on {moment(product.createdAt).fromNow()}
                     </p>

                    {showViewButton(showViewProductButton)}

                   {showAddToCart(showAddToCartButton)}
                   {showCartUpdateOptions(cartUpdate)}
                </div>
            </div>
    )
}

export default Card
