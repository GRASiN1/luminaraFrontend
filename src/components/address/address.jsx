import React, { useEffect, useState, useRef } from "react";
import { useAlert } from "../../contexts/AlertContext";
import { axiosInstance, END_POINTS } from "../../services/api";
import AddressLoading from "./addressLoading";

export default function Address() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { showAlert } = useAlert();
  const showAlertRef = useRef(showAlert);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    showAlertRef.current = showAlert;
  }, [showAlert]);

  useEffect(() => {
    // async function fetchAddresses() {
    //   setLoading(true);
    //   let hasError = false;
    //   try {
    //     // const response = await axiosInstance.get(END_POINTS.GET_ALL_ADDRESSES);
    //     // setAddresses(response.data.data);
    //   } catch (error) {
    //     hasError = true;
    //   } finally {
    //     if (!hasError) setLoading(false);
    //   }
    // }
    // fetchAddresses();
    const mockData = [
      {
        name: "John Doe",
        address: "123 Maple Street, Apartment 4B",
        pin_code: "560001",
        city: "Bangalore",
        state: "Karnataka",
        contact_number: "+91 9876543210",
        email: "john.doe@example.com",
      },
      {
        name: "Aisha Khan",
        address: "456 Park Avenue, Floor 5",
        pin_code: "110001",
        city: "New Delhi",
        state: "Delhi",
        contact_number: "+91 9123456789",
        email: "aisha.khan@example.com",
      },
      {
        name: "Ravi Patel",
        address: "789 Sunshine Lane, Near Lake View",
        pin_code: "380015",
        city: "Ahmedabad",
        state: "Gujarat",
        contact_number: "+91 9988776655",
        email: "ravi.patel@example.com",
      },
      {
        name: "Meera Sharma",
        address: "101 Palm Residency, Sector 12",
        pin_code: "400101",
        city: "Mumbai",
        state: "Maharashtra",
        contact_number: "+91 9871234567",
        email: "meera.sharma@example.com",
      },
      {
        name: "Vikram Singh",
        address: "202 Lotus Villa, Tower B",
        pin_code: "226010",
        city: "Lucknow",
        state: "Uttar Pradesh",
        contact_number: "+91 9998887776",
        email: "vikram.singh@example.com",
      },
    ];
    setAddresses(mockData);
  }, []);

  function handleClick(address) {
    localStorage.setItem("selectedAddress", JSON.stringify(address));
    setSelectedAddress(address);
  }

  return (
    <div className="w-full h-96 border-redwood border-1 rounded-md overflow-auto text-caputMortuum">
      {loading ? (
        addresses.map((address, index) => {
          const isSelected = selectedAddress === address;
          return (
            <div
              key={index}
              className={`border-b-1 border-redwood p-2 cursor-pointer ${
                isSelected ? "bg-mistyRose" : ""
              }`}
              onClick={() => handleClick(address)}
            >
              <h4 className="text-lg font-bold">{address.name}</h4>
              <p>{address.address}</p>
              <p>
                {address.city}, {address.state} - {address.pin_code}
              </p>
              <p>
                {address.contact_number} - {address.email}
              </p>
            </div>
          );
        })
      ) : (
        <>
          <AddressLoading />
          <AddressLoading />
        </>
      )}
    </div>
  );
}
