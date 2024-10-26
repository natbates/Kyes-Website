import "../styles/contact.css";
import { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        _replyto: "", // Change email to _replyto
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div id="contact">
            <h1>Contact</h1>
            <p>Feel free to contact me with any enquiries.</p>
            <div id="contact-form">
                <form
                    action="https://formspree.io/f/xeqykrak"
                    method="POST"
                >
                    <div id = "name-container">
                        <input
                            type="text"
                            id="name"
                            placeholder="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div id = "email-container">
                        <input
                            type="email"
                            id="email"
                            placeholder="email"
                            name="_replyto" // Update name to _replyto
                            value={formData._replyto} // Update value to formData._replyto
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div id = "message-container">
                        <textarea
                            id="message"
                            name="message"
                            placeholder="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
