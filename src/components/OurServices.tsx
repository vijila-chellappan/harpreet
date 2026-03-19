import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/api";

interface Service {
  id: number;
  title: string;
  thumb_image: string;
  image: string;
  short_description: string;
  description: string;
  posted_by: string;
  created_at: string;
}

const OurServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get(API_ENDPOINTS.SERVICES);
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  

  return (
    <div className="container py-5">
      <h2>Our Services</h2>

      <div className="row">
        {services.map((service) => (
          <div className="col-md-4 mb-4" key={service.id}>
            <div className="card">
              <img
                src={service.thumb_image}
                className="card-img-top"
                alt={service.title}
              />
              <div className="card-body">
                <h5>{service.title}</h5>
                <p>{service.short_description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;