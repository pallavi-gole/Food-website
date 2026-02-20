export default function NewsLetter() {
  return (
    <section className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-20 md:py-24 px-4">
      
      <div className="max-w-4xl mx-auto text-center text-white">

        {/* Small tag */}
        <p className="text-orange-400 font-semibold tracking-wide text-sm sm:text-base">
          Stay Updated
        </p>

        {/* Heading */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
          Subscribe to our newsletter
        </h1>

        {/* Sub text */}
        <p className="text-gray-300 mt-4 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base">
          Get the latest offers, food updates, and special discounts directly
          in your inbox.
        </p>

        {/* Input box */}
        <div className="mt-8 sm:mt-10 w-full max-w-xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center 
                          bg-white/10 backdrop-blur-md 
                          rounded-2xl sm:rounded-full 
                          p-2 gap-3">

            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full flex-1 bg-transparent 
                         px-4 sm:px-6 py-3 
                         outline-none text-white 
                         placeholder-gray-300"
            />

            <button className="w-full sm:w-auto 
                               bg-orange-500 hover:bg-orange-600 
                               text-white font-semibold 
                               px-6 sm:px-8 py-3 
                               rounded-xl sm:rounded-full 
                               transition-all duration-300 
                               hover:scale-105">
              Subscribe
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}
