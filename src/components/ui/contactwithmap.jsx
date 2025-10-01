import "leaflet/dist/leaflet.css";

export default function ContactWithMap() {
  // Ofis lokatsiyasi koordinatalari
  const officeLocation = { lat: 41.293276, lng: 69.211759 };

  return (
    <>
      {/* Xarita qismi */}
      <div className="w-full h-[300px] md:w-[500px] md:h-[550px] md:rounded-lg">
        <iframe
          src="https://yandex.uz/map-widget/v1/?ll=69.211759%2C41.293276&z=16&pt=69.211759,41.293276,pm2rdm"
          width="100%"
          height="100%"
          style={{ border: "none", borderRadius: "10px" }}
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}
