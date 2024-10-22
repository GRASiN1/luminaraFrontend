import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className={`w-full h-min bg-blackBean flex flex-col md:flex-row justify-between items-start text-mistyRose px-10 sm:px-20 md:px-40 py-5 gap-5 text-center`}
    >
      <div
        id="resources"
        className="flex flex-col justify-start items-center w-full md:w-1/5 mb-5 md:mb-0"
      >
        <h3 className="text-2xl font-bold">Resources</h3>
        <Link to="/" className="my-2">
          About Us
        </Link>
        <Link to="/" className="my-2">
          Track Your Order
        </Link>
        <Link to="/" className="my-2">
          Return / Exchange
        </Link>
        <Link to="/" className="my-2">
          Customer Support
        </Link>
      </div>

      <div
        id="quickLinks"
        className="flex flex-col justify-start items-center w-full md:w-1/5 mb-5 md:mb-0"
      >
        <h3 className="text-2xl font-bold">Quick Links</h3>
        <Link to="/" className="my-2">
          Privacy Policy
        </Link>
        <Link to="/" className="my-2">
          Refund / Exchange Policy
        </Link>
        <Link to="/" className="my-2">
          Term of Service
        </Link>
        <Link to="/" className="my-2">
          FAQs
        </Link>
      </div>

      <div
        id="socials"
        className="flex flex-col justify-start items-center w-full md:w-1/5 mb-5 md:mb-0"
      >
        <h3 className="text-2xl font-bold">Socials</h3>
        <Link to="/" className="my-2">
          Instagram
        </Link>
        <Link to="/" className="my-2">
          Twitter
        </Link>
        <Link to="/" className="my-2">
          Facebook
        </Link>
        <Link to="/" className="my-2">
          LinkedIn
        </Link>
      </div>

      <div
        id="contacts"
        className="flex flex-col justify-start items-center w-full md:w-1/5 mb-5 md:mb-0"
      >
        <h3 className="text-2xl font-bold">Contact us</h3>
        <Link to="/" className="my-2">
          Reach us out on WhatsApp
        </Link>
        <p className="my-2">Or you can call our Helpline:</p>
        <p className="my-2">Phone: +91 9999999999</p>
        <p className="my-2">
          Our Working hours are - 9:00am to 5:00pm, Monday to Friday
        </p>
      </div>

      <div
        id="store"
        className="flex flex-col justify-start items-center w-full md:w-1/5 mb-5 md:mb-0"
      >
        <h3 className="text-2xl font-bold">Luminara Store</h3>
        <p className="my-2">Visit us at:</p>
        <p>
          A, Ground Floor, Gurumukh Sagar, Plot 126, 29th Rd, opposite H&M
          Tower, Bandra West, Mumbai, Maharashtra 400050
        </p>
      </div>
    </footer>
  );
}
