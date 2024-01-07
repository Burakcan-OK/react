import { useState } from "react"


const CustomerForm = ({addNewCustomer}) => {
    const [customerName, setcustomerName] = useState("")
    const [color, setColor] = useState("#fff")

    const handleSubmit =(e) => {
        e.preventDefault()
        if(customerName !==""){
            const newCustomer = {
                id: Math.random(),
                customerName
            }
            addNewCustomer(newCustomer)
            setcustomerName("")
            setColor("#fff")
        }else {
            setColor("red")
        }
    }
  return (
    <form className='customer-form'
    onSubmit={handleSubmit}
    >
        <input
        type='text'
        className='customer-input'
        placeholder='Add a new customer'
        onChange={(e) => setcustomerName(e.target.value)}
        value={customerName}
        style={{backgroundColor:color}}
        />
        <button>
            <i className='bi bi-plus-lg'></i>
        </button>
    </form>
  )
}

export default CustomerForm