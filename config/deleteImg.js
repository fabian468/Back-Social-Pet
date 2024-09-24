const fs = require('fs');
const path = require('path');


function deleteImage(filePath) {

    const fullPath = path.join(__dirname, '..', filePath);

    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error('Error al eliminar el archivo:', err);
        } else {
            console.log('Archivo eliminado con éxito');
        }
    });
}

module.exports = deleteImage