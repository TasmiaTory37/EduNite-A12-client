import React, { useEffect } from 'react';

const Contact = () => {
   useEffect(() => {
            document.title = "EduNite | Contact"; 
          }, []);
  return (
    <section className="py-20 px-6 md:px-10 ">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Get in Touch</h2>
          <p className="text-base-content max-w-xl mx-auto">
            Have questions, feedback, or partnership ideas? We’d love to hear from you.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form */}
          <form className="bg-white p-8 rounded-lg shadow-md">
            <div className="mb-5">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Type your message..."
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-primary mb-1">Email</h4>
              <p className='text-base-content'>support@edunite.com</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-primary mb-1">Phone</h4>
              <p className='text-base-content'> +1 (555) 123-4567</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-primary mb-1">Office</h4>
              <p className='text-base-content'> Green Street, Green City</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
