const MapSection = () => {
  return (
    <div className="mt-12 rounded-2xl border border-hairline bg-canvas shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Our Location</h2>
        <p className="mb-4">
          Into Nepal Treks & Travels P (Ltd)
        </p>
        <p className="">Lakeside, Pokhara, Nepal</p>
      </div>
      <div className="w-full h-[400px]">
        <iframe
          src="https://www.google.com/maps?q=Into+Nepal+Treks+%26+Travels+P+Ltd+Lakeside+Pokhara+Nepal&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Into Nepal Treks Location"
          className="rounded-b-2xl"
        ></iframe>
      </div>
    </div>
  );
};

export default MapSection;
