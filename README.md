# Pictoria AI - Personalized AI Photo Generation Platform

Transform your photos with the power of AI! Pictoria AI is your ultimate solution for creating/generating professional AI-generated photos, similar to the popular PhotoAI platform. Perfect for LinkedIn headshots, Instagram content, dating profile pictures, and professional portraits. Train AI model on your personal images and generate stunning, high-quality AI-generated photos within minutes.

![GitHub stars](https://img.shields.io/github/stars/codebucks27/Pictoria-AI-Starter-Code?style=social&logo=ApacheSpark&label=Stars)&nbsp;&nbsp;
![GitHub forks](https://img.shields.io/github/forks/codebucks27/Pictoria-AI-Starter-Code?style=social&logo=KashFlow&maxAge=3600)&nbsp;&nbsp;
![Github Followers](https://img.shields.io/github/followers/codebucks27.svg?style=social&label=Follow)&nbsp;&nbsp;<br />

If you want to learn how to create it please follow below tutorial👇: <br />
➡ Tutorial Link 💚: [How to Build a $1M PhotoAI Sass Clone](https://youtu.be/7AQNeii5K7E) <br />
➡ Final Source Code💛: https://dub.sh/wYWBX9z (Get 40% discount with code **NEWYEAR40** Offer ends December 31st) 


🎯 For customised solutions or deployment please contact: https://tally.so/r/wdlj0N


#### ⭐DO NOT FORGET TO STAR THIS REPO⭐

## 🚀 Key Features  


- 🛠️ Complete SaaS built in modern Next.js
- 💻 Beautiful landing page included
- 🤖 Train AI model on your personal images
- 🖥️ Clean & intuitive event monitoring dashboard
- 🎯 AI-Powered Professional Photo Generation
- 🎨 Custom AI Model Training
- 💼 Professional LinkedIn Headshots
- 🌟 Clean, modern UI on top of shadcn-ui
- 📱 Social Media Content Generation
- 💳 Integrated Payment System
- ✉️ Email Notifications
- 📊 Usage Analytics
- 🎁 ...much more

## Images of The AI App:

![Photo AI clone Dashboard](https://github.com/codebucks27/Pictoria-AI-Starter-Code/blob/main/screenshots/Dashboard.png)
---
![Photo AI clone Image Generation Page](https://github.com/codebucks27/Pictoria-AI-Starter-Code/blob/main/screenshots/Image-Generation.png)
---
![Photo AI clone Model Training Page](https://github.com/codebucks27/Pictoria-AI-Starter-Code/blob/main/screenshots/Model-Training.png)
---
![Photo AI clone Billing Page](https://github.com/codebucks27/Pictoria-AI-Starter-Code/blob/main/screenshots/Billing.png)
---
![Photo AI clone Account Settings Page](https://github.com/codebucks27/Pictoria-AI-Starter-Code/blob/main/screenshots/Account-Settings.png)

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS, Shadcn UI
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **AI Integration:** Replicate AI API
- **Payment Processing:** Stripe
- **Email Service:** Resend
- **Language:** TypeScript

## ⚡ Prerequisites

Before you begin, ensure you have:

- Node.js installed (v20.x recommended, v18+ supported) 
- A Supabase account
- A Replicate account
- A Stripe account
- A Resend account

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone [your-repo-url]
cd Pictoria-AI-Starter-Code
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory. Check `.env.example` for required variables.

### 4. Supabase Database Setup

1. Create a new Supabase project
2. Create a new storage bucket named `generated_images`
3. Execute the SQL queries from `supabase-queries.md` in your Supabase SQL editor (You can also follow the tutorial video to setup the database)
4. Set up the database triggers and functions
5. Make sure to setup the right RLS policies (You can also follow the tutorial video to setup the RLS policies)

### 5. AI Model Links

Visit these links to set up your AI models:
- [Flux Dev LORA model trainer](https://replicate.com/ostris/flux-dev-lora-trainer/train)
- [Flux Dev Model](https://replicate.com/black-forest-labs/flux-dev)
- [Flux Schnell Model](https://replicate.com/black-forest-labs/flux-schnell)

For stock images (not for training), I have used [Lummi AI](https://www.lummi.ai/)

### 6. Model Training Requirements

When training your custom model, ensure:
- 10-15 images in total
- Recommended breakdown for 12 images:
  - 6 face closeups
  - 3-4 half body closeups
  - 2-3 full body shots
- No accessories on face/head
- Different expressions, clothing, backgrounds
- 1:1 resolution (1048x1048 or higher)
- Images under 45MB total size

### 7. Stripe Setup

Watch our detailed video tutorial for Stripe integration setup: [Stripe Setup Tutorial](https://www.youtube.com/watch?v=7AQNeii5K7E&t=27960s)

### 8. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit `http://localhost:3000` to see your app.

## 📦 Project Structure

```
├── app/                 # Next.js 15 app directory
├── components/         # React components
├── lib/               # Utility, Supabase & Stripe functions
├── public/            # Static assets
└── globals.css            # Global styles
```

## 💰 Pricing Plans

- **Hobby**: 1 trained model/month, 100 images/month
- **Pro**: 2 trained models/month, 300 images/month
- **Enterprise**: 5 trained models/month, unlimited images

## 🎥 Tutorial Video

For a complete setup walkthrough, check out our [video tutorial](https://youtu.be/7AQNeii5K7E).

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

If you have any question or want a custom build for your business, you can reach out to me via:

- E-mail : codebucks27@gmail.com
- Twitter: https://twitter.com/code_bucks
- Instagram: https://www.instagram.com/code.bucks/

MyChannel: https://www.youtube.com/codebucks
My Website: https://devdreaming.com/
