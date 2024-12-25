import { Mail, Phone } from 'lucide-react'

import React from 'react'


const ContactInfo = () => {

  return (

    <div className="space-y-8">

      <div>

        <h2 className="text-4xl font-bold">

          Get In <span className="text-[#006666]">Touch</span>

        </h2>

        <p className="mt-4 text-gray-600 max-w-md">

          Need assistance with GoLocal Guide? We're here to answer your questions

          and support your journey— reach out to connect with us

        </p>

      </div>


      <div className="space-y-4">

        <h3 className="font-semibold">Support Hours:</h3>

        <p className="text-gray-600">Monday to Saturday</p>

        <p className="text-gray-600">9 AM - 5 PM</p>

      </div>


      <div className="space-y-4">

        <div className="flex items-center space-x-3">

          <div className="bg-[#E8F5F5] p-2 rounded-full">

            <Mail className="h-5 w-5 text-[#006666]" />

          </div>

          <a href="mailto:info@zehenify.com" className="text-gray-600 hover:text-[#006666]">

            info@golocalguide.com

          </a>

        </div>

        

        <div className="flex items-center space-x-3">

          <div className="bg-[#E8F5F5] p-2 rounded-full">

            <Phone className="h-5 w-5 text-[#006666]" />

          </div>

          <div className="text-gray-600">

            <p>+92 312 8649615</p>

            <p>+92 320 2067849</p>

          </div>

        </div>

      </div>

    </div>

  )

}


export default ContactInfo
