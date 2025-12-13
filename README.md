# AIESEC Ticketing System

A full-stack ticketing system built with Django REST Framework and React, featuring role-based access control, file uploads with Cloudinary, JWT authentication, and live chat integration.

## 🚀 Features

- **Role-Based Access Control**: Admin and User roles with different permissions
- **JWT Authentication**: Secure token-based authentication
- **Ticket Management**: Create, view, edit, delete tickets
- **File Uploads**: Image and PDF attachments stored in Cloudinary
- **Status Tracking**: Complete history of status changes
- **Search & Filter**: Search tickets by title, description, or username
- **Live Chat**: Integrated Tawk.to chat widget for real-time support

## 📁 Project Structure

```
ticket_management/
├── backend/             # Django REST API
│   ├── backend/         # Project settings
│   ├── tickets/         # Tickets app
│   ├── users/           # Authentication app
│   ├── manage.py        # Django management script
│   └── db.sqlite3       # SQLite database
│
├── frontend/            # React application
│   ├── public/          # Static files
│   └── src/             # React components
│
├── venv/               # Python virtual environment
└── README.md           # This file
```

## 🛠️ Technologies Used

### Backend

- **Django 6.0** - Web framework
- **Django REST Framework** - RESTful API
- **Django Simple JWT** - JWT authentication
- **Django CORS Headers** - CORS support
- **Django Filters** - Query filtering
- **Cloudinary** - Cloud file storage
- **SQLite** - Database

### Frontend

- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

### Integrations

- **Cloudinary** - File storage and delivery
- **Tawk.to** - Live chat support

## 📋 Prerequisites

- **Python 3.8+** installed
- **Node.js 14+** and npm installed
- **Git** installed
- **Cloudinary account** (free tier available)
- **Tawk.to account** (free tier available)

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ticket_management
```

### 2. Backend Setup

#### Step 1: Create Virtual Environment

```bash
# Windows
cd backend
python -m venv venv
venv\Scripts\activate

# macOS/Linux
cd backend
python3 -m venv venv
source venv/bin/activate
```

#### Step 2: Install Dependencies

```bash
pip install Django==6.0
pip install djangorestframework
pip install django-cors-headers
pip install django-filter
pip install djangorestframework-simplejwt
pip install cloudinary
pip install django-cloudinary-storage
pip install python-decouple
pip install Pillow
```

Or use requirements file (if available):

```bash
pip install -r requirements.txt
```

#### Step 3: Configure Environment Variables

Create a `.env` file in the `backend` folder:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

**Note**: Get Cloudinary credentials from https://cloudinary.com/users/register/free

#### Step 4: Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

#### Step 5: Create Superuser (Admin)

```bash
python manage.py createsuperuser
```

Follow the prompts:

- Username: `admin` (or your choice)
- Email: `admin@example.com`
- Password: `admin123` (or your choice)

#### Step 6: Run Backend Server

```bash
python manage.py runserver
```

Backend will run at: **http://127.0.0.1:8000/**

### 3. Frontend Setup

Open a **new terminal** window:

#### Step 1: Navigate to Frontend

```bash
cd frontend
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Run Frontend Server

```bash
npm start
```

Frontend will run at: **http://localhost:3000/**

The browser should automatically open. If not, navigate to http://localhost:3000

## 👤 User Accounts

### Admin Account

After creating superuser, login with:

- **Username**: `admin` (or what you created)
- **Password**: `admin123` (or what you created)
- **Permissions**: Can view all tickets, edit, delete, change status

### Regular User Account

Register a new account at: http://localhost:3000/register

- **Permissions**: Can create tickets and view only their own tickets

## 🧪 Testing the Application

### 1. Test Authentication

#### Register New User

1. Go to http://localhost:3000/register
2. Fill in username, email, password
3. Click "Register"
4. You'll be redirected to login page

#### Login

1. Go to http://localhost:3000/login
2. Enter credentials
3. Click "Login"
4. You'll be redirected to tickets list

### 2. Test Ticket Creation

1. Click "Create New Ticket" button
2. Fill in:
   - Title (e.g., "Website Login Issue")
   - Description (e.g., "Cannot login to my account")
   - Category (select from dropdown)
   - Attachment (optional - upload image or PDF)
3. Click "Create Ticket"
4. Ticket appears in the list

### 3. Test File Upload

