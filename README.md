# 🎨 EstiloBGA2: Sistema Integral de Gestión para Salones de Belleza

---

## 💡 Resumen del Proyecto

**EstiloBGA** es una aplicación integral diseñada para revolucionar la gestión de citas y servicios en salones de belleza y centros de estilismo. Desarrollado como parte de la asignatura **Entornos de Programación**, este proyecto busca resolver las ineficiencias comunes en la administración de salones, ofreciendo una solución digital robusta que beneficia tanto a clientes como a estilistas y dueños de negocio.

---

## 🎯 Problema y Justificación

### La Problemática Actual

En la actualidad, muchos salones de belleza se enfrentan a desafíos significativos en la gestión de sus operaciones diarias. La **ausencia de una herramienta centralizada** conduce a:

* **Desorganización y Errores:** Duplicación de citas, olvidos de clientes y agendas desordenadas para los estilistas.
* **Dificultades Administrativas y Financieras:** Falta de acceso fácil a reportes de rendimiento, lo que obstaculiza la toma de decisiones estratégicas sobre precios, promociones y gestión de personal.
* **Insatisfacción del Cliente:** Los clientes tienen limitaciones para gestionar sus citas de forma autónoma, forzándolos a depender de llamadas o mensajes, lo que reduce la flexibilidad y genera sobrecarga en la comunicación del salón.

### Nuestra Solución

El desarrollo de **estiloBGA** surge como una respuesta directa a estas problemáticas. Nuestro sistema digital de gestión de citas busca optimizar diversos aspectos operativos del salón, mejorando su rentabilidad y eficiencia a través de:

* **Para Clientes:** Mayor autonomía y flexibilidad para agendar, modificar o cancelar citas directamente desde sus dispositivos móviles, resultando en una experiencia más cómoda y personalizada, y aumentando su satisfacción y fidelización.
* **Para Estilistas:** Una herramienta efectiva para gestionar sus agendas, evitar sobrecargas, controlar sus ingresos y el historial de citas, mejorando su organización profesional y motivación.
* **Para Dueños de Salones:** Acceso a información crucial y detallada sobre el desempeño del negocio (operaciones, ingresos, demanda de servicios), facilitando la toma de decisiones informadas y estratégicas, y mejorando el control y la visibilidad general.

Este proyecto no solo satisface las necesidades operativas, sino que también fortalece la relación con los clientes y aprovecha las tecnologías móviles para transformar la gestión de salones de belleza, creando un sistema más eficiente y rentable para todos.

---

## ✨ Características Principales

* **Gestión Integral de Citas:** Creación, visualización, edición y cancelación de citas para una programación eficiente.
* **Administración de Usuarios:** Funcionalidades CRUD completas para clientes, estilistas y administradores.
* **Catálogo de Servicios:** Control detallado sobre los servicios ofrecidos, incluyendo precios y descripciones.
* **Gestión de Disponibilidad:** Interfaz para verificar horarios y franjas disponibles de los estilistas.
* **Interfaz de Usuario (UI) Intuitiva:** Diseño limpio y fácil de usar, priorizando la experiencia del usuario.
* **Reportes y Métricas:** Acceso a información crucial sobre el desempeño del negocio para decisiones estratégicas.
* **Optimización de Búsqueda y Navegación:** Paginación y búsqueda para listas extensas de datos.

---

## 🚀 Tecnologías Utilizadas

Este proyecto fue construido utilizando un stack de tecnologías moderno y escalable:

* **Frontend:**
    * **React.js:** Biblioteca JavaScript líder para construir interfaces de usuario dinámicas y reactivas.
    * **HTML/CSS:** Base para la estructura y estilos de la aplicación web.
* **Backend:**
    * **Spring Boot:** Framework de Java para el desarrollo rápido y robusto de aplicaciones web y microservicios.
* **Base de Datos:**
    * **MongoDB:** Base de datos NoSQL flexible y escalable, elegida por su rendimiento y adaptabilidad a esquemas dinámicos.

---

## 📊 Arquitectura de Base de Datos: Migración de SQL a MongoDB

En una fase inicial, el proyecto utilizaba una base de datos SQL. Para esta segunda etapa de **estiloBGA2**, se realizó una migración estratégica a **MongoDB** con el fin de explorar sus capacidades con Spring Boot y React, y optimizar el rendimiento y la flexibilidad del sistema.

### Consideraciones Clave de la Migración:

* **Modelo de Datos:** Transición de tablas relacionales a documentos JSON (BSON).
* **Manejo de Relaciones:** Implementación de arrays embebidos para relaciones "muchos-a-muchos" y referencias para entidades principales, minimizando la necesidad de JOINs complejos.
* **Optimización de Rendimiento:** Desnormalización estratégica de datos para mejorar las velocidades de lectura en consultas frecuentes.

