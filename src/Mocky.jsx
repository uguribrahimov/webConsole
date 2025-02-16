import React, { useEffect, useState } from "react";

const HomePage1 = () => {
  const [data, setData] = useState(null);

  // Veri çekerken fetch kullanıyoruz.
  useEffect(() => {
    fetch("https://09a2a54f-2aad-4613-aa9e-715730aa89a2.mock.pstmn.io/mana")  // API URL
      .then((response) => response.json())  // JSON formatında veri alıyoruz.
      .then((data) => setData(data))  // Veriyi state'e kaydediyoruz.
      .catch((error) => console.error("API Error:", error));  // Hata yönetimi
  }, []);

  const handleAreaClick = (title) => {
    alert(`Tıkladığınız alan: ${title}`);
  };

  if (!data) {
    return <div>Loading...</div>;  // Veri gelene kadar Loading mesajı gösteriyoruz.
  }

  return (
    <div className="container-fluid d-flex flex-column flex-md-row vh-100">
      <div className="col-12 col-md-4 d-flex flex-column justify-content-center p-4">
        <p className="text-muted mb-2">
          <span className="bg-dark text-white rounded-pill px-2 py-1">
            {data.homepage.discountText} {/* discountText verisini API'den alıyoruz. */}
          </span> {data.homepage.discountDescription} {/* discountDescription verisini alıyoruz. */}
        </p>

        <h1 className="h3 fw-bold mb-4">{data.homepage.title}</h1> {/* title verisini alıyoruz. */}

        <p className="mb-4 text-secondary">{data.homepage.description}</p> {/* description verisini alıyoruz. */}

        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-dark rounded px-4 py-2">
            {data.homepage.getStartedButtonText} {/* getStartedButtonText verisini alıyoruz. */}
          </button>
          <button className="btn btn-outline-secondary rounded px-4 py-2">
            {data.homepage.manaIntroductionButtonText} {/* manaIntroductionButtonText verisini alıyoruz. */}
          </button>
        </div>
      </div>

      <div className="col-12 col-md-8 d-flex justify-content-center align-items-center position-relative overflow-hidden">
        <img
          src={data.homepage.imageURL}  
          alt="Furniture Map"
          useMap="#furniture-map"
          className="w-100 h-100 object-fit-cover rounded-0 rounded-md"
        />
        <map name="furniture-map">
          {data.homepage.mapAreas.map((area, index) => (
            <area
              key={index}
              shape="circle"
              coords={area.coords}
              href="#"
              alt={area.alt}
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick(area.title);  // Area'ya tıklandığında handleAreaClick fonksiyonu çalışacak
              }}
              className="position-absolute"
            />
          ))}
        </map>
      </div>
    </div>
  );
};

export default HomePage1;
