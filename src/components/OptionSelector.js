import React, { useEffect, useState } from 'react';

const OptionSelector = () => {
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [showForm, setShowForm] = useState(false);

  function sendEmail(){
    emailjs.init({
      publicKey: 'qoaJXOD7OZSk9AerP',
      // Do not allow headless browsers
      blockHeadless: true,
      blockList: {
        // Block the suspended emails
        list: ['foo@emailjs.com', 'bar@emailjs.com'],
        // The variable contains the email address
        watchVariable: 'userEmail',
      },
      limitRate: {
        // Set the limit rate for the application
        id: 'app',
        // Allow 1 request per 10s
        throttle: 10000,
      },
    });

    var templateParams = {
      name: formData.firstName + ' ' + formData.lastName + '. Email:' + formData.email + ', Phone:' + formData.phone ,
      notes: 'Check this out! Claim has been submitted.',
    };
    
    emailjs.send('service_o5tomtc', 'template_y2gp2v7', templateParams).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
      },
      (error) => {
        console.log('FAILED...', error);
      },
    );

  }

  useEffect(() => {
    const loadPayPal = (amount, callback) => {
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=AWkCo2Ns0_FkdNrSiW70zpvE5N6UyyUNr2m1GMc3Tj_F-VBu-C-a_6rTeJvm5ezKh_gV4MT3vIN1dU-0&currency=USD";
      script.onload = callback;
      document.body.appendChild(script);
    };

    if (selected === 'option1') {
      loadPayPal('9.99', () => {
        window.paypal.Buttons({
          createOrder: (data, actions) => actions.order.create({
            purchase_units: [{ amount: { value: '9.99' } }]
          }),
          onApprove: (data, actions) => actions.order.capture().then(() => {
            window.location.href = "https://www.nydoordashsettlement.com";
          })
        }).render('#paypal-option1');
      });
    } else if (selected === 'option2' || selected === 'option3') {
      const value = selected === 'option2' ? '19.99' : '29.99';
      loadPayPal(value, () => {
        window.paypal.Buttons({
          createOrder: (data, actions) => actions.order.create({
            purchase_units: [{ amount: { value } }]
          }),
          onApprove: (data, actions) => actions.order.capture().then(() => {
            alert("Thank you! We’ve received your info and will contact you soon.");
            // send email to aloqacorp@gmail.com
            sendEmail();
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: ''
            });
          })
        }).render('#paypal-support');
      });
    }
  }, [selected]);

  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="options-container">
      <div className="option-card">
        <h3>$9.99 - Self Filing</h3>
        <p>We'll redirect you to the official settlement site to submit the claim yourself.</p>
        <div id="paypal-option1"></div>
        <button onClick={() => setSelected('option1')} className="btn">Choose</button>
      </div>
      <div className="option-card">
        <h3>$19.99 - We File for You</h3>
        <p>We’ll handle everything. You just provide your info and we’ll submit your claim.</p>
        <button onClick={() => { setSelected('option2'); setShowForm(true); }} className="btn">Choose</button>
      </div>
      <div className="option-card">
        <h3>$29.99 - Filing + Support</h3>
        <p>Includes everything in Option 2 plus phone/chat support about your case.</p>
        <button onClick={() => { setSelected('option3'); setShowForm(true); }} className="btn">Choose</button>
      </div>
      {showForm && (selected === 'option2' || selected === 'option3') && (
        <div className="form-container">
          <h3>Enter Your Info</h3>
          <input name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleInput} required />
          <input name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleInput} required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInput} required />
          <input name="phone" type="text" placeholder="Phone Number" value={formData.phone} onChange={handleInput} required />
          <div id="paypal-support"></div>
        </div>
      )}
    </div>
  );
};

export default OptionSelector;