### Cambios Principales y Justificación:

1.  **Reducción de Colecciones:** Se consolidaron 11 tablas SQL a solo 5 colecciones principales en MongoDB para una gestión más eficiente:
    * `usuarios` (incluye clientes, estilistas, administradores)
    * `servicios`
    * `citas`
    * `reportes`
    * `disponibilidades`

2.  **Estrategias de Embebido y Referencia:**
    * **Documentos Embebidos:** Utilizados para datos que se consultan siempre juntos (ej. horarios en estilistas, servicios en citas, información de pago en citas).
    * **Referencias:** Mantienen la integridad para relaciones entre entidades principales (ej. `cliente_id` y `estilista_id` en `citas`, referencias de citas en `reportes`).

3.  **Desnormalización Estratégica:** Datos clave como nombres y contacto de cliente/estilista, y nombres de servicios, se desnormalizaron directamente en los documentos de `citas` y `reportes` para acelerar las consultas más comunes.

4.  **Eliminación de Tablas Intermedias:** Las tablas intermedias relacionales se transformaron en arrays embebidos o propiedades directas dentro de las colecciones principales (ej. `Horario_Estilista` como array embebido, `Cita_Servicio` como array embebido en `citas`).

5.  **Mejoras en el Diseño:** Se añadieron campos para el estado de la cita (programada, completada, cancelada), el estado del pago, y métricas adicionales en los reportes para mayor visibilidad y control.

### Beneficios de este Enfoque con MongoDB:

* **Rendimiento Mejorado:** La información relacionada está en un solo lugar, optimizando las consultas.
* **Flexibilidad del Esquema:** Facilita la adición de nuevos campos sin alterar la estructura completa de la base de datos.
* **Escalabilidad Mejorada:** MongoDB ofrece una mejor escalabilidad horizontal en comparación con las bases de datos relacionales.
* **Consultas Simplificadas:** Se eliminan la necesidad de JOINs complejos, simplificando el desarrollo.

---

## ⚙️ Instalación y Ejecución

Para poner en marcha el proyecto en tu entorno local, sigue los siguientes pasos:

#### Requisitos Previos

Asegúrate de tener instalado lo siguiente:

* **Node.js** y **npm** (o Yarn)
* **Java Development Development Kit (JDK) 11 o superior**
* **Maven**
* **MongoDB Community Server** (asegúrate de que el servicio de MongoDB esté corriendo en su puerto predeterminado o configurado).
* **Git**

#### Pasos Detallados

1.  **Clonar el Repositorio:**
    Abre tu terminal y clona el proyecto.
    ```bash
    git clone [https://github.com/CarloosG/estiloBGA2.git](https://github.com/CarloosG/estiloBGA2.git)
    cd estiloBGA2
    ```
    Si deseas trabajar en una rama específica (por ejemplo, `lemus`), puedes cambiarte a ella:
    ```bash
    git checkout lemus
    ```

2.  **Configurar y Ejecutar el Backend (Spring Boot):**
    Navega al directorio raíz del backend y compila/ejecuta la aplicación Spring Boot.
    ```bash
    cd src/main/java/com/mongodb/backestilobga/
    # Opcional: Construir el proyecto si es la primera vez o hay cambios en dependencias
    # mvn clean install
    # Ejecutar la aplicación
    mvn spring-boot:run
    ```
    El backend debería iniciarse, por defecto, en `http://localhost:8080`.

3.  **Configurar y Ejecutar el Frontend (React):**
    Abre una **nueva terminal**, navega al directorio del frontend e instala las dependencias, y luego inicia la aplicación React.
    ```bash
    cd frontend
    npm install # O yarn install
    npm start   # O yarn start
    ```
    El frontend debería iniciarse, por defecto, en `http://localhost:3000` y se abrirá automáticamente en tu navegador.

---

## 👥 Equipo de Desarrollo

Este proyecto fue desarrollado por los siguientes integrantes:

* **Carlos Andres Gomez Orduz**
* **Julián David Pérez Uribe**
* **Anderson Jahir Lemus Ramírez**
* **Juan Camilo Jaimes Avila**

---


## 📄 Licencia

Este proyecto se distribuye bajo la licencia [MIT License](https://opensource.org/licenses/MIT). Consulta el archivo `LICENSE` en el repositorio para más detalles.

---

## ✨ Agradecimientos

Agradecimiento especial al profesor de la asignatura **Entornos de Programación** por la orientación y el conocimiento brindado durante la asignatura.

---
