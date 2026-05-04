# Deployment Guide

## Option A — Vercel (Recommended, Free Tier Available)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/edu-consultancy.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)

### 3. Set Environment Variables in Vercel

In Project Settings → Environment Variables, add all variables from `.env.local`:

```
MONGODB_URI
JWT_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
NEXT_PUBLIC_APP_URL      → https://your-domain.vercel.app
NEXT_PUBLIC_APP_NAME     → EduConsult
ADMIN_EMAIL
ADMIN_PASSWORD
NEXT_PUBLIC_WHATSAPP_NUMBER
SEED_KEY
```

### 4. Deploy

Click **Deploy**. Vercel builds automatically on every push to `main`.

### 5. Custom Domain

In Vercel → Domains → Add your domain (e.g. `educonsult.ae`).
Update DNS records as instructed by Vercel.

### 6. Seed Production Database

After deployment:

```bash
curl -X POST "https://your-domain.vercel.app/api/seed?key=YOUR_SEED_KEY"
```

---

## Option B — Self-Hosted (VPS / Ubuntu)

### Prerequisites

```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Install nginx
sudo apt install nginx -y
```

### Deploy

```bash
# Clone repo
git clone https://github.com/YOUR_USERNAME/edu-consultancy.git
cd edu-consultancy

# Install dependencies
npm install

# Create .env.local with production values
nano .env.local

# Build
npm run build

# Start with PM2
pm2 start npm --name "educonsult" -- start
pm2 save
pm2 startup
```

### Nginx Config

```nginx
server {
    listen 80;
    server_name educonsult.ae www.educonsult.ae;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/educonsult /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d educonsult.ae -d www.educonsult.ae
```

---

## Post-Deployment Checklist

- [ ] Site loads at your domain
- [ ] Admin panel accessible at `/admin/login`
- [ ] Contact form submits successfully
- [ ] Images upload via Cloudinary
- [ ] WhatsApp link opens correctly
- [ ] Seed database via `/api/seed?key=YOUR_KEY`
- [ ] Delete/disable the seed endpoint after use (remove `src/app/api/seed/`)
- [ ] Update `JWT_SECRET` to a long random value
- [ ] Set up MongoDB Atlas IP whitelist to allow Vercel IPs
