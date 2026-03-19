import React, { useState, ChangeEvent, FormEvent } from "react";
import "../css/ContactForm.css";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    let newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!form.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Enter valid 10 digit number";
    }

    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch("http://localhost:5000/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          alert("Form submitted successfully!");
          setForm({ name: "", email: "", phone: "", message: "" });
          setErrors({});
        } else {
          alert("Error submitting form");
        }
      } catch (error) {
        console.error(error);
        alert("Server error");
      }
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-wrapper">
        
        {/* LEFT SIDE */}
        <div className="contact-left">
          <img
            src="/images/profile.jpg"
            alt="Consultant"
            className="contact-image"
          />
          <h2>Request a Free Consultation</h2>
          <p>
            Would you like to speak to one of our financial advisors over the
            phone? Just submit your details and we’ll be in touch shortly.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="contact-right">
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <input
              type="text"
              name="email"
              placeholder="E-Mail*"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              type="text"
              name="phone"
              placeholder="Phone Number*"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}

            <textarea
              name="message"
              placeholder="Message*"
              rows={4}
              value={form.message}
              onChange={handleChange}
            />
            {errors.message && <p className="error">{errors.message}</p>}

            <button type="submit" className="submit-btn">
              GET A QUOTE NOW
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactForm;