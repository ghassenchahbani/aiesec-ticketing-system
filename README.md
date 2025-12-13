# AIESEC Ticketing System

A modern full-stack ticketing system built with Django REST Framework and React Material Dashboard, featuring role-based access control, file uploads with Cloudinary, JWT authentication, and live chat integration.

## 🚀 Features

- **Role-Based Access Control**: Admin and User roles with different permissions
- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **Ticket Management**: Full CRUD operations for tickets
- **File Uploads**: Image and PDF attachments stored in Cloudinary
- **Status Tracking**: Complete timeline history of status changes with OrdersOverview component
- **Search & Filter**: Search tickets by title/description and filter by category/status
- **Live Chat**: Integrated Tawk.to chat widget for real-time support
- **Material Dashboard UI**: Professional React Material Dashboard template integration
- **Responsive Design**: Mobile-friendly interface

## 📁 Project Structure

```
ticket_management/
├── backend/                    # Django REST API
│   ├── backend/                # Project settings
│   │   ├── settings.py         # Django configuration
│   │   ├── urls.py             # URL routing
│   │   └── wsgi.py             # WSGI configuration
│   ├── tickets/                # Tickets app
│   │   ├── models.py           # Ticket model
│   │   ├── serializers.py      # DRF serializers
│   │   ├── views.py            # API views
│   │   └── urls.py             # Ticket URLs
│   ├── users/                  # Authentication app
│   │   ├── models.py           # User model
│   │   ├── serializers.py      # Auth serializers
│   │   ├── views.py            # Auth views
│   │   └── urls.py             # Auth URLs
│   ├── manage.py               # Django management script
│   └── db.sqlite3              # SQLite database
│
├── frontend/                   # React Material Dashboard
│   ├── public/                 # Static files
│   │   └── index.html          # HTML template
│   └── src/                    # React components
│       ├── layouts/            # Page layouts
│       │   ├── tickets/        # Ticket list (DataTable)
│       │   ├── ticket-detail/  # Ticket detail view
│       │   ├── ticket-form/    # Create/Edit form
│       │   └── authentication/ # Login/Register pages
│       ├── components/         # Reusable components
│       ├── examples/           # Material Dashboard components
│       ├── assets/             # Images, themes
│       ├── AuthContext.js      # Authentication context
│       ├── api.js              # Axios configuration
│       ├── ProtectedRoute.js   # Route protection
│       └── routes.js           # Route definitions
│
├── venv/                       # Python virtual environment
└── README.md                   # Documentation
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
- **Material Dashboard React 2.2.0** - Admin template
- **Material-UI (MUI) 5.12.3** - Component library
- **React Router DOM 6.11.0** - Client-side routing
- **Axios 1.13.2** - HTTP client
- **Tawk.to** - Live chat widget
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
git clone https://github.com/ghassenchahbani/aiesec-ticketing-system.git
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

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://127.0.0.1:8000/api/
- **Admin Panel**: http://127.0.0.1:8000/admin/
- **Login Page**: http://localhost:3000/login
- **Register Page**: http://localhost:3000/register

## 👤 User Accounts & Roles

### Admin Account (Full Access)

After creating superuser:

- **Username**: `admin` (or what you created)
- **Password**: Your chosen password
- **Permissions**:
  - View all tickets from all users
  - Create, edit, and delete any ticket
  - Change ticket status (New → Under Review → Resolved)
  - View complete status history timeline
  - Access to all admin features

### Regular User Account (Limited Access)

Register at: http://localhost:3000/register

- **Permissions**:
  - Create new tickets
  - View only their own tickets
  - Edit their own tickets
  - Cannot change ticket status
  - Cannot delete tickets
  - Cannot access other users' tickets

## 📱 Key Features & Pages

### 1. Authentication Pages

**Login Page** (`/login`)

- Clean login form with custom support background
- Username and password fields
- JWT token-based authentication
- Link to registration page
- No navbar or footer for clean design

**Register Page** (`/register`)

- User registration form
- Username, email, password fields
- Password confirmation
- Automatic redirect to login after successful registration

### 2. Tickets List Page (`/tickets`)

**Features:**

- DataTable with sortable columns
- Search functionality (title, description, username)
- Filter by Category (Technical, Financial, Product)
- Filter by Status (New, Under Review, Resolved)
- Pagination with entries per page control
- Color-coded status badges
- Action buttons (View, Edit, Delete) for admins
- "Create New Ticket" button

**Columns:**

- ID
- Title (with description preview)
- Category badge
- Status badge (color-coded)
- Created By
- Created Date
- Actions

### 3. Ticket Detail Page (`/tickets/:id`)

**Layout:**

- Two-column responsive layout
- Left: Main ticket information card
- Right: Ticket information sidebar

**Main Card:**

- Ticket title and ID
- Status badge
- Full description
- Attachment display (image preview or PDF button)

**Sidebar:**

- Category badge
- Created by (with icon)
- Created at (with icon)
- Admin status update buttons (if admin)

**Status History Timeline:**

- Uses Material Dashboard OrdersOverview template
- Visual timeline with color-coded icons
- Status name, timestamp, and user who changed it
- Chronological display with connecting lines

### 4. Create/Edit Ticket Form

**Fields:**

- Title (required)
- Description (textarea, required)
- Category dropdown (Technical, Financial, Product)
- Status dropdown (admin only when editing)
- File attachment (images or PDFs)
- File preview for existing attachments

**Features:**

- Multipart form data for file uploads
- Client-side validation
- Success/error notifications
- Automatic redirect after save

### 5. Navbar Features

**Components:**

- Menu toggle for sidebar
- Username display
- Logout button
- Breadcrumb navigation
- Responsive design

### 6. Sidebar Navigation

**Menu Items:**

- Tickets (only visible link)
- Collapsible on mobile
- Clean design without unnecessary links

## 🧪 Testing the Application

### 1. Authentication Testing

**Register New User:**

1. Go to http://localhost:3000/register
2. Enter: username, email, password, confirm password
3. Click "Sign Up"
4. Should redirect to login page
5. Login with new credentials

**Login:**

1. Go to http://localhost:3000/login
2. Enter credentials
3. Click "Sign In"
4. Should redirect to `/tickets`

**Logout:**

1. Click logout icon in navbar
2. Should redirect to login page
3. Try accessing `/tickets` - should redirect to login

### 2. Ticket Management Testing

**Create Ticket:**

1. Click "Create New Ticket"
2. Fill all required fields
3. Optionally upload image or PDF
4. Click "Create"
5. Should see success message and redirect to list

**View Ticket:**

1. Click "View" icon on any ticket
2. Should show full details
3. Image should display (max 300px height)
4. PDF should show "View PDF" button
5. Status history timeline should appear

**Edit Ticket (Admin):**

1. Login as admin
2. Click "Edit" icon on ticket
3. Modify any field
4. Click "Save"
5. Changes should persist

**Delete Ticket (Admin):**

1. Login as admin
2. Click "Delete" icon
3. Confirm deletion
4. Ticket should disappear from list

**Status Change (Admin):**

1. Login as admin
2. View any ticket
3. Click status buttons: New → Under Review → Resolved
4. Each click adds entry to status history
5. Timeline updates with timestamp and username

### 3. Search & Filter Testing

**Search:**

1. Type in search box (e.g., "login")
2. Table filters in real-time
3. Searches title, description, and username

**Category Filter:**

1. Select category from dropdown
2. Table shows only tickets in that category
3. Select "All Categories" to clear

**Status Filter:**

1. Select status from dropdown
2. Table shows only tickets with that status
3. Select "All Statuses" to clear

**Combined Filters:**

1. Use search + category + status together
2. All filters work simultaneously

### 4. File Upload Testing

**Image Upload:**

1. Create ticket with JPG/PNG image
2. Image uploads to Cloudinary
3. View ticket to see image preview
4. Image constrained to 300px max height

**PDF Upload:**

1. Create ticket with PDF file
2. PDF uploads to Cloudinary
3. View ticket to see "View PDF" button
4. Click button opens PDF in new tab

**File Size:**

1. Try uploading large file (>10MB)
2. Should show error or processing message

### 5. Live Chat Testing

1. Look for Tawk.to widget (bottom-right)
2. Click chat icon
3. Widget expands
4. Type message and send
5. Widget persists across page navigation

## 🔌 API Documentation

### Authentication Endpoints

#### Register

```http
POST /api/auth/register/
Content-Type: application/json

