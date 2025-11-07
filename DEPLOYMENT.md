# 🚀 Deployment Guide - Railway

This guide covers deploying your arcade-themed portfolio to Railway.app.

## 📋 Prerequisites

1. **Railway Account** - Sign up at https://railway.app
2. **Sanity Account** - Your Sanity project should be set up at https://sanity.io
3. **Git Repository** - Your code should be in a GitHub repository

## 🏗️ Architecture

This project consists of two services:

```
┌─────────────────┐         ┌─────────────────┐
│   Frontend      │────────▶│  Sanity Studio  │
│   (SvelteKit)   │         │  (CMS Backend)  │
│   Port: 3000    │         │   Port: 3333    │
└─────────────────┘         └─────────────────┘
```

## 🔧 Deployment Steps

### Option 1: Deploy as Separate Services (Recommended)

#### Deploy Sanity Studio (Backend)

1. **Create New Project in Railway**
   - Go to https://railway.app/new
   - Select "Deploy from GitHub repo"
   - Choose your `personalwebsite` repository
   - Railway will detect the monorepo

2. **Configure Sanity Service**
   - **Root Directory**: `gregdchan`
   - **Builder**: Dockerfile
   - **Dockerfile Path**: `gregdchan/Dockerfile`

3. **Set Environment Variables**
   ```env
   NODE_ENV=production
   SANITY_STUDIO_PROJECT_ID=your_project_id
   SANITY_STUDIO_DATASET=production
   SANITY_STUDIO_API_VERSION=2024-01-01
   PORT=3333
   ```

4. **Get Your Sanity Project ID**
   ```bash
   cd gregdchan
   npx sanity manage
   # Copy your Project ID from the dashboard
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Note the deployed URL (e.g., `https://your-studio.railway.app`)

#### Deploy Frontend (SvelteKit)

1. **Create Another Service in Same Project**
   - In your Railway project, click "+ New Service"
   - Select "Deploy from GitHub repo"
   - Choose the same repository

2. **Configure Frontend Service**
   - **Root Directory**: `frontend`
   - **Builder**: Dockerfile
   - **Dockerfile Path**: `frontend/Dockerfile`

