import { moneyFormat } from "../helpers";

function Header ({money,total}) {
    return (
        <div className="header"  >
            <div >{
                    money-total===0 ? <div > Insufficient amount of money !!! </div> :null
                } </div>
            <div  >
            {total>0 ? (
                <div> You have  <span>${moneyFormat(money-=total)}</span> for spending. </div>
            ):(
                <div>Your initial account is <span>${moneyFormat(money-=0)}</span> for spending.</div>
            )}
            </div>
        </div>
    )
}

export default Header;