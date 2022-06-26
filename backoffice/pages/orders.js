import BussinessLayout from "../layouts/BussinessLayout";

const Orders = () => {
    return("Ordenes")
}

export default Orders;

Orders.getLayout = function getLayout(page) {
    return (
    <BussinessLayout>
        {page}
    </BussinessLayout>
    )
}