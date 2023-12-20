import BasketItem from "./BasketItem"
import { moneyFormat } from "../helpers"

function Basket({basket,products,total,resetBasket}){
    return(
        <div className="basket-container container" >
            <h3>Your Chart</h3>
            <ul>
            {basket.map(item =>(
            <BasketItem key={item.id} product={products.find(p=> p.id===item.id)} item={item} />
            ))}
            </ul>
            <div className="total">
                Total:${moneyFormat(total)}
            </div> 
            <button className="basket-reset-btn" onClick={resetBasket} >Reset Basket</button>
        </div>
    )
}

export default Basket