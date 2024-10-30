document.getElementById('status').addEventListener('change', function() {
    let candidateFields = document.getElementById('candidateFields');
    if (this.value === 'candidat') {
        candidateFields.style.display = 'block';
    } else {
        candidateFields.style.display = 'none';
    }
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (password.length < 8) {
        alert('Le mot de passe doit contenir au moins 8 caractères.');
        event.preventDefault(); // Empêche la soumission du formulaire si invalide
    }

    if (!validateEmail(email)) {
        alert('Veuillez entrer une adresse e-mail valide.');
        event.preventDefault(); // Empêche la soumission du formulaire si invalide
    }
});

function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission classique du formulaire

    let formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        status: document.getElementById('status').value,
        location: document.getElementById('location').value,
        preferredLocation: document.getElementById('preferredLocation').value || null
    };

    // Envoi des données au webhook de Make
    fetch('https://hook.eu2.make.com/ocq5w8jogn8t7kfxa4apa3loydkv1kaa', {  // Remplace TON_URL_WEBHOOK_ICI par l'URL du webhook
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Une erreur est survenue lors de l\'inscription.');
        }
        return response.text();  // On change ici response.json() par response.text()
    })
    .then(() => {
        alert('Inscription réussie !');
    })
    .catch((error) => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue. Merci de réessayer.');
    });
});
