# 📚 TFG - 🐱 Gestor de Colonias Felinas 🐱

Aplicación web para la gestión eficiente de colonias felinas por asociaciones locales. Permite a los administradores asignar voluntarios, gestionar colonias y mejorar la atención a los animales.
---

## 🚀 Tecnologías utilizadas

- ⚛️ React + Vite + TypeScript
- 🐍 Django 5 + Django REST Framework
- 🐘 PostgreSQL
- 🐳 Docker + Docker Compose

---

## 📦 Estructura del proyecto

```
GESTOR-COLONIAS/
├── backend/             # Proyecto Django
│   ├── Dockerfile
│   └── ...
├── frontend/            # Proyecto React con Vite
│   ├── Dockerfile
│   └── ...
├── docs/                # Documentacion, diagramas, etc..
│   ├── diagrama_er_colonias_gatos.png
│   └── ...
│
├── docker-compose.yml   # Orquestación completa
│
├── .gitignore
│
└── README.md
```

---

## ⚙️ Requisitos previos

- Docker
- Docker Compose
- Node.js y npm (solo si vamos a desarrollar el frontend fuera de Docker)

---

## 🛠️ Instalación y uso

### 1. Clonar repositorio

```bash
git clone https://github.com/AnaJiRo/gestor-colonias.git
cd gestor-colonias
```

### 2. Levantar los contenedores

```bash
docker compose up --build
```

### 3. Acceder a la app

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Endpoint de prueba: [http://localhost:8000/ping/](http://localhost:8000/ping/)

---

## 💬 Comunicación Frontend ↔ Backend

React hace un `fetch` a `/ping/` y recibe respuesta desde Django:

```ts
useEffect(() => {
  fetch("http://localhost:8000/ping/")
    .then((res) => res.json())
    .then((data) => setMessage(data.message));
}, []);
```

---

## 📝 Todo lo que se ha hecho hasta ahora

- [x] Crear proyecto con Docker Compose
- [x] Backend Django + conexión PostgreSQL
- [x] Frontend Vite + React + TypeScript
- [x] Comunicación entre frontend y backend
- [x] CORS funcionando correctamente
- [x] Endpoint `/ping/` de prueba operativo
- [x] Diseñar modelo entidad-relación (ERD)

---

## 📌 Notas

> Si no puedes acceder al frontend desde Docker, asegúrate de que `--host` está definido en el `Dockerfile`:
>
> ```Dockerfile
> CMD ["npm", "run", "dev", "--", "--host"]
> ```

---

## 🐾 Próximos pasos

- [ ] Modelos y endpoints REST
- [ ] Autenticación con JWT
- [ ] UI para registrar colonias y gatos
- [ ] Panel de administración

---

## 📄 Licencia

MIT © 2025 — Ana Noir
