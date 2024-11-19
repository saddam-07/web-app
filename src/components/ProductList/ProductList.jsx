import React from "react";
import './ProductList.css'
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";


const products = [
    {id: 1, price: 1000, title: 'Куртка', description: 'Это клёвая куртка'},
    {id: 1, price: 1000, title: 'Куртка', description: 'Это клёвая куртка'},
    {id: 1, price: 1000, title: 'Куртка', description: 'Это клёвая куртка'},
    {id: 1, price: 1000, title: 'Куртка', description: 'Это клёвая куртка'},
    {id: 1, price: 1000, title: 'Куртка', description: 'Это клёвая куртка'},
    {id: 1, price: 1000, title: 'Куртка', description: 'Это клёвая куртка'},
]

function getTotalPrice(items) {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}
function ProductList() {

    const [addedItems, setAddedItems] = useState([])
    const {tg} = useTelegram()

    function onAdd(product) {
        const alreadyAdded = addedItems.find(item => item.id === product.id)
        let newItems = [];


        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id)
        } else {
            newItems = [...addedItems, product]
        }

        setAddedItems(newItems)
 
        if(newItems.length === 0) {
            tg.mainButton.hide()
        }else {
            tg.mainButton.show()
            tg.mainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }
    return(
        <div className="list">
            {products.map(item => {
                <ProductItem
                product={item}
                onAdd = {onAdd}
                className={'item'}
                />
            })}
        </div>
    )
}

export default ProductList;