# GitHub Repository Setup Guide

## 📦 Preparing for GitHub Submission

Follow these steps to submit your project to GitHub:

### 1. Initialize Git Repository

```bash
cd C:\Users\ghass\Desktop\ticket_management
git init
```

### 2. Configure Git (First Time Only)

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 3. Create .gitignore (Already Created)

Verify `.gitignore` file exists and contains:

- `venv/` - Virtual environment
- `node_modules/` - NPM packages
- `.env` - Environment variables with secrets
- `db.sqlite3` - Local database
- `__pycache__/` - Python cache files

### 4. Add All Files

```bash
git add .
```

### 5. Commit Changes

```bash
git commit -m "Initial commit: AIESEC Ticketing System"
```

### 6. Create GitHub Repository

1. Go to https://github.com
2. Click "New Repository" or go to https://github.com/new
3. Repository name: `aiesec-ticketing-system`
4. Description: `Full-stack ticketing system with Django and React`
5. **DO NOT** initialize with README (we already have one)
6. Click "Create Repository"

### 7. Link Local Repository to GitHub

After creating the repository, GitHub will show commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/aiesec-ticketing-system.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 8. Verify Upload

1. Refresh your GitHub repository page
2. You should see all files uploaded
3. README.md should display on the main page

## 📋 Submission Checklist

Before submitting, verify your repository contains:

### ✅ Required Folders

- [ ] `backend/` - Django REST API
- [ ] `frontend/` - React application
- [ ] `.gitignore` - Ignore sensitive files

### ✅ Required Files

- [ ] `README.md` - Setup and testing instructions
- [ ] `PROJECT_DOCUMENTATION.md` - Complete technical documentation
- [ ] `CLOUDINARY_SETUP.md` - Cloudinary integration guide
- [ ] `backend/requirements.txt` - Python dependencies
- [ ] `backend/.env.example` - Environment variables template
- [ ] `frontend/package.json` - NPM dependencies

### ✅ Backend Files

- [ ] `backend/manage.py` - Django management script
- [ ] `backend/backend/settings.py` - Django configuration
- [ ] `backend/backend/urls.py` - URL routing
- [ ] `backend/tickets/models.py` - Database models
- [ ] `backend/tickets/views.py` - API endpoints
- [ ] `backend/tickets/serializers.py` - API serializers
- [ ] `backend/tickets/permissions.py` - Custom permissions
- [ ] `backend/users/views.py` - Authentication endpoints
- [ ] `backend/users/serializers.py` - User serializers

### ✅ Frontend Files

- [ ] `frontend/src/App.js` - Main application
- [ ] `frontend/src/AuthContext.js` - Authentication state
- [ ] `frontend/src/api.js` - Axios configuration
- [ ] `frontend/src/ProtectedRoute.js` - Route guards
- [ ] `frontend/src/components/Login.js` - Login component
- [ ] `frontend/src/components/Register.js` - Register component
- [ ] `frontend/src/components/TicketList.js` - Ticket list view
- [ ] `frontend/src/components/TicketDetail.js` - Ticket details
- [ ] `frontend/src/components/TicketForm.js` - Create/Edit form
- [ ] `frontend/public/index.html` - HTML with Tawk.to widget

### ✅ NOT Included (In .gitignore)

- [ ] `venv/` - Virtual environment (too large)
- [ ] `node_modules/` - NPM packages (can be reinstalled)
- [ ] `.env` - Secret keys (security risk)
- [ ] `db.sqlite3` - Local database (not needed)
- [ ] `__pycache__/` - Python cache (regenerated)

## 🚀 Optional: Deploy to Live Server

For **extra credit**, you can deploy your application:

### Option 1: Heroku (Free Tier Ended - Use Alternative)

### Option 2: Railway.app (Recommended)

1. Sign up at https://railway.app/
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your repository
4. Add environment variables in Railway dashboard
5. Deploy backend and frontend separately

### Option 3: Render.com (Free Tier Available)

1. Sign up at https://render.com/
2. Create new "Web Service"
3. Connect GitHub repository
4. Deploy backend (Django)
5. Create "Static Site" for frontend (React)

### Option 4: Vercel (Frontend) + PythonAnywhere (Backend)

**Frontend on Vercel:**

```bash
cd frontend
npm run build
# Deploy to Vercel
```

**Backend on PythonAnywhere:**

- Upload code to PythonAnywhere
- Set up WSGI configuration
- Configure database (MySQL instead of SQLite)

## 📤 Submission Format

When submitting to AIESEC:

### Email Format:

```
Subject: AIESEC Full-Stack Developer Task Submission - [Your Name]

Body:
Hello,

Please find my submission for the AIESEC Full-Stack Developer Task:

GitHub Repository: https://github.com/YOUR_USERNAME/aiesec-ticketing-system

Project includes:
- Django REST API backend
- React frontend
- Complete documentation (README.md)
- Setup and testing instructions
- Live chat integration (Tawk.to)
- File upload with Cloudinary

[Optional] Live Demo: https://your-deployed-app.com

Technical Stack:
- Backend: Django 6.0, Django REST Framework, JWT Authentication
- Frontend: React 19, React Router, Axios
- Database: SQLite (development)
- Cloud Storage: Cloudinary
- Live Chat: Tawk.to

All requirements have been implemented as specified in the task document.

Best regards,
[Your Name]
[Your Email]
[Your Phone]
```

## 🔍 Before Submitting - Final Checks

### 1. Test Locally

```bash
# Terminal 1: Backend
cd backend
python manage.py runserver

# Terminal 2: Frontend
cd frontend
npm start
```

### 2. Verify All Features

- [ ] User registration works
- [ ] User login works
- [ ] Admin can see all tickets
- [ ] User can see only their tickets
- [ ] Create ticket with file upload
- [ ] Image displays correctly
- [ ] PDF displays with viewer
- [ ] Search functionality works
- [ ] Filter by category and status
- [ ] Pagination works
- [ ] Admin can change status
- [ ] Status history displays
- [ ] Tawk.to chat widget appears
- [ ] Admin can edit/delete tickets

### 3. Test API Endpoints

Visit these URLs (with backend running):

- http://127.0.0.1:8000/api/tickets/
- http://127.0.0.1:8000/api/auth/login/
- http://127.0.0.1:8000/admin/ (Django admin panel)

### 4. Review Documentation

- [ ] README.md has complete setup instructions
- [ ] README.md has testing instructions
- [ ] README.md mentions design source
- [ ] README.md explains chat integration testing
- [ ] All code is well-commented
- [ ] No sensitive data in committed files

### 5. Clean Up

```bash
# Remove unnecessary files
git rm -r --cached venv/
git rm -r --cached node_modules/
git rm --cached .env
git commit -m "Remove unnecessary files"
git push
```

## 📞 Support

If you encounter issues during submission:

1. Check GitHub documentation: https://docs.github.com/
2. Review Git commands: https://git-scm.com/docs
3. Test locally before pushing
4. Use `git status` to check what will be committed

## ✨ Tips for Extra Credit

To impress evaluators:

1. Deploy to live server (Railway, Render, Vercel)
2. Add comprehensive code comments
3. Include unit tests
4. Add API documentation (Swagger/OpenAPI)
5. Include postman collection for API testing
6. Add CI/CD pipeline (GitHub Actions)
7. Use environment-based configuration
8. Include architecture diagrams
9. Add video demo/tutorial
10. Mobile-responsive design (already done!)

---

**Good luck with your submission!** 🚀

For questions or issues, refer to:

- README.md - Setup guide
- PROJECT_DOCUMENTATION.md - Technical details
- CLOUDINARY_SETUP.md - File upload guide
