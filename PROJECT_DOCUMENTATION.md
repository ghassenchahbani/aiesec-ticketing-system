# AIESEC Ticketing System - Complete Documentation

## 📋 Project Overview
A full-stack ticketing system built with Django (backend) and React (frontend) featuring role-based access control, file uploads with Cloudinary, JWT authentication, and live chat integration.

---

## 🏗️ Project Structure

```
ticket_management/
├── backend/                    # Django REST API
│   ├── backend/               # Django project settings
│   │   ├── settings.py       # Main configuration
│   │   ├── urls.py           # Root URL routing
│   │   ├── wsgi.py           # WSGI server config
│   │   └── asgi.py           # ASGI server config
│   │
│   ├── tickets/              # Tickets app
│   │   ├── models.py         # Ticket & StatusHistory models
│   │   ├── serializers.py    # API serializers
│   │   ├── views.py          # API endpoints logic
│   │   ├── urls.py           # Tickets URL routing
│   │   ├── permissions.py    # Custom permissions
│   │   ├── admin.py          # Django admin config
│   │   └── migrations/       # Database migrations
│   │
│   ├── users/                # Authentication app
│   │   ├── models.py         # User model extensions
│   │   ├── serializers.py    # User serializers
│   │   ├── views.py          # Auth endpoints
│   │   └── urls.py           # Auth URL routing
│   │
│   ├── media/                # Local file storage (not used)
│   ├── db.sqlite3            # SQLite database
│   ├── manage.py             # Django management script
│   └── .env.example          # Environment variables template
│
├── frontend/                  # React application
│   ├── public/               
│   │   └── index.html        # HTML template (includes Tawk.to)
│   │
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Login.js      # Login form
│   │   │   ├── Register.js   # Registration form
│   │   │   ├── TicketList.js # Tickets list view
│   │   │   ├── TicketDetail.js  # Single ticket view
│   │   │   ├── TicketForm.js    # Create/Edit ticket
│   │   │   └── *.css         # Component styles
│   │   │
│   │   ├── App.js            # Main app component & routing
│   │   ├── AuthContext.js    # Authentication state management
│   │   ├── ProtectedRoute.js # Route guards
│   │   ├── api.js            # Axios instance with JWT
│   │   └── index.js          # React entry point
│   │
│   ├── package.json          # NPM dependencies
│   └── .gitignore            # Git ignore rules
│
├── venv/                     # Python virtual environment
├── .gitignore                # Root git ignore
└── CLOUDINARY_SETUP.md       # Cloudinary integration guide
```

---

## 🔧 Backend Architecture (Django)

### **Database Models**

#### **Ticket Model** (`backend/tickets/models.py`)
```python
- id: AutoField (Primary Key)
- title: CharField(max_length=200)
- description: TextField
- category: CharField (choices: Technical, Billing, General, Other)
- status: CharField (choices: New, Under Review, Resolved)
- attachment: CloudinaryField (images/PDFs stored in Cloudinary)
- created_by: ForeignKey(User) - ticket creator
- created_at: DateTimeField(auto_now_add=True)
```

#### **StatusHistory Model** (`backend/tickets/models.py`)
```python
- id: AutoField (Primary Key)
- ticket: ForeignKey(Ticket, related_name='status_history')
- status: CharField
- changed_by: ForeignKey(User)
- changed_at: DateTimeField(auto_now_add=True)
```
Tracks all status changes for each ticket with timestamp and user who made the change.

---

### **API Endpoints**

#### **Authentication Endpoints** (`/api/auth/`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register/` | Register new user | No |
| POST | `/api/auth/login/` | Login & get JWT tokens | No |
| POST | `/api/auth/token/refresh/` | Refresh access token | No |
| GET | `/api/auth/me/` | Get current user info | Yes |

**Login Request:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Register Request:**
```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "securepassword",
  "password2": "securepassword"
}
```

