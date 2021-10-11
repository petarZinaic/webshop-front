import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem } from "./cartHelpers";

const Card = ({ product, showViewProductButton = true, showAddToCartButton = true }) => {

    const [ redirect, setRedirect ] = useState(false)

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
                </div>
            </div>
    )
}

export default Card
