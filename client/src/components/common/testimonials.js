const testimonials = [
    {
      name: 'Sarah Thompson',
      role: 'Tourist',
      image: '/placeholder.svg?height=400&width=400',
      quote: 'GoLocal Guide made my trip unforgettable. The local expertise and personalized tours were amazing!',
    },
    {
      name: 'John Davis',
      role: 'Local Guide',
      image: '/placeholder.svg?height=400&width=400',
      quote: 'As a guide, I love connecting with travelers and sharing the best of my city through GoLocal Guide.',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Business Owner',
      image: '/placeholder.svg?height=400&width=400',
      quote: 'GoLocal Guide has helped my small business reach more tourists and grow significantly.',
    },
  ];
  
  export default function Testimonials() {
    return (
      <section className="bg-blue-600 py-12 px-4 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Hear from our community</span>
          </h2>
          <div className="mt-8 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="lg:col-span-1">
                <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <p className="text-xl font-semibold text-gray-900">{testimonial.quote}</p>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={testimonial.image}
                          alt={`${testimonial.name}'s profile`}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  