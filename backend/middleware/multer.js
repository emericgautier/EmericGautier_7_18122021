/* MIDDLEWARE MULTER || Gestion des fichiers envoyés vers l'API */

// import de multer
const multer = require('multer'); // Gestion des fichiers entrants

// dictionnaire pour créer l'extension du fichier à partir du MIMETYPE
const MIME_TYPES = { 
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif' : 'gif'
};

// créer un objet de configuration pour multer 
const storage = multer.diskStorage({ // enregistrement sur le disque
    destination: (req, file, callback) => { 
        callback(null, 'images'); //  2 arguments : null (pas d'erreurs) , images (nom du dossier de destination)
    },
    filename: (req, file, callback) => { // nom de fichier utilisé, pour ne pas avoir deux fois le même nom de fichier
        const name = file.originalname.split(' ').join('_').substr(0,3); // génére le nouveau nom
        const extension = MIME_TYPES[file.mimetype]; // applique l'extension aux fichiers
        callback(null, name + '-' + Date.now() + '.' + extension); // créer le 'filename' complet
    }
});

// export le middleware multer
module.exports = multer({storage: storage}).single('image');