**Current User Response:**
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@example.com",
  "isAdmin": true
}
```

---

#### **Ticket Endpoints** (`/api/tickets/`)

| Method | Endpoint | Description | Admin | User |
|--------|----------|-------------|-------|------|
| GET | `/api/tickets/` | List tickets | All tickets | Own tickets only |
| POST | `/api/tickets/` | Create ticket | ✓ | ✓ |
| GET | `/api/tickets/:id/` | Get ticket details | ✓ | Own only |
| PUT | `/api/tickets/:id/` | Update ticket | ✓ | ✗ |
| PATCH | `/api/tickets/:id/` | Partial update | ✓ | ✗ |
| DELETE | `/api/tickets/:id/` | Delete ticket | ✓ | ✗ |
| PATCH | `/api/tickets/:id/status/` | Update status only | ✓ | ✗ |

**Query Parameters for List:**
- `?category=Technical` - Filter by category
- `?status=New` - Filter by status
- `?search=keyword` - Search in title/description

**Create Ticket Request:**
```json
{
  "title": "Login Issue",
  "description": "Cannot login to my account",
  "category": "Technical",
  "status": "New",
  "attachment": <File> (multipart/form-data)
}
```

**Ticket Response:**
```json
{
  "id": 1,
  "title": "Login Issue",
  "description": "Cannot login to my account",
  "category": "Technical",
  "status": "New",
  "attachment": "https://res.cloudinary.com/.../image.jpg",
  "created_by": {
    "id": 2,
    "username": "john",
    "email": "john@example.com"
  },
  "created_at": "2025-12-13T15:30:00Z",
  "status_history": [
    {
      "id": 1,
      "status": "New",
      "changed_by": {"id": 2, "username": "john", "email": "john@example.com"},
      "changed_at": "2025-12-13T15:30:00Z"
    }
  ]
}
```

**Update Status Request:**
```json
{
  "status": "Under Review"
}
```

---

### **Key Backend Files**

#### **settings.py** (`backend/backend/settings.py`)
- **INSTALLED_APPS**: Includes `rest_framework`, `rest_framework_simplejwt`, `django_filters`, `corsheaders`, `cloudinary`, `cloudinary_storage`
- **CORS_ALLOWED_ORIGINS**: `http://localhost:3000` (React dev server)
- **JWT Settings**: 
  - Access token lifetime: 60 minutes
  - Refresh token lifetime: 1 day
- **Cloudinary Configuration**:
  ```python
  CLOUDINARY_STORAGE = {
      'CLOUD_NAME': 'dxjn4oqwj',
      'API_KEY': '914711922687423',
      'API_SECRET': 'WEuVhEygKxdy6PcpS864BjzDePw'
  }
  DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
  ```

#### **views.py** (`backend/tickets/views.py`)
- **TicketViewSet**: ViewSet with custom queryset filtering
  - `get_queryset()`: Admins see all, users see only their tickets
  - `perform_create()`: Automatically assigns current user as creator
  - `update()` / `partial_update()`: Admin-only with status history tracking
  - `destroy()`: Admin-only deletion
  - `@action update_status()`: Custom endpoint for status changes at `/api/tickets/:id/status/`

#### **serializers.py** (`backend/tickets/serializers.py`)
- **TicketSerializer**: 
  - Custom `to_representation()` method converts CloudinaryField to proper URLs
  - Automatically fixes PDF URLs (changes `/image/upload/` to `/raw/upload/`)
  - Nested serializers for `created_by` and `status_history`

#### **permissions.py** (`backend/tickets/permissions.py`)
```python
class IsAdminOrOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Admins can do anything
        if request.user.is_staff:
            return True
        # Users can only view their own tickets
        return obj.created_by == request.user
```

---

## 🎨 Frontend Architecture (React)

### **Main Components**

#### **App.js** - Main Application & Routing
```javascript
Routes:
/ → TicketList (Protected)
/login → Login
/register → Register
/tickets/:id → TicketDetail (Protected)
/create → TicketForm (Protected)
/edit/:id → TicketForm (Protected, Admin Only)
```

