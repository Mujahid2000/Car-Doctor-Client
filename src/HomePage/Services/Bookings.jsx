import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvide/AuthProvide";
import { Checkbox, Table } from "flowbite-react";
import BookingRow from "./BookingRow";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const axiosSecure = useAxiosSecure();
  console.log(user);

  // const url = `https://car-doctor-server-pi-eight.vercel.app/bookings?email=${user?.email}`;
  const url = `/bookings?email=${user?.email}`;
  console.log(user?.email);

  useEffect(() => {
    axiosSecure.get(url, {withCredentials: true})
    .then(res =>{
      setBookings(res.data);
    })
    // fetch(url, {credentials: 'include'})
    //   .then((res) => res.json())
    //   .then((data) => setBookings(data));
  }, [url, axiosSecure]);

  const handleDelete = id =>{
    const proceed = confirm('Are You want to delete');
    if(proceed){
      fetch(`https://car-doctor-server-pi-eight.vercel.app/bookings/${id}`, {
        method: 'DELETE',     
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.deletedCount > 0 ){
          alert('Successfully Delete')
          const remaining = bookings.filter(booking => booking._id !== id);
          setBookings(remaining);
        }
      })
    } 
  }

  const handleBookingconfirm = id =>{
    fetch(`https://car-doctor-server-pi-eight.vercel.app/bookings/${id}`,{
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({status: 'Confirm'})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.modifiedCount > 0){
        //update state
        const remaining = bookings.filter(booking => booking._id !== id );
        const updated = bookings.find(booking => booking._id === id);
        updated.status = 'confirm'
        const newBookings = [updated, ...remaining];
        setBookings(newBookings);
      }
    })
  }

  return (
    <div>
      <h1 className="text-3xl">Booking: {bookings.length}</h1>
      <Table hoverable>
      <Table.Head>
        <Table.HeadCell className="p-4">
          <Checkbox />
        </Table.HeadCell>
        <Table.HeadCell className="">
          <p className="ml-36">Picture</p>
        </Table.HeadCell>
        <Table.HeadCell>
          Name
        </Table.HeadCell>
        <Table.HeadCell>
          Email
        </Table.HeadCell>
        <Table.HeadCell>
          Date
        </Table.HeadCell>
        <Table.HeadCell>
          Category
        </Table.HeadCell>
        <Table.HeadCell>
          Price
        </Table.HeadCell>
        <Table.HeadCell>
          <p>Approve</p>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {
            bookings.map(booking =><BookingRow key={booking._id} booking={booking} handleDelete={handleDelete} handleBookingconfirm={handleBookingconfirm}>

            </BookingRow>)
        }
      </Table.Body>
    </Table>
    </div>
  );
};

export default Bookings;
