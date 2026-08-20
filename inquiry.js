(function () {
  'use strict';

  var WHATSAPP_NUMBER = '923021585266'; // 03021585266 in international format (Pakistan)

  function buildWhatsappUrl(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  /* ---------- Generic "Talk on WhatsApp" links ---------- */
  var genericMessage = 'Hello Zuleno Technologies, I would like to discuss a project with your team.';
  var genericLinks = [
    document.getElementById('ctaWhatsapp'),
    document.getElementById('directWhatsapp'),
    document.getElementById('footerWhatsapp')
  ];

  genericLinks.forEach(function (link) {
    if (!link) return;
    link.setAttribute('href', buildWhatsappUrl(genericMessage));
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  /* ---------- Project inquiry form ---------- */
  var form = document.getElementById('inquiryForm');
  var note = document.getElementById('formNote');
  if (!form) return;

  function encode(data) {
    return Object.keys(data)
      .map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      })
      .join('&');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var fullName = form.fullName.value.trim();
    var email = form.email.value.trim();
    var whatsapp = form.whatsapp.value.trim();
    var company = form.company.value.trim();
    var service = form.service.value;
    var budget = form.budget.value;
    var details = form.details.value.trim();

    if (!fullName || !email || !service || !budget || !details) {
      note.textContent = 'Please fill in all required fields.';
      return;
    }

    /* Build a detailed WhatsApp message from the submitted fields */
    var lines = [
      'Hello Zuleno Technologies, I would like to start a project.',
      '',
      'Name: ' + fullName,
      'Email: ' + email
    ];
    if (whatsapp) lines.push('WhatsApp: ' + whatsapp);
    if (company) lines.push('Company: ' + company);
    lines.push('Service: ' + service);
    lines.push('Budget: ' + budget);
    lines.push('Details: ' + details);

    var whatsappMessage = lines.join('\n');
    var whatsappUrl = buildWhatsappUrl(whatsappMessage);

    /* Submit to Netlify Forms in the background (static hosting, no PHP/MySQL) */
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'project-inquiry',
        fullName: fullName,
        email: email,
        whatsapp: whatsapp,
        company: company,
        service: service,
        budget: budget,
        details: details
      })
    }).catch(function () {
      /* Netlify Forms only works once deployed; ignore locally */
    });

    note.textContent = 'Thanks — opening WhatsApp to confirm your inquiry...';
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    form.reset();
  });
})();
