# Markdown Links

## Instalación de la libreria

```sh
Módulo instalable vía npm install Afernandezc435/LIM014-mdlinks.
```

Autor: Ana Fernandez

## Diagrama de flujo

[!Diagrama](https://raw.githubusercontent.com/Afernandezc435/LIM014-mdlinks/main/img/flujograma.jpeg)

## Documentacion técnica de la librería

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

### Archivos del proyecto

- `README.md` con descripción del módulo, instrucciones de instalación/uso,
  documentación del API y ejemplos.
- `index.js`: Desde este archivo se exporta una función (`mdLinks`).
- `package.json` con nombre, versión, descripción, autores, licencia,
  dependencias, scripts (pretest, test, ...)
- `.editorconfig` con configuración para editores de texto.
- `.eslintrc` con configuración para linter.
- `.gitignore` para ignorar carpetas que no deban
  incluirse en control de versiones (`git`).
- `test/md-links.spec.js` Contiene los tests unitarios y asincronos de cada función
  `mdLinks()`. La implementación pasa los tets.

### JavaScript API

El módulo se importa en otros scripts de Node.js y ofrece la
siguiente interfaz:

#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio.
- `options`: Un objeto con las siguientes propiedades:
  - `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función retorna una promesa(`Promise`) que resuelve un arreglo
(`Array`) de objetos (`Object`), donde cada objeto representa un link
[!Links](/coverage/img/links.png)

### CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación se ejecuta de la siguiente
manera a través de la terminal

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo hace una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.
[!validate](/coverage/img/validate.png)

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

[!stats](/coverage/img/stats.png)

## 9. Checklist

### General

- [x ] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

- [x ] Un board con el backlog para la implementación de la librería.
- [x ] Documentación técnica de la librería.
- [x ] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

- [x ] El módulo exporta una función con la interfaz (API) esperada.
- [x ] Implementa soporte para archivo individual
- [x ] Implementa soporte para directorios
- [x ] Implementa `options.validate`

### CLI

- [x ] Expone ejecutable `md-links` en el path (configurado en `package.json`)
- [x ] Se ejecuta sin errores / output esperado
- [x ] Implementa `--validate`
- [x ] Implementa `--stats`

### Pruebas / tests

- [x ] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
- [x ] Pasa tests (y linters) (`npm test`).
