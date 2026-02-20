const testimonials = [
  {
    name: "Donald Jackman",
    role: "Content Creator",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    text:
      "Amazing food and great service. I really enjoyed every bite!",
  },
  {
    name: "Richard Nelson",
    role: "Instagram Influencer",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    text:
      "Best restaurant experience. The taste and ambience are perfect.",
  },
  {
    name: "James Washington",
    role: "Marketing Manager",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    text:
      "Highly recommended! Quality food and friendly staff.",
  },
];

export default function Testimonial() {
  return (
    <section className="py-20 bg-gray-50">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold">
          What Our <span className="text-yellow-500">Customers Say</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Real reviews from our happy customers
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="w-80 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="relative flex flex-col items-center p-6 pt-16">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-full absolute -top-12 border-4 border-white object-cover"
              />

              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">{item.role}</p>

              <p className="text-center text-gray-600 mt-4 text-sm">
                {item.text}
              </p>

              {/* Stars */}
              <div className="flex gap-1 mt-4 text-orange-500">
                ⭐ ⭐ ⭐ ⭐ ⭐
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
