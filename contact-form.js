// Inizializzazione di EmailJS
(function() {
  emailjs.init('rVDgLyBSh-kt2B7gY'); // Sostituisci con la tua Public Key
})();

// Funzionalità di base per il form di contatto
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Impedisce l'invio predefinito del modulo

  // Credenziali EmailJS
  const serviceID = 'service_17h53j9'; // Sostituisci con il tuo Service ID
  const templateID = 'template_02vq3gr'; // Sostituisci con il tuo Template ID

  // Invio email tramite EmailJS
  emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
          alert('Thank you for contacting me! I will get back to you soon.');
          this.reset(); // Svuota i campi del modulo
      }, (error) => {
          console.error('Error while sending message:', error);
          alert('Error while sending message. Try later.');
      });
});




