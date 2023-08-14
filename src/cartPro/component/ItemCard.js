import React from 'react'
import { useCart } from 'react-use-cart'
import classes from "../cart.module.css"

function ItemCard({ item }) {
    const { addItem } = useCart()

    const { isEmpty,
        totalItems,
        totalUniqueItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
        items
    } = useCart()

    console.log(items);
    return (
        <div className="card col-3 mx-5" style={{ width: "300px", height: "400px" }}>
            <div className="card-body">

                <div>
                    <img
                        src={item.img}
                        className={classes.imgCard} />
                </div>
                <h4 className='my-1 text-center'>{item.title}</h4>
                <h6 className=' text-center'>Price: ${item.price}</h6>
            </div>
            <div style={{margin:"0 auto", paddingBottom:"10px"}}>
            {items.length > 0 ? <>{items?.map((item, index) => {
                return (
                    <div className='d-flex'>

                        <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className='btn btn-sm btn-danger'>-</button>
                        {items.length > 0 ? <h4 className='mx-1'>{item.quantity}</h4> : 0}

                        <button className='btn btn-sm btn-success' onClick={() => updateItemQuantity(item.id, item.quantity + 1)} >+</button>
                    </div>
                )

            })} </> : <div className='d-flex'>
                <button className='btn btn-sm btn-danger'>-</button>
                <h4 className='mx-1'>0</h4>
                <button className='btn btn-sm btn-success' >+</button>
            </div>}
            </div>




            <div className='card-footer d-flex justify-content-center'>

                <button className="btn btn-success px-5" onClick={() => { addItem(item) }}>Add to cart</button>

            </div>
        </div>
    )
}

export default ItemCard