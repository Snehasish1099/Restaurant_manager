import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="mx-auto px-[3%]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              We are dedicated to providing the best food delivery service. Our mission is to bring delicious meals to your doorstep.
            </p>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm">
              <li><a href="/" className="hover:underline">About Us</a></li>
              <li><a href="/#restaurant" className="hover:underline capitalize">restaurant</a></li>
              <li><a href="/#menu" className="hover:underline">Menu</a></li>
              <li><a href="/#contact" className="hover:underline">Contact</a></li>
              <li><a href="/" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">Email: support@foodecommerce.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>

            {/* Remove the code from line no. 29 to 39 */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                
              </a>
            </div>

          </div>

        </div>
        <div className="text-center mt-8">
          <p className="text-sm">&copy; {new Date().getFullYear()} Food eCommerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;