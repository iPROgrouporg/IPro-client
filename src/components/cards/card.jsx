const cards = [
  "https://picsum.photos/300/400?random=1",
  "https://picsum.photos/300/400?random=2",
  "https://picsum.photos/300/400?random=3",
  "https://picsum.photos/300/400?random=4",
];

export default function CardSlider() {
  return (
    <div className="relative flex items-center justify-center h-screen">
      {cards.map((src, index) => (
        <div key={index} className="relative group">
          <div
            className="absolute w-40 h-60 rounded-xl shadow-xl cursor-pointer transition-transform duration-300 ease-out group-hover:translate-x-6"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: cards.length - index,
              left: `${index * 50}px`, // `translateX` emas, `left` ishlatilmoqda
            }}
          />
        </div>
      ))}
    </div>
  );
}
