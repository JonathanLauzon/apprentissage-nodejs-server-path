var http = require('http'); // Requête du module http
var fs = require('fs'); // Requête du module fileSync
var url = require('url'); // Requête du module d'url

/*Création de deux tableaux sur le serveur qui contiendront les valeurs extraites des fichiers JSON*/
var oProvinces;
var oEtats;

// Création du serveur
http.createServer( function (request, response) {
	// Extraction de l'adresse url
	var pathname = url.parse(request.url).pathname;
	// Affichage de l'adresse url dans la console
	console.log(pathname);

	// Si l'adresse est égale à /provinces
	if(pathname == '/provinces') {
		// Aller chercher le fichiers JSON des provinces
		fs.readFile('provinces.json', 'utf8', function (err, data) {
			if (err) {
				// Si le chargement rencontre une erreur, exécuter la fonction générique des erreurs de chargement de fichiers
				erreurFichier(pathname, err);
			}
			else {
				// Si les provinces sont bien chargées, les ajouter à l'objet local
				oProvinces = JSON.parse(data);
				// Retourner une réponse HTML en encodage utf-8
				response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});  
				// Écrire un titre et ouvrir un tableau d'éléments HTML
				response.write('<h1>Les provinces&nbsp;:</h1><table>');
				// Parcourir l'objet des provinces
				for(province in oProvinces) {
					// Inscrire l'acronyme et le nom de chaque province
					response.write('<tr><td>'+province+'</td><td>'+oProvinces[province]+'</td></tr>');
				}
				// Fermer la liste HTML
				response.write('</table>');
				// Fermer la réponse du serveur
				response.end();
			}
		});
	}
	// Si l'adresse est égale à /etats
	else if(pathname == '/etats') {
		fs.readFile('etats.json', 'utf8', function (err, data) {
			if (err) {
				// Si le chargement rencontre une erreur, exécuter la fonction générique des erreurs de chargement de fichiers
				erreurFichier(pathname, err);
			}
			else {
				// Si les états sont bien chargés, les ajouter à l'objet local
				oEtats = JSON.parse(data);
				// Retourner une réponse HTML en encodage utf-8
				response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});  
				// Écrire un titre et ouvrir un tableau d'éléments HTML
				response.write('<h1>Les États fondateurs&nbsp;:</h1><table>');
				// Parcourir l'objet des états
				for(etat in oEtats) {
					// Inscrire l'acronyme et le nom de chaque état
					response.write('<tr><td>'+etat+'</td><td>'+oEtats[etat]+'</td></tr>');
				}
				// Fermer la liste HTML
				response.write('</table>');
				// Fermer la réponse du serveur
				response.end();
			}
		});
	}
	else {
		// Si la page demandée n'est pas prise en charge, retourner un message d'erreur
		response.writeHead(404, {'Content-Type': 'text/html; charset=utf8'});
		response.write('<h1>Désolé! La page recherchée n\'existe pas.</h1>');
		response.write('<p>Vous pourriez essayer les pages "provinces" ou "etats"...</p>');
		response.end();
	}

	function erreurFichier(leChemin, erreur) {
		// Écrire un message d'erreur incluant le nom de la page et le code d'erreur
		response.writeHead(404, {'Content-Type': 'text/html; charset=utf8'});
		response.write('<h1>Oups!</h1>');
		response.write('<p>Il semblerait que le fichier demandé à la page "'+leChemin+'" ait rencontré une erreur :</p>');
		response.write('<p>'+erreur+'</p>');
		response.end();
	}
}).listen(8081); //On écoute la page sur le port 8081


