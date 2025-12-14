# AIESEC Ticketing System

A full-stack ticketing system built with Django REST Framework and React Material Dashboard, featuring role-based access control, file uploads, JWT authentication, and live chat.

## 🎥 Demo

**Watch the demo video**: [Google Drive Demo](https://drive.google.com/drive/u/0/folders/1tuOAIXkEOslqKMVbTtcZQld2WdEi413u)

## 📋 Technologies

- **Backend**: Django 6.0, Django REST Framework, JWT Authentication
- **Frontend**: React 18, Material Dashboard React 2.2.0, Material-UI 5.12.3
- **Storage**: Cloudinary (file uploads)
- **Chat**: Tawk.to widget
- **Database**: SQLite

## 🚀 How to Run Backend

1. **Navigate to backend folder**

```bash
cd backend
```

2. **Install dependencies**

```bash
pip install Django djangorestframework django-cors-headers djangorestframework-simplejwt cloudinary pillow
```

3. **Run migrations**

```bash
python manage.py makemigrations
python manage.py migrate
```

4. **Start server**

```bash
python manage.py runserver
```

Backend runs at: **http://127.0.0.1:8000**

## 👤 How to Create Superuser

```bash
cd backend
python manage.py createsuperuser
```

Enter:

- Username: `admin`
- Email: `admin@example.com`
- Password: `yourpassword`

## 🎨 How to Run Frontend

1. **Navigate to frontend folder**

```bash
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm start
```

Frontend runs at: **http://localhost:3000**

## 🧪 How to Test APIs

### Method 1: Browser (Django REST Framework UI)

Visit these URLs in your browser:

- **Login**: http://127.0.0.1:8000/api/auth/login/
- **Register**: http://127.0.0.1:8000/api/auth/register/
- **List Tickets**: http://127.0.0.1:8000/api/tickets/
- **Ticket Detail**: http://127.0.0.1:8000/api/tickets/1/

### Method 2: Using cURL or Postman

**1. Login to get token:**

```bash
POST http://127.0.0.1:8000/api/auth/login/
Content-Type: application/json

{
  "username": "admin",
  "password": "yourpassword"
}

Response:
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**2. List tickets (use access token):**

```bash
GET http://127.0.0.1:8000/api/tickets/
Authorization: Bearer <access_token>
```

**3. Create ticket:**

```bash
POST http://127.0.0.1:8000/api/tickets/
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

Body:
- title: "Test Ticket"
- description: "Test description"
- category: "Technical"
- attachment: <file> (optional)
```

### API Endpoints

| Method | Endpoint                    | Description                |
| ------ | --------------------------- | -------------------------- |
| POST   | `/api/auth/register/`       | Register new user          |
| POST   | `/api/auth/login/`          | Login and get JWT token    |
| GET    | `/api/auth/me/`             | Get current user info      |
| GET    | `/api/tickets/`             | List all tickets           |
| POST   | `/api/tickets/`             | Create new ticket          |
| GET    | `/api/tickets/{id}/`        | Get ticket details         |
| PUT    | `/api/tickets/{id}/`        | Update ticket              |
| DELETE | `/api/tickets/{id}/`        | Delete ticket (admin only) |
| PATCH  | `/api/tickets/{id}/status/` | Update status (admin only) |

## 🎨 Design Template Source

**Template**: Material Dashboard React 2.2.0  
**Provider**: Creative Tim  
**License**: MIT License  
**URL**: https://www.creative-tim.com/product/material-dashboard-react

**Customizations:**

- Removed unused pages (Dashboard, Tables, Billing, etc.)
- Created custom ticket management layouts
- Integrated Django JWT authentication
- Added Cloudinary file uploads
- Implemented DataTable for ticket list
- Added TimelineItem for status history
- Custom background image for auth pages
- Cleaned navbar (only menu, username, logout)
- Simplified routes (/login, /register)

## 💬 How to Test Chat Integration

**Tawk.to Chat Widget:**

1. **Locate the widget**: Look for chat icon in bottom-right corner of any page
2. **Open chat**: Click the chat icon to expand
3. **Send message**: Type "Hello, testing chat" and send
4. **View in dashboard**: Login to https://dashboard.tawk.to/ to see messages

**Configuration:**

- Property ID: `693d598f7bdcd2197d9811d9`
- Widget ID: `1jcbqbm7n`
- Location: `frontend/public/index.html`

## 📝 Quick Test Guide

1. **Start both servers** (backend on 8000, frontend on 3000)
2. **Register**: Go to http://localhost:3000/register
3. **Login**: Use credentials at http://localhost:3000/login
4. **Create ticket**: Click "Create New Ticket"
5. **Upload file**: Add image or PDF attachment
6. **Admin login**: Login with superuser credentials
7. **Change status**: Click status buttons (New → Under Review → Resolved)
8. **View history**: See status timeline with timestamps
9. **Test chat**: Click chat widget in bottom-right

## 👥 User Roles

**Admin** (Superuser):

- View all tickets from all users
- Change ticket status
- Edit/delete any ticket

**Regular User**:

- View only their own tickets
- Create new tickets
- Edit their own tickets
- Cannot change status

## 🙏 Acknowledgments

- **Creative Tim** for Material Dashboard React template
- **Django** for backend framework
- **Cloudinary** for file storage
- **Tawk.to** for live chat widget

---

**Repository**: https://github.com/ghassenchahbani/aiesec-ticketing-system  
**Author**: Ghassen Chahbani  
**Email**: chahbani.ghassen@esprit.tn
