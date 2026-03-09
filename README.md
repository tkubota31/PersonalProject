# Volleyball Tournament Registration Website

A fullstack web application for posting volleyball tournaments and allowing users to sign in and register for tournaments.

## Features

- User Authentication (Registration & Login)
- Tournament Management (Create, List, View Details)
- Tournament Registration
- Team Registration Management
- JWT-based Authentication
- Protected Routes

## Tech Stack

### Backend

- **Framework**: Django 4.x with Django REST Framework
- **Database**: Django ORM (SQLite by default, can switch to PostgreSQL)
- **Authentication**: Django's built-in auth (extendable) and DRF token/session auth
- **Password Hashing**: Django's default password hasher
- **Server**: Run via `manage.py runserver` or WSGI/ASGI server

### Frontend

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS-in-JS

## Project Structure

```
PersonalProject/
├── backend/                     # Django project root
│   ├── manage.py                # Django CLI entry point
│   ├── config/                  # Django project configuration (formerly 'backend')
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── tournaments/             # Django app for tournament logic
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── tests.py
│   ├── db.sqlite3               # SQLite database (development)
│   └── requirements.txt         # Python dependencies (if present)
└── frontend/
    ├── src/
    │   ├── main.tsx             # React entry point
    │   ├── App.tsx              # Main app with routing
    │   ├── api/
    │   │   └── client.ts        # API client with axios
    │   ├── context/
    │   │   └── AuthContext.tsx  # Auth context (for future use)
    │   └── pages/
    │       ├── LoginPage.tsx
    │       ├── RegisterPage.tsx
    │       ├── TournamentsPage.tsx
    │       └── TournamentDetailPage.tsx
    ├── vite.config.ts
    ├── tsconfig.json
    ├── package.json
    └── .env                    # Environment variables
```

## Setup Instructions

### Backend Setup

1. **Create Python Virtual Environment**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install Dependencies**

```bash
pip install django djangorestframework django-cors-headers
# or install from requirements.txt if available
```

3. **Apply Migrations**

```bash
python manage.py migrate
```

4. **Run the Backend Server**

```bash
python manage.py runserver
```

The backend will run on `http://localhost:8000`. API endpoints are under `/api/` and use standard Django routing.

(Optional) You can create a superuser to access the admin panel:

```bash
python manage.py createsuperuser
```

The admin interface will be available at `http://localhost:8000/admin/`.

### Frontend Setup

1. **Install Dependencies**

```bash
cd frontend
npm install
```

2. **Configure Environment**
   The `.env` file is already set up to use `http://localhost:8000` as the API URL.

3. **Run the Development Server**

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Tournaments

- `GET /api/tournaments/` - List open tournaments
- `GET /api/tournaments/{id}` - Retrieve tournament details
- `POST /api/tournaments/` - Create a new tournament (optional auth)
- `PUT /api/tournaments/{id}` - Update tournament (optional auth)
- `DELETE /api/tournaments/{id}` - Delete tournament (optional auth)

### Registrations

- `POST /api/registrations/` - Register a team for a tournament (optional auth)
- `GET /api/tournaments/{id}/registrations/` - List confirmed registrations for a tournament

## Database Models

### User

- id (primary key)
- email (unique)
- username (unique)
- hashed_password
- full_name
- created_at

### Tournament

- id (primary key)
- name
- description
- location
- start_date
- end_date
- max_teams
- registration_deadline
- fee
- created_at
- created_by (foreign key to User)

### Registration

- id (primary key)
- user_id (foreign key)
- tournament_id (foreign key)
- team_name
- status (pending, confirmed, cancelled)
- registered_at

## Authentication Flow

1. User registers with email, username, and password
2. Password is hashed using bcrypt
3. User logs in with email and password
4. Backend returns JWT token
5. Frontend stores token in localStorage
6. Token is sent in Authorization header for protected requests

## Development Notes

- Backend uses SQLite by default. To use PostgreSQL, update the `DATABASE_URL` in `.env`
- Frontend auto-redirects unauthenticated users to login page
- Token expires after 30 minutes (configurable in `.env`)
- All user passwords are hashed - never stored in plain text

## Future Enhancements

- Admin dashboard for tournament management
- Email notifications for registrations
- Payment integration for tournament fees
- Tournament search and filtering
- User profiles with team history
- Real-time notifications
- Mobile app version

## Troubleshooting

### Backend won't start

- Ensure Python 3.8+ is installed
- Check that virtual environment is activated
- Verify all dependencies are installed: `pip install -r requirements.txt`

### Frontend won't connect to backend

- Verify backend is running on port 8000
- Check CORS settings in `backend/main.py`
- Ensure `.env` has correct API URL: `VITE_API_URL=http://localhost:8000`

### Database errors

- Delete `test.db` to reset database
- Ensure database.py has correct DATABASE_URL

## License

MIT
