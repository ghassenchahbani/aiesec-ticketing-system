# Cloudinary Setup Instructions

## 1. Create Cloudinary Account

1. Go to https://cloudinary.com/users/register_free
2. Sign up for a free account
3. After signing up, you'll be taken to the dashboard

## 2. Get Your Credentials

1. On the Cloudinary dashboard, you'll see:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
2. Copy these values

## 3. Configure Your Application

### Option A: Using .env file (Recommended)

1. Create a `.env` file in the `backend/` directory:

   ```bash
   cd backend
   copy .env.example .env
   ```

2. Edit `.env` and add your Cloudinary credentials:
   ```
   CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
   CLOUDINARY_API_KEY=your_actual_api_key
   CLOUDINARY_API_SECRET=your_actual_api_secret
   ```

### Option B: Direct configuration

Edit `backend/backend/settings.py` and update:

```python
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'your_actual_cloud_name',
    'API_KEY': 'your_actual_api_key',
    'API_SECRET': 'your_actual_api_secret',
}
```

## 4. Test the Integration

1. Restart your Django server:

   ```bash
   python manage.py runserver
   ```

2. Upload a ticket attachment through the frontend
3. Check your Cloudinary dashboard - you should see the uploaded file under Media Library

## 5. Features

- ✅ Automatic file upload to Cloudinary
- ✅ CDN delivery for fast loading
- ✅ Automatic optimization and transformations
- ✅ No local file storage needed
- ✅ Free tier: 25 GB storage, 25 GB bandwidth/month

## Troubleshooting

- If uploads fail, check your Cloudinary credentials
- Ensure `.env` file is in the `backend/` directory
- Make sure `python-decouple`, `cloudinary`, and `django-cloudinary-storage` are installed
- Check Django logs for detailed error messages

## Security Notes

- Never commit `.env` file to git (it's in `.gitignore`)
- Keep your API Secret private
- Use environment variables in production
