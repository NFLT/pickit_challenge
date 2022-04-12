/**
 * @author Leguizamón Tomassi Nicolás Federico
 * 
 * Recupera automáticamente los archivos de enrutamiento generados 
 * por el programador en el proyecto y los exporta en un array de Router
 */

 import { Router } from 'express';
 import fs from 'fs';
 
 /**
  *  Analiza el árbol de directorios del proyecto en búsqueda de archivos de enrutamiento.
  * Se consideran archivos de enrutamiento todos aquellos denominados 'routes.ts'
  * @param path nombre de la carpeta en donde iniciar la búsqueda
  * @returns un array de strings con las rutas de cada archivo routes.ts detectado
  */
export const getRouterPaths = (path: string):string[] => {
     // Si es un directorio, analiza el contenido del directorio
     if (fs.lstatSync(path).isDirectory()) {
         let dirPaths : string[] = [];
         let dirContent = fs.readdirSync(path);
 
         for (let i = 0; i < dirContent.length; i++) {
             dirPaths = dirPaths.concat(getRouterPaths(`${path}/${dirContent[i]}`));
         }
         return dirPaths;
     }
 
     let route = path.split('/');
     let name = route[route.length - 1];
     
     // Extrayendo la extensión del archivo
     let extension = name.substring(name.length - 3);
     // Quitando la extensión del nombre del archivo
     name = name.substring(0, name.length - 3);
 
     // Si es un archivo, se verifica que sea un archivo de enrutamiento
     if (fs.lstatSync(path).isFile() && name == 'routes' && ['.js', '.ts'].includes(extension)) {
         return [ path ];
     }
 
     // Si no se detectan se devuelve un array vacío
     return [];
 };
 
 /**
  * Importa el archivo router especificado
  * @param path Ruta del archivo de enrutamiento a importar
  * @returns Objeto Router con las rutas configuradas
  */
 const getRouter = (path: string) => {
     let router = require(`.${path.substring(__dirname.length, path.length - 3)}`);
     return router;
 }; 
 
 /**
  * Recupera todas las rutas que apuntan hacia los arhivos routes de los módulos
  * @returns Array de express.Router de cada módulo
  */
 export const getAllRouters = () => {
    // Recuperación de rutas a archivos.ts
    let routesArr: Router[] = [];
    let routesPaths = getRouterPaths(`${__dirname}/modules`);
    
    // Recuperando routers
    for (let i = 0; i < routesPaths.length; i++) {
        routesArr.push(getRouter(routesPaths[i]).default);
    }
    
    return routesArr;
 }
 