{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123"
}

Response 201:
{
  "id": 2,
  "username": "newuser",
  "email": "user@example.com"
}
```

#### Login

```http
POST /api/auth/login/
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response 200:
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "isAdmin": true
  }
}
```

#### Get Current User

```http
GET /api/auth/me/
Authorization: Bearer <access_token>

Response 200:
{
  "id": 1,
  "username": "admin",
  "email": "admin@example.com",
  "isAdmin": true
}
```

### Ticket Endpoints

#### List Tickets

```http
GET /api/tickets/
Authorization: Bearer <access_token>

Query Parameters:
- search: Search in title, description, username
- category: Filter by category
- status: Filter by status

Response 200: Array of tickets
```

#### Create Ticket

```http
POST /api/tickets/
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

Body:
- title: string (required)
- description: string (required)
- category: string (required: Technical|Financial|Product)
- attachment: file (optional: image or PDF)

Response 201: Created ticket object
```

#### Get Ticket Detail

```http
GET /api/tickets/{id}/
Authorization: Bearer <access_token>

Response 200:
{
  "id": 1,
  "title": "Login Issue",
  "description": "Cannot login",
  "category": "Technical",
  "status": "New",
  "attachment": "https://cloudinary.com/...",
  "created_by": {
    "id": 2,
    "username": "user1"
  },
  "created_at": "2025-12-13T10:00:00Z",
  "status_history": [
    {
      "status": "New",
      "changed_at": "2025-12-13T10:00:00Z",
      "changed_by": {
        "id": 2,
        "username": "user1"
      }
    }
  ]
}
```

#### Update Ticket Status (Admin Only)

```http
PATCH /api/tickets/{id}/status/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "status": "Under Review"
}