#### **AuthContext.js** - Global Authentication State
```javascript
State:
- user: { username, email, isAdmin }
- token: JWT access token

Functions:
- login(username, password)
- logout()
- register(userData)
```

#### **api.js** - Axios Configuration
```javascript
- Base URL: http://localhost:8000/api
- Request Interceptor: Adds "Authorization: Bearer <token>"
- Response Interceptor: Handles 401 errors (logout on token expiration)
```

#### **ProtectedRoute.js** - Route Guard
- Redirects to `/login` if not authenticated
- Optionally requires admin role

---

### **Page Components**

#### **Login.js** (`/login`)
- Username/password form
- Calls `/api/auth/login/`
- Stores JWT tokens in localStorage
- Redirects to home on success

#### **Register.js** (`/register`)
- Registration form (username, email, password, confirm password)
- Calls `/api/auth/register/`
- Auto-redirects to login

#### **TicketList.js** (`/`)
**Features:**
- Displays all tickets in card grid (6 per page)
- Search bar (searches title, description, username)
- Filter dropdowns (category, status)
- Pagination controls
- Role-based UI:
  - Admin: Sees all tickets, "Create Ticket" button
  - User: Sees own tickets only, "Create Ticket" button

**State:**
```javascript
- tickets: Array of ticket objects
- filteredTickets: Filtered results
- currentPage: Current page number
- searchQuery: Search input
- selectedCategory: Filter value
- selectedStatus: Filter value
```

#### **TicketDetail.js** (`/tickets/:id`)
**Features:**
- Full ticket information
- Attachment preview:
  - Images: Display inline with full-size link
  - PDFs: Google Docs Viewer iframe + direct link
  - Other files: Download link
- Status history timeline
- Admin-only features:
  - Status update buttons (New, Under Review, Resolved)
  - Edit ticket button

**Status Update:**
- Calls `PATCH /api/tickets/:id/status/`
- Updates UI with new status and history
- Shows success alert

#### **TicketForm.js** (`/create` or `/edit/:id`)
**Features:**
- Create new ticket or edit existing (admin only)
- Form fields:
  - Title (required)
  - Description (textarea, required)
  - Category (dropdown, required)
  - Status (dropdown, admin only)
  - Attachment (file input, optional)
- File upload with multipart/form-data
- Form validation

---

## 🔐 Authentication Flow

### **1. User Registration**
```
Frontend → POST /api/auth/register/
        ← 201 Created
Frontend redirects to /login
```

### **2. User Login**
```
Frontend → POST /api/auth/login/ {username, password}
        ← {access: "JWT_TOKEN", refresh: "REFRESH_TOKEN"}
Frontend stores tokens in localStorage
Frontend → GET /api/auth/me/ (with Bearer token)
        ← {id, username, email, isAdmin}
Context updates user state
```

### **3. Authenticated Requests**
```
All API calls include:
Headers: {
  "Authorization": "Bearer <access_token>"
}
```

### **4. Token Refresh (Automatic)**
```
If 401 Unauthorized:
  Frontend → POST /api/auth/token/refresh/ {refresh}
          ← {access: "NEW_JWT_TOKEN"}
  Retry original request with new token
```

### **5. Logout**
```
Frontend clears localStorage
Context resets user state
Redirect to /login
```

---

## ☁️ Cloudinary Integration

### **Purpose**
Store and serve ticket attachments (images, PDFs, files) in the cloud instead of local server storage.

### **Configuration** (`backend/settings.py`)
```python
INSTALLED_APPS = [
    'cloudinary_storage',
    'cloudinary',
    ...
]

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'dxjn4oqwj',
    'API_KEY': '914711922687423',
    'API_SECRET': 'WEuVhEygKxdy6PcpS864BjzDePw'
}

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
```

