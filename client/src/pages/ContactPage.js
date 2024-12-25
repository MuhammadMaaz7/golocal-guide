import React from 'react'

import Footer from '../components/common/Footer'

import Navbar from '../components/common/Navbar'

import ContactForm from '../components/contact/ContactForm'

import Hero from '../components/contact/ContactHero'

import ContactInfo from '../components/contact/ContactInfo'


export default function ContactPage() {

    return (

      <>

        <Navbar />

        <Hero />

        <main className="min-h-screen bg-white">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            <div className="text-center mb-12">

              <h2 className="text-sm font-semibold text-[#006666] tracking-wide uppercase">

                CONTACT US

              </h2>

              <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">

                Connect with Us - We're Here to Help

              </h1>

            </div>

  

            <div className="grid lg:grid-cols-2 gap-12 mt-12">

              <ContactInfo />

              <div className="bg-white rounded-lg p-8 shadow-lg">

                <ContactForm />

              </div>

            </div>

          </div>

        </main>

        <Footer />

      </>

    )

  }