1. Create a ticket with an image or PDF attachment
2. Click on the ticket to view details
3. Image should display inline
4. PDF should show preview with Google Docs Viewer
5. Click "Open in New Tab" to download

### 4. Test Admin Features

1. Login as admin (superuser)
2. You can see ALL tickets (not just yours)
3. Click on any ticket
4. Click status buttons: "New", "Under Review", "Resolved"
5. View status history showing who changed status and when
6. Click "Edit Ticket" to modify
7. Click back and use filters (Category, Status)

### 5. Test Search & Filter

1. Use search bar to search by title, description, or username
2. Use category dropdown to filter by category
3. Use status dropdown to filter by status
4. Pagination shows 6 tickets per page

### 6. Test Live Chat Integration

1. Look for Tawk.to chat widget in bottom-right corner
2. Click the chat icon
3. Send a test message
4. Chat should work on all pages

## 🔌 API Testing

### Using Browser (Django REST Framework Interface)

Navigate to these URLs in your browser:

1. **List/Create Tickets**: http://127.0.0.1:8000/api/tickets/
2. **Ticket Details**: http://127.0.0.1:8000/api/tickets/1/
3. **Login**: http://127.0.0.1:8000/api/auth/login/
4. **Register**: http://127.0.0.1:8000/api/auth/register/
5. **Current User**: http://127.0.0.1:8000/api/auth/me/

### Using Postman or cURL

#### 1. Login (Get JWT Token)

```bash
POST http://127.0.0.1:8000/api/auth/login/
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### 2. Get Current User

```bash
GET http://127.0.0.1:8000/api/auth/me/
Authorization: Bearer <access_token>

Response:
{
  "id": 1,
  "username": "admin",
  "email": "admin@example.com",
  "isAdmin": true
}
```

#### 3. List Tickets

```bash
GET http://127.0.0.1:8000/api/tickets/
Authorization: Bearer <access_token>

Response: Array of tickets
```

#### 4. Create Ticket

```bash
POST http://127.0.0.1:8000/api/tickets/
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

Body:
- title: "Test Ticket"
- description: "This is a test"
- category: "Technical"
- status: "New"
- attachment: <file> (optional)
```

#### 5. Update Status (Admin Only)

```bash
PATCH http://127.0.0.1:8000/api/tickets/1/status/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "status": "Under Review"
}
```

#### 6. Delete Ticket (Admin Only)

```bash
DELETE http://127.0.0.1:8000/api/tickets/1/
Authorization: Bearer <access_token>
```

### API Endpoints Summary

| Method | Endpoint                   | Description          | Auth | Admin Only |
| ------ | -------------------------- | -------------------- | ---- | ---------- |
| POST   | `/api/auth/register/`      | Register new user    | No   | No         |
| POST   | `/api/auth/login/`         | Login and get JWT    | No   | No         |
| POST   | `/api/auth/token/refresh/` | Refresh access token | No   | No         |
| GET    | `/api/auth/me/`            | Get current user     | Yes  | No         |
| GET    | `/api/tickets/`            | List tickets         | Yes  | No         |
| POST   | `/api/tickets/`            | Create ticket        | Yes  | No         |
| GET    | `/api/tickets/:id/`        | Get ticket details   | Yes  | No         |
| PUT    | `/api/tickets/:id/`        | Update ticket        | Yes  | Yes        |
| PATCH  | `/api/tickets/:id/`        | Partial update       | Yes  | Yes        |
| DELETE | `/api/tickets/:id/`        | Delete ticket        | Yes  | Yes        |
| PATCH  | `/api/tickets/:id/status/` | Update status        | Yes  | Yes        |

## 🎨 Design Template Source

The UI design was created using:

- **Custom CSS3** - All styles written from scratch
- **Color Palette**:
  - Primary: `#007bff` (Blue)
  - Success: `#28a745` (Green)
  - Warning: `#ffc107` (Yellow)
  - Danger: `#dc3545` (Red)
- **Design Inspiration**: Modern ticketing systems (Zendesk, Freshdesk)
- **Layout**: Responsive grid with flexbox and CSS Grid
- **Components**: Card-based design with status badges and category pills

### UI Components

- Login/Register forms with validation
- Ticket cards with hover effects
- Status badges (color-coded)
- Category pills
- Modal forms for create/edit
- Pagination controls
- Search and filter bars
- Attachment preview components
- Status history timeline

