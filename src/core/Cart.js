import { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import { Link } from "react-router-dom";

const Cart = () => {
    const [ items, setItems ] = useState([]);

    useEffect(() => {
        setItems(getCart())
    }, []);

    const showItems = items => {
        return (
            <div>
                <h2>Your carts has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (<Card key={i} product={product} />))}
            </div>
        )
    }

    const noItemsMessage = () => {
        <h2>Your cart is empty. <br /> <Link to="/shop" />Continue shopping </h2>
    }

    return (
        <Layout title="Shopping Cart" description="Manage your cart items. Add remove checkout or continuo shopping." className="container-fluid">
           <div className="row">
                <div className="col-6"> 
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>

                <div className="col-6"> 
                    <p>show checkout options/shipping adress/total/update quantity</p>
                </div>
           </div>
         </Layout>
     )
}

export default Cart;