import React from "react";

const CarouselBanner = () => {
  return (
    <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
      
      <div className="carousel-inner">

        <div className="carousel-item active">
          <img
            src="/images/pexels-photo-614810.jpeg"
            className="d-block w-100"
            alt="Slide 1"
          />
          <div className="carousel-caption">
            <h2>Secure Your Family’s Future</h2>
            <p>Affordable and reliable insurance plans.</p>
            <button className="btn btn-danger">Get Started</button>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src="/images/pexels-photo-1170973.jpeg"
            className="d-block w-100"
            alt="Slide 2"
          />
          <div className="carousel-caption">
            <h2>Super Visa Insurance</h2>
            <p>Best coverage for parents & grandparents.</p>
            <button className="btn btn-danger">Get Started</button>
          </div>
        </div>

         <div className="carousel-item">
          <img
            src="/images/pexels-photo-1457844.jpeg"
            className="d-block w-100"
            alt="Slide 2"
          />
          <div className="carousel-caption">
            <h2>Term life Insurance</h2>
            <p>Best coverage for parents & grandparents.</p>
            <button className="btn btn-danger">Get Started</button>
          </div>
        </div>
         <div className="carousel-item">
          <img
            src="/images/pexels-photo-3183150.jpeg"
            className="d-block w-100"
            alt="Slide 2"
          />
          <div className="carousel-caption">
            <h2>Term life Insurance</h2>
            <p>Best coverage for parents & grandparents.</p>
            <button className="btn btn-danger">Get Started</button>
          </div>
        </div>

      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>

    </div>
  );
};

export default CarouselBanner;