## 💬 Testing Chat Integration

### Tawk.to Live Chat

1. **Widget Visibility**: Chat icon appears in bottom-right corner on all pages
2. **Test Chat**:
   - Click the chat widget icon
   - Type a message: "Hello, testing chat"
   - Send the message
3. **Admin Panel**:
   - Login to Tawk.to dashboard at https://dashboard.tawk.to/
   - View incoming messages
   - Reply to test message
4. **Configuration**:
   - Property ID: `693d598f7bdcd2197d9811d9`
   - Widget ID: `1jcbqbm7n`
   - Located in: `frontend/public/index.html`

### Customize Chat (Optional)

1. Go to Tawk.to dashboard
2. Navigate to Administration > Chat Widget
3. Customize colors, position, greeting message
4. Changes apply automatically (no code changes needed)

## 🌐 Cloudinary Integration

### File Upload Flow

1. User selects image/PDF in ticket form
2. Frontend sends multipart/form-data to backend
3. Django processes upload via CloudinaryField
4. File uploaded to Cloudinary cloud storage
5. Cloudinary returns public URL
6. URL stored in database
7. Frontend displays file from Cloudinary URL

### Verify Cloudinary

1. Login to Cloudinary dashboard: https://cloudinary.com/console
2. Navigate to Media Library
3. Check "tickets" folder
4. Uploaded files appear here
5. Test URL in browser - should open/download file

## 📝 Environment Variables

Create `.env` file in `backend/` folder:

```env
# Django Settings
SECRET_KEY=your-django-secret-key-here
DEBUG=True

# Cloudinary Settings
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Never commit `.env` file to Git!** (Already in .gitignore)

## 🔒 Security Notes

### For Development

- `DEBUG=True` enabled
- `SECRET_KEY` in .env file
- SQLite database (not for production)
- CORS allows localhost:3000

### For Production

1. Set `DEBUG=False`
2. Generate new `SECRET_KEY`
3. Use PostgreSQL or MySQL
4. Update `CORS_ALLOWED_ORIGINS` with production domain
5. Use environment variables for all secrets
6. Enable HTTPS
7. Set up proper static file serving
8. Use production WSGI server (Gunicorn)

## 🐛 Troubleshooting

### Backend Issues

**Error: "No module named 'rest_framework'"**

```bash
pip install djangorestframework
```

**Error: "Module cloudinary not found"**

```bash
pip install cloudinary django-cloudinary-storage
```

**Error: "CORS policy blocked"**

- Check `CORS_ALLOWED_ORIGINS` in settings.py includes http://localhost:3000

**Error: "Secret key not set"**

- Create `.env` file with `SECRET_KEY=your-key`

### Frontend Issues

**Error: "Cannot connect to backend"**

- Ensure backend is running on port 8000
- Check `baseURL` in `src/api.js`

**Error: "401 Unauthorized"**

- Token expired - logout and login again
- Check if token is in localStorage

**Error: npm install fails**

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### File Upload Issues

**Images/PDFs not displaying**

- Check Cloudinary credentials in .env
- Verify file uploaded to Cloudinary dashboard
- Check browser console for CORS errors

## 📚 Additional Documentation

For detailed technical documentation, see:

- **PROJECT_DOCUMENTATION.md** - Complete system architecture
- **CLOUDINARY_SETUP.md** - Cloudinary integration guide

## 🎯 Project Requirements Checklist

- ✅ Django backend with REST API
- ✅ React frontend with modern UI
- ✅ JWT authentication
- ✅ Role-based permissions (Admin/User)
- ✅ Ticket CRUD operations
- ✅ File upload with Cloudinary
- ✅ Search and filter functionality
- ✅ Status tracking with history
- ✅ Live chat integration (Tawk.to)
- ✅ Responsive design
- ✅ Complete documentation

## 📧 Support

For issues or questions:

- Check troubleshooting section above
- Review PROJECT_DOCUMENTATION.md
- Use Tawk.to chat widget in the app
- Check Django logs in terminal
- Check browser console (F12) for frontend errors

## 📄 License

This project is for educational purposes (AIESEC Full-Stack Task).

## 👨‍💻 Author

**Your Name**

- GitHub: [Your GitHub Profile]
- Email: your.email@example.com

---

**Created**: December 2025  
**Last Updated**: December 13, 2025  
**Version**: 1.0.0
