import React from "react";
import Button from "../Button/Button";
import './ProductItem.css'

function ProductItem({product, className, onAdd}) {
    function onAddHendler() {
        onAdd(product)
    }
    return(
        <div className={'product ' + className}>
            <div className={'img'}/>
            <div className={"title"}>{product.title}</div>
            <div className={"description"}>{product.description}</div>
            <div className={"price"}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHendler}>
                Добавить в корзину
            </Button>
        </div>
    )
}

export default ProductItem;