Response 200: Updated ticket with new status history entry
```

#### Delete Ticket (Admin Only)

```http
DELETE /api/tickets/{id}/
Authorization: Bearer <access_token>

Response 204: No Content
```

### API Endpoints Summary

| Method | Endpoint                    | Description       | Auth Required | Admin Only |
| ------ | --------------------------- | ----------------- | ------------- | ---------- |
| POST   | `/api/auth/register/`       | Register new user | No            | No         |
| POST   | `/api/auth/login/`          | Login             | No            | No         |
| POST   | `/api/auth/token/refresh/`  | Refresh token     | No            | No         |
| GET    | `/api/auth/me/`             | Current user info | Yes           | No         |
| GET    | `/api/tickets/`             | List tickets      | Yes           | No         |
| POST   | `/api/tickets/`             | Create ticket     | Yes           | No         |
| GET    | `/api/tickets/{id}/`        | Ticket details    | Yes           | No         |
| PUT    | `/api/tickets/{id}/`        | Update ticket     | Yes           | Yes        |
| DELETE | `/api/tickets/{id}/`        | Delete ticket     | Yes           | Yes        |
| PATCH  | `/api/tickets/{id}/status/` | Update status     | Yes           | Yes        |

## 🎨 UI Customizations

### Material Dashboard Template

**Base Template**: Material Dashboard React 2.2.0 by Creative Tim

- Source: https://www.creative-tim.com/product/material-dashboard-react

**Customizations Made:**

1. **Removed unnecessary pages**:

   - Dashboard, Tables, Billing, Notifications, Profile, RTL

2. **Updated routes**:

   - `/login` (was `/authentication/sign-in`)
   - `/register` (was `/authentication/sign-up`)
   - Only "Tickets" visible in sidebar

3. **Modified navbar**:

   - Removed search bar, account, settings, notifications icons
   - Added username display
   - Kept only menu toggle and logout button

4. **Modified sidebar**:

   - Removed "Upgrade to Pro" button
   - Removed all template links except Tickets

5. **Authentication pages**:

   - Removed navbar and footer
   - Custom support background image
   - Clean, centered login/register forms

6. **Ticket list**:

   - Replaced card grid with DataTable component
   - Added search and filter controls
   - Custom status badges with colors

7. **Ticket detail**:

   - Two-column responsive layout
   - Sidebar with ticket info
   - Status history with timeline component
   - Image size constraints (300px max height)

8. **Form improvements**:

   - Fixed dropdown styling (45px height)
   - Proper border colors and hover states
   - File upload with preview

9. **Footer removal**:
   - Removed from all ticket pages
   - Kept only on unused template pages

## 🎨 Design Template Source

### Template Selection

**Chosen Template: Material Dashboard React**

- **Provider**: Creative Tim
- **License**: MIT License
- **URL**: https://www.creative-tim.com/product/material-dashboard-react
- **Version**: 2.2.0
- **UI Framework**: Material-UI (MUI) 5.x
- **Features Used**:
  - DashboardLayout with sidebar
  - DataTable component for ticket list
  - TimelineItem for status history (OrdersOverview template)
  - MDBox, MDTypography, MDButton, MDBadge components
  - Breadcrumbs navigation
  - Responsive grid system

**Why Material Dashboard:**

- Professional admin interface
- Rich component library
- Good documentation
- Active maintenance
- React-based with modern hooks
- Material Design principles
- Responsive out of the box
  - Popular Bootstrap admin template
- **CoreUI React** - https://coreui.io/react/
  - Clean, responsive design

**Final Implementation:**
After evaluating templates, I implemented a **custom design** inspired by Material Design principles and modern ticketing platforms for better learning experience and code control.

## 🚀 Deployment

### Production Build

**Backend (Django):**

```bash
cd backend

