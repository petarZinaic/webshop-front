import { useState ,useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import { getCategories } from "./apiCore";
import Checkbox from "./Checkbox";
import { prices } from "./fixedPrices";
import RadioBox from "./RadioBox";

const Shop = () => {

    const [ myFilters, setMyFilters ] = useState({
        filters: { category: [], price: [] }
    });
    const [ categories, setCategories ] = useState([]);
    const [ error, setError ] = useState("")

    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setCategories(data)
            }
            
        })
    }

    useEffect(() => {
        init();
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("shop", filters, filterBy);
        const newFilters = {...myFilters };
        newFilters.filters[filterBy] = filters;
        setMyFilters(newFilters); 

    }

    return (
        <Layout
         title="Shop Page"
        description="Search and find books of your choise"
        className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                    <h4>Filter by categories </h4>
                    <ul>
                        <Checkbox
                        categories={categories}
                        handleFilters={filters =>
                            handleFilters(filters, "category")}
                        />
                    </ul>

                    <h4>Filter by price range </h4>
                    <div>
                        <RadioBox
                        prices={prices}
                        categories={categories}
                        handleFilters={filters =>
                            handleFilters(filters, "price")}
                        />
                    </div>
                </div>

                <div className="col-8">
                    {JSON.stringify(myFilters)}
                </div>
            </div>
        </Layout>
        )
}

export default Shop;