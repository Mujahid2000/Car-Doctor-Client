import { Avatar, Button, Table } from 'flowbite-react';
import { RxCross1 } from "react-icons/rx";

const BookingRow = ({booking, handleDelete, handleBookingconfirm}) => {
    const {service, customerName, img, _id, amount, date, email, status} = booking;
    
    
    return (
        <>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="p-4">
          <button onClick={() => handleDelete(_id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <RxCross1></RxCross1>
          </button>
          </Table.Cell>
          <Table.Cell>
          {
            booking?.img?<Avatar alt="" img={img} size="lg"/>: <Avatar size="lg" />
          }
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {customerName}
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {email}
          </Table.Cell>
          <Table.Cell>
            {date}
          </Table.Cell>
          <Table.Cell>
            {service}
          </Table.Cell>
          <Table.Cell>
          {amount}
          </Table.Cell>
          <Table.Cell>
      {
        status === 'confirm' ? <Button className='font-medium text-white font-bold'>Confirmed</Button>: 
          <Button onClick={() => handleBookingconfirm(_id)} className="font-medium text-white  dark:text-cyan-500" color="blue">
        Confirm
      </Button>
}
          </Table.Cell>
        </Table.Row>
        </>
    );
};

export default BookingRow;