### **How It Works**
1. User uploads file via TicketForm
2. Django receives file and saves to CloudinaryField
3. Cloudinary uploads to cloud storage → folder: `tickets/`
4. Cloudinary returns public_id (e.g., `tickets/abc123.jpg`)
5. Serializer converts to full URL:
   - Images: `https://res.cloudinary.com/dxjn4oqwj/image/upload/v123/tickets/abc123.jpg`
   - PDFs: `https://res.cloudinary.com/dxjn4oqwj/raw/upload/v123/tickets/abc123.pdf`
6. Frontend displays using URL

### **URL Format Fix**
The serializer automatically converts PDF URLs from `/image/upload/` to `/raw/upload/` because Cloudinary serves PDFs differently than images.

---

## 💬 Tawk.to Live Chat Integration

### **Location**: `frontend/public/index.html`

### **Configuration**
```html
<script>
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;
  s1.src='https://embed.tawk.to/693d598f7bdcd2197d9811d9/1jcbqbm7n';
  s1.charset='UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
})();
</script>
```

### **Details**
- **Property ID**: `693d598f7bdcd2197d9811d9`
- **Widget ID**: `1jcbqbm7n`
- Appears as floating chat widget on all pages
- Users can get real-time support

---

## 🎯 Role-Based Access Control

### **User Roles**

#### **Regular User** (`is_staff = False`)
**Can:**
- Create tickets
- View own tickets only
- See ticket details for own tickets
- Upload attachments

**Cannot:**
- View other users' tickets
- Edit any tickets
- Delete tickets
- Change ticket status

#### **Admin User** (`is_staff = True`)
**Can:**
- Create tickets
- View ALL tickets
- Edit any ticket
- Delete any ticket
- Change ticket status
- View status history

---

## 🚀 Running the Application

### **Backend (Django)**
```bash
cd backend
python manage.py runserver
# Runs on http://127.0.0.1:8000
```

### **Frontend (React)**
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

### **Create Admin User**
```bash
cd backend
python manage.py createsuperuser
# Follow prompts
```

---

## 📦 Dependencies

### **Backend (Python)**
```
Django==6.0
djangorestframework
django-cors-headers
django-filter
djangorestframework-simplejwt
cloudinary
django-cloudinary-storage
python-decouple
Pillow
```

### **Frontend (JavaScript)**
```json
{
  "axios": "^1.13.2",
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "react-router-dom": "^7.10.1",
  "react-scripts": "5.0.1"
}
```

---

## 🔄 Data Flow Examples

### **Creating a Ticket**
```
1. User fills form in TicketForm.js
2. Frontend: POST /api/tickets/ (multipart/form-data)
3. Backend: TicketViewSet.perform_create()
   - Assigns created_by = request.user
   - Saves ticket with attachment to Cloudinary
   - Creates initial StatusHistory entry
4. Backend returns ticket data with attachment URL
5. Frontend redirects to ticket detail page
```

### **Updating Status (Admin)**
```
1. Admin clicks "Under Review" button in TicketDetail.js
2. Frontend: PATCH /api/tickets/:id/status/ {"status": "Under Review"}
3. Backend: TicketViewSet.update_status()
   - Checks if user is admin (is_staff=True)
   - Updates ticket.status
   - Creates StatusHistory entry
   - Returns updated ticket with full status_history
4. Frontend updates UI with new status and history
5. Shows success alert
```

### **Filtering Tickets**
```
1. User selects "Technical" category in TicketList.js
2. Frontend: GET /api/tickets/?category=Technical
3. Backend: TicketViewSet applies DjangoFilterBackend
4. Returns filtered queryset (admin sees all, user sees own)
5. Frontend displays filtered results
```

---

## 🛡️ Security Features

1. **JWT Authentication**: Stateless, secure token-based auth
2. **CORS Protection**: Only allows requests from localhost:3000
3. **Permission Classes**: `IsAuthenticated` + `IsAdminOrOwner`
4. **Password Hashing**: Django's built-in PBKDF2 algorithm
5. **CSRF Protection**: Disabled for API (using JWT instead)
6. **SQL Injection Protection**: Django ORM parameterized queries
7. **File Upload Validation**: Cloudinary handles file type checking
8. **Environment Variables**: Sensitive data in .env file (not committed)

