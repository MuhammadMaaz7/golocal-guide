import React, { useState } from 'react'


const ContactForm = () => {

  const [formData, setFormData] = useState({

    name: '',

    email: '',

    phone: '',

    message: ''

  })


  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value })

  }


  const handleSubmit = (e) => {

    e.preventDefault()

    // Handle form submission here

    console.log(formData)

  }


  return (

    <form onSubmit={handleSubmit} className="space-y-6">

      <div className="space-y-2">

        <label htmlFor="name" className="block text-sm font-medium">

          Name

        </label>

        <input

          id="name"

          name="name"

          type="text"

          value={formData.name}

          onChange={handleChange}

          placeholder="Enter your name"

          className="w-full px-4 py-2 border rounded-md"

          required

        />

      </div>


      <div className="space-y-2">

        <label htmlFor="email" className="block text-sm font-medium">

          Email

        </label>

        <input

          id="email"

          name="email"

          type="email"

          value={formData.email}

          onChange={handleChange}

          placeholder="Enter your email"

          className="w-full px-4 py-2 border rounded-md"

          required

        />

      </div>


      <div className="space-y-2">

        <label htmlFor="phone" className="block text-sm font-medium">

          Phone

        </label>

        <input

          id="phone"

          name="phone"

          type="tel"

          value={formData.phone}

          onChange={handleChange}

          placeholder="Enter your phone"

          className="w-full px-4 py-2 border rounded-md"

          required

        />

      </div>


      <div className="space-y-2">

        <label htmlFor="message" className="block text-sm font-medium">

          How can we help?

        </label>

        <textarea

          id="message"

          name="message"

          value={formData.message}

          onChange={handleChange}

          placeholder="Enter your message"

          className="w-full px-4 py-2 border rounded-md min-h-[150px]"

          required

        />

      </div>


      <button

        type="submit"

        className="w-full bg-[#006666] hover:bg-[#005555] text-white py-2 px-4 rounded-md transition-colors"

      >

        Get In Touch

      </button>

    </form>

  )

}


export default ContactForm