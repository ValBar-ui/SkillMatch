// script.js : Gère l'inscription et la vérification de l'existence d'un compte

document.getElementById('inscriptionForm').onsubmit = async function(event) {
    event.preventDefault(); // Empêcher la soumission du formulaire par défaut

    // Récupérer les données du formulaire
    const formData = new FormData(this);
    const email = formData.get('email'); // Assurez-vous que le champ "email" existe bien dans le formulaire

    try {
        // Étape 1 : Vérification de l'existence de l'adresse e-mail
        const checkEmailResponse = await fetch('https://hook.eu2.make.com/ocq5w8jogn8t7kfxa4apa3loydkv1kaa' + email, {
            method: 'GET'
        });

        // Vérifier si l'adresse e-mail existe déjà dans la base de données
        if (checkEmailResponse.status === 409) {
            // Si le code de réponse est 409 (Conflict), un compte existe déjà avec cet e-mail
            alert('Un compte avec cet e-mail existe déjà. Veuillez vous connecter ou utiliser une autre adresse.');
            return; // Ne pas soumettre le formulaire
        }

        // Étape 2 : Soumettre les données pour l'inscription
        const response = await fetch('https://hook.eu2.make.com/ocq5w8jogn8t7kfxa4apa3loydkv1kaa', {
            method: 'POST',
            body: formData
        });

        // Gestion des réponses du serveur
        if (response.ok) {
            alert('Inscription réussie !');
            // Optionnel : Rediriger l'utilisateur vers une autre page
            window.location.href = '/page-d-accueil';
        } else {
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
    
};