---

## 📊 Database Schema

```
┌─────────────────┐         ┌──────────────────┐
│     User        │         │     Ticket       │
├─────────────────┤         ├──────────────────┤
│ id (PK)         │◄───────┤ created_by (FK)  │
│ username        │         │ id (PK)          │
│ email           │         │ title            │
│ password        │         │ description      │
│ is_staff        │         │ category         │
└─────────────────┘         │ status           │
                            │ attachment       │
                            │ created_at       │
                            └──────────────────┘
                                    △
                                    │
                            ┌───────┴──────────┐
                            │ StatusHistory    │
                            ├──────────────────┤
                            │ id (PK)          │
                            │ ticket (FK)      │
                            │ status           │
                            │ changed_by (FK)  │
                            │ changed_at       │
                            └──────────────────┘
```

---

## 🎨 UI/UX Features

1. **Responsive Design**: Works on mobile, tablet, desktop
2. **Card-Based Layout**: Modern ticket cards with status badges
3. **Color-Coded Status**:
   - 🟢 New (green)
   - 🟡 Under Review (yellow)
   - 🔵 Resolved (blue)
4. **Category Badges**: Visual distinction for ticket types
5. **Pagination**: 6 tickets per page
6. **Search Highlighting**: Real-time search filtering
7. **Loading States**: Spinners during API calls
8. **Error Handling**: User-friendly error messages
9. **Inline Image Preview**: Images display directly in ticket details
10. **PDF Viewer**: Google Docs Viewer for PDF preview

---

## 🔍 Search & Filtering

### **Search** (Searches in):
- Ticket title
- Ticket description
- Creator username (via `created_by__username`)

### **Filters**:
- **Category**: Technical, Billing, General, Other
- **Status**: New, Under Review, Resolved

### **Backend Implementation**:
```python
search_fields = ['title', 'description', 'created_by__username']
filterset_fields = ['category', 'status']
```

---

## 📝 Important Notes

1. **Trailing Slashes**: All Django URLs must end with `/` (APPEND_SLASH=True)
2. **Token Expiration**: Access tokens expire after 60 minutes
3. **File Size Limits**: Cloudinary free tier has 10GB storage, 25 credits/month
4. **SQLite Limitations**: Not suitable for production (use PostgreSQL)
5. **CORS**: Must update `CORS_ALLOWED_ORIGINS` for production domain
6. **DEBUG Mode**: Set `DEBUG=False` in production
7. **Secret Key**: Change `SECRET_KEY` in production
8. **Static Files**: Run `python manage.py collectstatic` for production

---

## 🐛 Common Issues & Solutions

### **Issue**: "401 Unauthorized" errors
**Solution**: Token expired, logout and login again

### **Issue**: Images not displaying
**Solution**: Check Cloudinary access control settings (must be "Public")

### **Issue**: "CORS error"
**Solution**: Verify frontend URL in `CORS_ALLOWED_ORIGINS`

### **Issue**: "URL must end with /"
**Solution**: Add trailing slash to API endpoint calls

### **Issue**: File upload fails
**Solution**: Check Cloudinary credentials in settings.py

---

## 🎯 Future Enhancements (Optional)

1. Email notifications for status changes
2. Real-time updates with WebSockets
3. Ticket assignment to specific admins
4. Priority levels (Low, Medium, High, Critical)
5. Comments/replies on tickets
6. Export tickets to CSV/PDF
7. Advanced analytics dashboard
8. Multi-language support
9. Dark mode toggle
10. File type restrictions

---

## 📞 Support

For issues or questions:
- Check Django terminal logs for backend errors
- Check browser console (F12) for frontend errors
- Review this documentation
- Use Tawk.to chat widget for live support

---

**Project Status**: ✅ Fully Functional
**Last Updated**: December 13, 2025