# Collect static files
python manage.py collectstatic --noinput

# Set production settings
# Update backend/settings.py:
# DEBUG = False
# ALLOWED_HOSTS = ['yourdomain.com']

# Use production server (e.g., Gunicorn)
pip install gunicorn
gunicorn backend.wsgi:application --bind 0.0.0.0:8000
```

**Frontend (React):**

```bash
cd frontend

# Build for production
npm run build

# Serve build folder with static server or configure nginx
# The build folder contains optimized production files
```

### Environment Variables

Create `.env` file in backend folder:

```
SECRET_KEY=your-secret-key-here
DEBUG=False
DATABASE_URL=your-database-url
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Deployment Options

1. **Heroku**: Easy Django + React deployment
2. **Vercel**: Great for React frontend
3. **DigitalOcean**: Full-stack deployment
4. **AWS**: Scalable cloud deployment
5. **Railway**: Simple full-stack hosting

## 🛠️ Troubleshooting

### Backend Issues

**Issue**: "ModuleNotFoundError: No module named 'rest_framework'"

```bash
pip install djangorestframework djangorestframework-simplejwt django-cors-headers cloudinary pillow
```

**Issue**: Database migrations fail

```bash
# Delete db.sqlite3 and migrations
rm db.sqlite3
rm tickets/migrations/00*.py
rm users/migrations/00*.py

# Recreate migrations
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

**Issue**: CORS errors

- Check `CORS_ALLOWED_ORIGINS` in [backend/settings.py](backend/settings.py)
- Should include `http://localhost:3000`

**Issue**: Images not uploading

- Verify Cloudinary credentials in [backend/settings.py](backend/settings.py)
- Check `CLOUDINARY_STORAGE` settings

### Frontend Issues

**Issue**: "Module not found" errors

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Port 3000 already in use

```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
PORT=3001 npm start
```

**Issue**: Login not working

