
import CustomerItem from './CustomerItem'


const CustomerList = ({customers, setCustomers}) => {

    //! delete customer
    const handleDelete = (i) => {
        setCustomers(customers.filter((customer) => customer.id !==i.id))
    }
  return (
    <ul className='customer-list'>
        {customers.map((customer) => (
            <CustomerItem customer={customer} key={customer.id}
            handleDelete={handleDelete} />
        ))}
    </ul>
  )
}

export default CustomerList