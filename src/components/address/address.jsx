import React, { useState } from "react";
import AddressLoading from "./addressLoading";

export default function Address({ loading, addresses }) {
  const [selectedAddress, setSelectedAddress] = useState(null);

  function handleClick(address) {
    localStorage.setItem("selectedAddress", JSON.stringify(address));
    setSelectedAddress(address);
  }

  return (
    <div className="w-full h-96 border-redwood border-1 rounded-md overflow-auto text-caputMortuum">
      {!loading ? (
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
              <h4 className="text-lg font-bold">{address.fullName}</h4>
              <p>{address.fullAddress}</p>
              <p>
                {address.city}, {address.state} - {address.pinCode}
              </p>
              <p>
                {address.phoneNumber} - {address.email}
              </p>
            </div>
          );
        })
      ) : (
        <>
          <AddressLoading />
          <AddressLoading />
          <AddressLoading />
        </>
      )}
    </div>
  );
}
