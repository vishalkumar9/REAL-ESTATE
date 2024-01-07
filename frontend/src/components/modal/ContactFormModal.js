import React, {useState} from 'react';
import "./ContactFormModal.css"
const ContactFormModal = ({handleSubmit}) => {

    const [contactForm, setContactForm] = useState({
        name:"",
        email:"",
        phno:""
    });

    const handleChange = (e) =>{
        e.preventDefault();
        setContactForm((contactForm) => ({
            ...contactForm,
            [e.target.name]:e.target.value,
        }));
    }

    const handleData = (e) =>{
        e.preventDefault();
        handleSubmit(contactForm);
    }

    return (
        <div className="modal fade" id="conatctForm" data-bs-backdrop="static" data-bs-keyboard="false"
             tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Fill up your details</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3 custom_div ">
                            <span className="input-group-text">Name</span>
                            <input type="text" aria-label="Name" name="name" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="input-group mb-3 custom_div">
                            <span className="input-group-text" id="basic-addon1">@</span>
                            <input type="text" className="form-control" name="email" placeholder="Email" aria-label="Email"
                                   aria-describedby="basic-addon1" onChange={handleChange}/>
                        </div>
                        <div className="input-group custom_div">
                            <span className="input-group-text">Phno</span>
                            <input type="tel" aria-label="PhoneNo" id="phone" name="phno" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="modal-footer custom_div">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleData}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactFormModal;