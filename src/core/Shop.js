import { useState ,useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import { getCategories, getFilteredProduct } from "./apiCore";
import Checkbox from "./Checkbox";
import { prices } from "./fixedPrices";
import RadioBox from "./RadioBox";

const Shop = () => {

    const [ myFilters, setMyFilters ] = useState({
        filters: { category: [], price: [] }
    });
    const [ categories, setCategories ] = useState([]);
    const [ error, setError ] = useState(false)
    const [ limit, setLimit ] = useState(6);
    const [ skip, setSkip ] = useState(0);
    const [ size, setSize ] = useState(0);
    const [ filteredResults, setFilteredResults ] = useState([])


    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setCategories(data)
            }
            
        })
    }

    const loadFilteredResults = newFilters => {
        getFilteredProduct(skip, limit, newFilters).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0)
            }
        });
    }

    const loadMore = () => {
        let toSkip = skip + limit;

        getFilteredProduct(toSkip, limit, myFilters.filters).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip)
            }
        });
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">Load more</button>
            )
        )
    }

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters)
    }, []);

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters };
        newFilters.filters[filterBy] = filters;

        if(filterBy == "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;

        }

        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters); 

    }

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for(let key in data) {
            if(data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }

        return array;
    }

    const renderFilteredResults = (filteredResults) => {
        if(!filteredResults) return;

        return (
            filteredResults.map((product, i) => (
                <Card key={i} product={product} />
            ))
        )
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
                        <h2 className="mb-4">Products</h2>
                        <div className="row"> 
                            {renderFilteredResults(filteredResults)}
                        </div>
                        <hr />
                        {loadMoreButton()}
                </div>
            </div>
        </Layout>
        )
}

export default Shop;