- Check API URL in axios config
- Verify backend is running on port 8000
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`

**Issue**: Dropdowns not styled correctly

- The Select components have custom styling in `sx` prop
- Check browser console for MUI warnings
- Verify Material-UI version: 5.12.3

**Issue**: Images not displaying

- Check Cloudinary URL is valid
- Verify image constraints: `maxHeight: 300px`
- Check browser Network tab for 404 errors

**Issue**: PDF not opening

- Verify button has `component="a"` prop
- Check Cloudinary PDF URL
- Try opening URL directly in browser

### Common Errors

**"Invalid token" error:**

- Token expired (15 min lifetime)
- Logout and login again
- Or implement token refresh logic

**"Permission denied" error:**

- Regular users can only see their own tickets
- Admin access required for status changes
- Check `isAdmin` field in user object

**Status history not showing:**

- Check that status changes are being saved
- Verify `StatusHistory` model in Django admin
- Check API response includes `status_history` array

## 📚 Project Structure Explained

### Backend Structure

```
backend/
├── backend/            # Django project settings
│   ├── settings.py     # Main configuration
│   ├── urls.py         # Root URL routing
│   └── wsgi.py         # WSGI config
├── tickets/            # Tickets app
│   ├── models.py       # Ticket & StatusHistory models
│   ├── views.py        # API views
│   ├── admin.py        # Django admin config
│   └── migrations/     # Database migrations
├── users/              # Users app
│   ├── models.py       # Custom User model
│   ├── views.py        # Auth API views
│   └── migrations/     # Database migrations
├── db.sqlite3          # SQLite database
└── manage.py           # Django management script
```

### Frontend Structure

```
frontend/
├── public/             # Static files
│   └── index.html      # HTML template with Tawk.to
├── src/
│   ├── assets/         # Images, fonts, icons
│   │   └── images/     # Background images
│   ├── examples/       # Reusable components
│   │   ├── Navbars/    # DashboardNavbar with username
│   │   ├── Sidenav/    # Sidebar (cleaned)
│   │   └── Cards/      # Various card components
│   ├── layouts/        # Page layouts
│   │   ├── authentication/  # Login & Register
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   └── components/  # BasicLayout, CoverLayout
│   │   ├── tickets/         # Ticket list (DataTable)
│   │   ├── ticket-detail/   # Detail with timeline
│   │   └── ticket-form/     # Create/Edit form
│   ├── AuthContext.js       # Auth state management
│   ├── ProtectedRoute.js    # Route guard
│   ├── routes.js            # Route definitions
│   └── App.js               # Main app component
├── package.json        # Dependencies
└── .eslintrc.json      # ESLint config
```

### Key Files Explained

**[backend/settings.py](backend/settings.py):**

- Django configuration
- Installed apps
- Database settings
- CORS configuration
- Cloudinary settings
- JWT settings

**[backend/tickets/models.py](backend/tickets/models.py):**

- `Ticket` model with fields
- `StatusHistory` model for tracking changes
- Cloudinary integration

**[backend/tickets/views.py](backend/tickets/views.py):**

- `TicketViewSet` with CRUD operations
- Permissions based on user role
- Status update endpoint

**[frontend/src/AuthContext.js](frontend/src/AuthContext.js):**

- Global authentication state
- Login/logout functions
- JWT token management
- User object with username and isAdmin

**[frontend/src/routes.js](frontend/src/routes.js):**

- All application routes
- Sidebar visibility settings
- Only "Tickets" shown in sidebar

**[frontend/src/layouts/tickets/index.js](frontend/src/layouts/tickets/index.js):**

- DataTable implementation
- Search and filter logic
- Styled dropdowns
- Action buttons

**[frontend/src/layouts/ticket-detail/index.js](frontend/src/layouts/ticket-detail/index.js):**

- Two-column responsive layout
- Status history timeline
- Admin status update buttons
- Image/PDF display

**[frontend/src/examples/Navbars/DashboardNavbar/index.js](frontend/src/examples/Navbars/DashboardNavbar/index.js):**

- Cleaned navbar
- Username display from AuthContext
- Logout functionality

## 📝 Development Notes

### Code Quality

- **ESLint**: Configured with React rules
- **Prettier**: Format on save recommended
- **Comments**: Added where logic is complex
- **Naming**: Consistent camelCase for JS, snake_case for Python

### Security Considerations

- JWT tokens stored in localStorage
- CORS configured for localhost only
- CSRF protection enabled
- SQL injection protection (Django ORM)
- File upload validation needed (add size/type checks)
- HTTPS required in production

### Performance Optimizations

- Lazy loading components with React.lazy()
- Image compression before upload
- Pagination for large ticket lists
- Database indexing on frequently queried fields
- CDN for static assets (Cloudinary)

### Future Enhancements

1. **Email Notifications**: Send email when ticket status changes
2. **Real-time Updates**: WebSocket for live ticket updates
3. **Attachments**: Support multiple files per ticket
4. **Comments**: Add comment section to tickets
5. **Analytics**: Dashboard with ticket statistics
6. **Export**: Export tickets to CSV/Excel
7. **Advanced Search**: Full-text search with filters
8. **Mobile App**: React Native version
9. **Internationalization**: Multi-language support
10. **Dark Mode**: Theme toggle

## 💬 Live Chat Integration

### Tawk.to Live Chat

- **Widget Location**: Bottom-right corner on all pages
- **Property ID**: `693d598f7bdcd2197d9811d9`
- **Widget ID**: `1jcbqbm7n`
- **Configuration**: Located in [frontend/public/index.html](frontend/public/index.html)

### Test Chat

1. Look for chat widget icon (bottom-right)
2. Click to expand chat
3. Type and send a message
4. View messages in Tawk.to dashboard: https://dashboard.tawk.to/

## 🌐 Cloudinary Integration

### File Upload Flow

1. User selects image/PDF in ticket form
2. Frontend sends multipart/form-data to backend
3. Django processes upload via CloudinaryField
4. File uploaded to Cloudinary cloud storage
5. Cloudinary returns public URL
6. URL stored in database
7. Frontend displays file from Cloudinary URL

### Verify Uploads

1. Login to Cloudinary: https://cloudinary.com/console
2. Navigate to Media Library
3. Check "tickets" folder
4. Uploaded files appear here

## 👥 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project uses the Material Dashboard React template by Creative Tim (MIT License).

## 🤝 Support

For issues, questions, or contributions:

1. Open an issue on GitHub
2. Use Tawk.to chat widget for live support
3. Email: chahbani.ghassen@esprit.tn

## 🙏 Acknowledgments

- **Creative Tim** for Material Dashboard React template
- **Django** for robust backend framework
- **React** for powerful frontend library
- **Material-UI** for beautiful components
- **Cloudinary** for file storage
- **Tawk.to** for live chat widget

## 👨‍💻 Author

**Ghassen Chahbani**

- GitHub: [ghassenchahbani](https://github.com/ghassenchahbani)
- Repository: [aiesec-ticketing-system](https://github.com/ghassenchahbani/aiesec-ticketing-system)
- Email: chahbani.ghassen@esprit.tn

---
