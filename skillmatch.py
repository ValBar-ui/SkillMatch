import requests
import bcrypt

# Configuration de l'API Airtable
API_KEY = 'patsjq7jG1QE1JVbG.a181569abacf688dc1783945669694bd4f6f8e3f433a9cb6a54b32a97413ddfb'
BASE_ID = 'appSJ55v1bOvE7zzd'
TABLE_NAME = 'utilisateurs'

# Fonction pour hacher le mot de passe
def hash_password(password):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

# Fonction pour ajouter un enregistrement dans Airtable
def add_airtable_record(record):
    url = f'https://api.airtable.com/v0/{BASE_ID}/{TABLE_NAME}'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    response = requests.post(url, headers=headers, json={"fields": record})
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Erreur lors de l'ajout de l'utilisateur: {response.status_code} - {response.text}")
        return None

# Exemple d'utilisation
if __name__ == '__main__':
    # Créer un utilisateur avec un mot de passe haché
    user = {
        "Nom": "Dupont",
        "Prénom": "Jean",
        "Email": "jean.dupont@example.com",
        "Mot de Passe": hash_password("mon_mot_de_passe")
    }
    added_record = add_airtable_record(user)
    if added_record:
        print('Utilisateur ajouté avec succès !')
    else:
        print('Erreur lors de l\'ajout de l\'utilisateur.')