3. **Set Environment Variables**
   ```env
   NODE_ENV=production
   VITE_API_URL=https://your-studio.railway.app
   PUBLIC_SANITY_PROJECT_ID=your_project_id
   PUBLIC_SANITY_DATASET=production
   PORT=3000
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at the Railway URL

### Option 2: Deploy with Docker Compose

If you prefer to keep everything in one service:

1. **Use the existing docker-compose.yml**
   - Railway can detect and deploy Docker Compose files
   - Both services will run in the same container

2. **Set Environment Variables**
   - Add all variables from both services above
   - Railway will pass them to Docker Compose

## 🔑 Environment Variables Reference

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `VITE_API_URL` | Sanity Studio URL | `https://studio.railway.app` |
| `PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | `smxz6rsz` |
| `PUBLIC_SANITY_DATASET` | Sanity dataset | `production` |
| `PORT` | Server port (Railway auto-sets) | `3000` |

### Backend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `SANITY_STUDIO_PROJECT_ID` | Sanity project ID | `smxz6rsz` |
| `SANITY_STUDIO_DATASET` | Sanity dataset | `production` |
| `SANITY_STUDIO_API_VERSION` | API version | `2024-01-01` |
| `PORT` | Server port | `3333` |

## 🌐 Custom Domain Setup

### Frontend

1. Go to your Frontend service in Railway
2. Click "Settings" → "Networking"
3. Click "Generate Domain" or add your custom domain
4. Update DNS records if using custom domain:
   ```
   CNAME www your-app.railway.app
   A     @   Railway IP (shown in dashboard)
   ```

### Sanity Studio

1. Go to your Sanity service in Railway
2. Generate a domain (e.g., `studio.yourdomain.com`)
3. Update Sanity CORS settings:
   ```bash
   cd gregdchan
   npx sanity cors add https://studio.yourdomain.com --credentials
   npx sanity cors add https://yourdomain.com --credentials
   ```

## 🔄 Continuous Deployment

Railway automatically deploys when you push to your GitHub repository:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Railway will:
1. Detect the push
2. Build new Docker images
3. Deploy updated services
4. Zero-downtime rollout

## 🐛 Troubleshooting

### Build Fails

**Check logs:**
```bash
# In Railway dashboard, click on deployment
# View "Build Logs" and "Deploy Logs"
```

**Common issues:**
- Missing environment variables
- Node version mismatch (ensure `node:18-alpine`)
- Missing dependencies in package.json

### Frontend Can't Connect to Sanity

**Check:**
1. `VITE_API_URL` points to correct Sanity URL
2. Sanity CORS settings allow your frontend domain
3. Sanity project ID matches in both services

**Add CORS:**
```bash
cd gregdchan
npx sanity cors add https://your-frontend.railway.app --credentials
```

### Port Issues

Railway automatically sets the `PORT` environment variable. Ensure your apps listen on `process.env.PORT` or `$PORT`.

**Frontend:** Already configured in Dockerfile
**Backend:** Configured with `--port $PORT` flag

## 📊 Monitoring

Railway provides built-in monitoring:

1. **Metrics** - CPU, Memory, Network usage
2. **Logs** - Real-time application logs
3. **Deployments** - History of all deployments
4. **Alerts** - Set up alerts for failures

## 💰 Cost Optimization

Railway pricing is based on usage:

- **Free Tier**: $5 credit/month
- **Pro Tier**: $20/month + usage

**Tips to reduce costs:**
1. Use Alpine images (smaller, faster)
2. Multi-stage builds (we already do this)
3. Scale down during low traffic
4. Use Railway's auto-sleep for non-production

## 🔐 Security Best Practices

1. **Never commit secrets** - Use Railway environment variables
2. **Enable CORS properly** - Only allow your domains
3. **Use HTTPS** - Railway provides free SSL certificates
4. **Rotate tokens** - Regularly rotate Sanity API tokens
5. **Set up rate limiting** - Protect your API endpoints

## 📝 Local Development

To test production builds locally:

### Frontend
```bash
cd frontend
docker build -t frontend-prod .
docker run -p 3000:3000 \
  -e VITE_API_URL=http://localhost:3333 \
  -e PUBLIC_SANITY_PROJECT_ID=your_id \
  -e PUBLIC_SANITY_DATASET=production \
  frontend-prod
```

### Backend
```bash
cd gregdchan
docker build -t backend-prod .
docker run -p 3333:3333 \
  -e SANITY_STUDIO_PROJECT_ID=your_id \
  -e SANITY_STUDIO_DATASET=production \
  backend-prod
```

## 🚀 Advanced: Deploy to Other Platforms

The Dockerfiles are platform-agnostic and work on:

- **Vercel** - Add `vercel.json`
- **Netlify** - Add `netlify.toml`
- **DigitalOcean App Platform** - Use existing Dockerfiles
- **AWS ECS** - Use Docker images
- **Google Cloud Run** - Use Docker images

## 📞 Support

- **Railway Docs**: https://docs.railway.app
- **Sanity Docs**: https://www.sanity.io/docs
- **SvelteKit Docs**: https://kit.svelte.dev/docs

## ✅ Deployment Checklist

Before deploying:

- [ ] Environment variables set correctly
- [ ] Sanity CORS configured
- [ ] Custom domain DNS configured (if applicable)
- [ ] Test production build locally
- [ ] Database migrations run (if any)
- [ ] Sanity content published
- [ ] Monitoring set up
- [ ] Backup strategy in place

After deploying:

- [ ] Test all pages load correctly
- [ ] Test arcade game functionality
- [ ] Test Sanity Studio access
- [ ] Check performance (Lighthouse)
- [ ] Test mobile responsive design
- [ ] Verify analytics tracking (if configured)
