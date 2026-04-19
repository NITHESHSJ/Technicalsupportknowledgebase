# CORS Configuration Setup

## Overview
CORS (Cross-Origin Resource Sharing) middleware has been set up to allow the frontend to communicate with the backend securely.

## Backend Setup

### CORS Middleware
**File:** `backend/middleware/cors.js`

The CORS middleware is configured to:
- Accept origins from the `CORS_ORIGIN` environment variable
- Allow standard HTTP methods (GET, POST, PUT, DELETE, OPTIONS)
- Support Authorization headers for JWT tokens
- Enable credentials (for cookies if needed)
- Cache preflight requests for 24 hours

### Configuration in index.js
The backend now imports and uses the CORS middleware from `backend/middleware/cors.js` instead of inline configuration.

## Environment Variables

### Backend (.env)
```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/dbname

# CORS Configuration - Set the frontend domain here
CORS_ORIGIN=http://localhost:5173

# JWT Configuration (optional)
JWT_SECRET=your_jwt_secret_key_here
```

### Frontend (.env)
```bash
# Frontend API Configuration - Set the backend domain here
VITE_API_URL=http://localhost:5000
```

## Setup Instructions

### 1. Backend Setup
1. Create a `.env` file in the `backend/` directory (copy from `.env.example`)
2. Update `CORS_ORIGIN` to your frontend domain:
   - **Development:** `http://localhost:5173` (or your Vite dev server port)
   - **Production:** `https://yourdomain.com`
   - **Multiple domains:** Separate with commas: `http://localhost:5173,https://yourdomain.com`

### 2. Frontend Setup
1. Create a `.env` file in the `frontend/TSKB/` directory (copy from `.env.example`)
2. Update `VITE_API_URL` to your backend domain:
   - **Development:** `http://localhost:5000`
   - **Production:** `https://api.yourdomain.com`

## Running the Application

### Backend
```bash
cd backend
npm install
npm run dev  # or npm start for production
```

### Frontend
```bash
cd frontend/TSKB
npm install
npm run dev  # or npm run build for production
```

## CORS_ORIGIN Configuration Examples

| Environment | CORS_ORIGIN Value |
|------------|------------------|
| Local Development | `http://localhost:5173` |
| Vercel Preview | `https://*.vercel.app` |
| Production | `https://yourdomain.com` |
| Multiple Environments | `http://localhost:5173,https://yourdomain.com,https://preview.yourdomain.com` |

## Important Notes

- **Never commit `.env` files** - They contain sensitive information and are already in `.gitignore`
- **Use `.env.example`** as a template for new environments
- **For wildcard domains** (like Vercel), you may need additional configuration
- **CORS_ORIGIN** must exactly match the frontend domain (scheme, domain, and port)
- In production, avoid using `*` as the origin - always specify explicit domains

## Troubleshooting

### CORS Errors
If you get CORS errors, verify:
1. The `CORS_ORIGIN` in backend `.env` matches your frontend domain exactly
2. The `VITE_API_URL` in frontend `.env` is correct
3. Both services are running
4. Check browser console for the specific CORS error message

### Common Issues
- **"No 'Access-Control-Allow-Origin' header"** - Check that `CORS_ORIGIN` matches your frontend URL
- **Credentials not sent** - Ensure frontend API calls include `credentials: 'include'` if needed
- **Port mismatch** - Make sure the port in `.env` values matches the actual running port
