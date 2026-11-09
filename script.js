/* Adeline Rochet · landingspagina
   1. Zachte verschijning van secties bij het scrollen
   2. Nieuwsbriefformulier: controle + versturen naar MailerLite */

/* ===== MAILERLITE-INSTELLINGEN =====
   Vind je ACCOUNT_ID en FORM_ID in MailerLite:
   Forms > jouw embedded form > Embed form > tabblad "HTML code".
   In de code staat een regel zoals:
   action="https://assets.mailerlite.com/jsonp/1234567/forms/987654321098765432/subscribe"
                                               ^ACCOUNT_ID  ^FORM_ID
   Laat ze leeg om het formulier in demomodus te testen (er wordt dan niets verstuurd). */
const MAILERLITE_ACCOUNT_ID = '2747888';
const MAILERLITE_FORM_ID = '203588726771680985';

document.documentElement.classList.remove('no-js');

/* 1. Verschijnen bij scrollen */
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => io.observe(el));
})();

/* 2. Formulier */
(function () {
  const form = document.getElementById('signup-form');
  if (!form) return;
  const success = document.getElementById('form-success');
  const formError = document.getElementById('form-error');
  const button = document.getElementById('f-submit');
  const name = document.getElementById('f-name');
  const email = document.getElementById('f-email');
  const optin = document.getElementById('f-optin');

  const MSG = {
    name: 'Vul je voornaam in.',
    emailEmpty: 'Vul je e-mailadres in.',
    emailInvalid: 'Dit e-mailadres lijkt niet te kloppen. Kijk het even na.',
    optin: 'Vink het vakje aan om de nieuwsbrief te ontvangen.',
    exists: 'Dit e-mailadres staat al op onze lijst. Je hoort binnenkort van ons.',
    error: 'Er ging iets mis bij het versturen. Probeer het over een paar minuten opnieuw.'
  };

  function setError(input, message) {
    const field = input.closest('.field');
    const out = document.getElementById(input.getAttribute('aria-describedby'));
    field.classList.toggle('is-invalid', !!message);
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    out.textContent = message || '';
  }

  function validate() {
    let ok = true;
    const emailValue = email.value.trim();
    if (!name.value.trim()) { setError(name, MSG.name); ok = false; } else setError(name, '');
    if (!emailValue) { setError(email, MSG.emailEmpty); ok = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailValue)) { setError(email, MSG.emailInvalid); ok = false; }
    else setError(email, '');
    if (!optin.checked) { setError(optin, MSG.optin); ok = false; } else setError(optin, '');
    return ok;
  }

  [name, email].forEach(i => i.addEventListener('blur', () => { if (i.value) validate(); }));
  optin.addEventListener('change', () => { if (optin.checked) setError(optin, ''); });

  function showSuccess() {
    form.hidden = true;
    success.hidden = false;
    success.focus();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formError.textContent = '';
    if (!validate()) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    button.disabled = true;
    button.textContent = 'Even geduld…';

    // Demomodus: nog geen MailerLite-gegevens ingevuld
    if (!MAILERLITE_ACCOUNT_ID || !MAILERLITE_FORM_ID) {
      setTimeout(showSuccess, 700);
      return;
    }

    const url = `https://assets.mailerlite.com/jsonp/${MAILERLITE_ACCOUNT_ID}/forms/${MAILERLITE_FORM_ID}/subscribe`;
    const data = new FormData(form);
    data.set('fields[name]', name.value.trim());
    data.set('fields[email]', email.value.trim());

    try {
      const res = await fetch(url, { method: 'POST', body: data });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success !== false) {
        showSuccess();
      } else {
        const text = JSON.stringify(json).toLowerCase();
        formError.textContent = text.includes('already') ? MSG.exists : MSG.error;
        button.disabled = false;
        button.textContent = 'Schrijf je in';
      }
    } catch (err) {
      // Blokkeert de browser het antwoord (CORS), dan versturen we zonder het antwoord te lezen.
      try {
        await fetch(url, { method: 'POST', body: data, mode: 'no-cors' });
        showSuccess();
      } catch (err2) {
        formError.textContent = MSG.error;
        button.disabled = false;
        button.textContent = 'Schrijf je in';
      }
    }
  });
})();
