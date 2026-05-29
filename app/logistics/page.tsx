export const dynamic = 'force-dynamic';

export default function LogisticsPage() {
  return (
    <main className='min-h-screen bg-white'>
      <section className='relative h-80 bg-gray-900 flex items-center justify-center overflow-hidden'>
        <img src='https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1400' alt='Logistics' className='absolute inset-0 w-full h-full object-cover opacity-40' />
        <div className='relative z-10 text-center text-white px-4'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>Road Freight and Haulage</h1>
          <p className='text-xl text-gray-200'>Moving your goods safely from Point A to Point B</p>
        </div>
      </section>
      <section className='max-w-4xl mx-auto px-4 py-14 text-center'>
        <h2 className='text-3xl font-bold text-gray-900 mb-6'>Reliable Cargo Transportation</h2>
        <p className='text-gray-600 text-lg leading-relaxed'>Turkenya Tours and Safaris facilitates the transportation of goods by road across Kenya and East Africa. Whether you have a small consignment or a full container load, we connect you with the right vehicle for the job safely, on time, and at competitive rates.</p>
      </section>
      <section className='bg-gray-50 py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center'>Our Fleet</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center'>
              <div className='text-5xl mb-4'>🚛</div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>Lorries</h3>
              <p className='text-gray-600 text-sm'>General purpose lorries for mid-size cargo loads. Ideal for palletised goods, hardware and general merchandise.</p>
            </div>
            <div className='bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center'>
              <div className='text-5xl mb-4'>🚚</div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>Box Body Trucks</h3>
              <p className='text-gray-600 text-sm'>Enclosed box body trucks that protect cargo from weather and dust. Perfect for retail goods, electronics and sensitive freight.</p>
            </div>
            <div className='bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center'>
              <div className='text-5xl mb-4'>🚜</div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>Trailers</h3>
              <p className='text-gray-600 text-sm'>High-capacity trailers for large or heavy loads. Suitable for bulk goods, machinery and oversized cargo.</p>
            </div>
            <div className='bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center'>
              <div className='text-5xl mb-4'>🏗</div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>Flatbed Trucks</h3>
              <p className='text-gray-600 text-sm'>Long flatbed and low-loader trucks built to carry shipping containers and heavy equipment.</p>
            </div>
          </div>
        </div>
      </section>
      <section className='max-w-5xl mx-auto px-4 py-16'>
        <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center'>How It Works</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='flex flex-col items-center text-center'>
            <div className='w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900 mb-4' style={{backgroundColor:'#fff000'}}>01</div>
            <h3 className='text-xl font-bold text-gray-900 mb-3'>Tell Us Your Cargo</h3>
            <p className='text-gray-600'>Share cargo type, weight, dimensions, pickup and drop-off locations.</p>
          </div>
          <div className='flex flex-col items-center text-center'>
            <div className='w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900 mb-4' style={{backgroundColor:'#fff000'}}>02</div>
            <h3 className='text-xl font-bold text-gray-900 mb-3'>We Match the Right Truck</h3>
            <p className='text-gray-600'>We assign the appropriate vehicle for your load — lorry, box body, trailer or flatbed.</p>
          </div>
          <div className='flex flex-col items-center text-center'>
            <div className='w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900 mb-4' style={{backgroundColor:'#fff000'}}>03</div>
            <h3 className='text-xl font-bold text-gray-900 mb-3'>Goods Delivered</h3>
            <p className='text-gray-600'>Your cargo is transported safely and delivered on time to your destination.</p>
          </div>
        </div>
      </section>
      <section className='bg-gray-900 py-16'>
        <div className='max-w-4xl mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold text-white mb-4'>Need to Move Cargo?</h2>
          <p className='text-gray-400 mb-8 text-lg'>Tell us your pickup point, destination and cargo details — we will sort the rest.</p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a href='https://wa.me/254729888666?text=Hi%20Turkenya%2C%20I%20need%20to%20transport%20cargo' target='_blank' rel='noopener noreferrer' className='bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors'>WhatsApp Us Now</a>
            <a href='/contact' className='px-8 py-4 rounded-full font-bold text-lg border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-colors'>Contact Us</a>
          </div>
          <p className='mt-8 text-gray-400'>+254 729 888 666 | +254 728 415 496 | info@turkenya.com</p>
        </div>
      </section>
    </main>
  );
}