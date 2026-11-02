# Laboratorio: Práctica de Endpoints en Frontend con React

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css&logoColor=white)
![REST API](https://img.shields.io/badge/REST%20API-Integration-009688?style=for-the-badge)
![DummyJSON](https://img.shields.io/badge/DummyJSON-Products-6C63FF?style=for-the-badge)

---

## Descripción del Proyecto

Este proyecto corresponde al **Laboratorio: Práctica de Endpoints en Frontend con React**, desarrollado como parte de las actividades prácticas de la asignatura.

La aplicación consume el recurso `products` de la API pública **DummyJSON**, permitiendo trabajar con diferentes operaciones HTTP desde una interfaz desarrollada con React.

Durante la práctica se implementan funcionalidades de consulta, búsqueda, filtrado, paginación, creación, actualización y eliminación de productos.

El propósito principal es comprender cómo una aplicación frontend puede comunicarse con una API REST y gestionar información externa mediante endpoints.

---

## Información del Estudiante

| Campo | Información |
|---|---|
| Nombre(s) | Héctor Mauricio |
| Apellido(s) | Fuentes Araujo |
| Correo Electrónico | fuenteshector392@gmail.com |
| Asignatura | Desarrollo Web 2 |
| Tutor | Vladimir Mate |
| Fecha de Entrega | 1 de noviembre de 2026 |

---

## Objetivo del Laboratorio

Desarrollar una aplicación en React que consuma endpoints REST de DummyJSON para gestionar productos mediante operaciones de consulta, búsqueda, filtrado, creación, actualización y eliminación.

---

## Competencia

Implementa la integración de una API REST en React, organizando componentes, servicios y rutas para gestionar datos externos de forma estructurada y funcional.

---

## Tecnologías Utilizadas

- React
- Vite
- JavaScript
- React Router
- CSS3
- Fetch API
- REST API
- DummyJSON
- Visual Studio Code
- Node.js
- npm

---

## API Utilizada

La aplicación utiliza la API pública:

```text
https://dummyjson.com/products
````

Documentación:

```text
https://dummyjson.com/docs/products
```

DummyJSON permite practicar el consumo de APIs REST sin necesidad de desarrollar un backend propio.

---

## Estructura del Proyecto

```text
react-products/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProductList.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   └── ProductDetail.jsx
│   │
│   ├── services/
│   │   └── productService.js
│   │
│   ├── styles/
│   │   └── main.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
└── vite.config.js
```

---

## Funcionalidades Implementadas

* Mostrar productos
* Consultar producto por ID
* Buscar productos
* Filtrar productos por categoría
* Implementar paginación
* Crear productos
* Actualizar productos
* Eliminar productos
* Manejar estados de carga
* Manejar errores
* Navegar entre vistas utilizando React Router

---

## Endpoints Utilizados

| Operación               | Método HTTP | Endpoint                       |
| ----------------------- | ----------- | ------------------------------ |
| Obtener productos       | `GET`       | `/products`                    |
| Obtener producto por ID | `GET`       | `/products/:id`                |
| Buscar productos        | `GET`       | `/products/search?q=`          |
| Obtener categorías      | `GET`       | `/products/categories`         |
| Productos por categoría | `GET`       | `/products/category/:category` |
| Paginar productos       | `GET`       | `/products?limit=&skip=`       |
| Crear producto          | `POST`      | `/products/add`                |
| Actualizar producto     | `PUT`       | `/products/:id`                |
| Eliminar producto       | `DELETE`    | `/products/:id`                |

---

## Flujo de la Aplicación

```text
Inicio
   ↓
Listado de Productos
   ↓
Buscar / Filtrar / Paginar
   ↓
Ver Detalle
   ↓
Crear / Actualizar / Eliminar
```

---

## Consideración sobre DummyJSON

DummyJSON permite realizar operaciones `POST`, `PUT` y `DELETE` para fines de prueba.

Sin embargo, estas operaciones son simuladas y los cambios realizados no se almacenan permanentemente en el servidor.

Esto permite practicar el flujo completo de integración de una API REST desde React sin necesidad de desarrollar un backend propio.

---

## Resultados Esperados

Al finalizar el laboratorio, el estudiante deberá ser capaz de:

* Consumir una API REST desde React.
* Utilizar diferentes métodos HTTP.
* Separar la lógica de acceso a datos mediante servicios.
* Mostrar información obtenida desde endpoints.
* Implementar búsqueda, filtros y paginación.
* Crear, actualizar y eliminar información desde la interfaz.
* Manejar estados de carga y posibles errores.

---

## Observaciones

- DummyJSON simula `POST`, `PUT` y `DELETE`, por lo que los cambios solo se reflejan en pantalla y se pierden al recargar la página.
- Los productos creados desde el formulario reciben un `id` local, ya que DummyJSON devuelve siempre el mismo. Por eso no tienen el botón "Ver detalle" y se editan o eliminan sin llamar a la API.
- La paginación solo se muestra en el listado completo, no durante una búsqueda o un filtro por categoría.
- Se agregó un botón "Cancelar" al editar y una ruta para páginas no encontradas.

---

## Licencia

Proyecto desarrollado con fines académicos para prácticas de laboratorio.
