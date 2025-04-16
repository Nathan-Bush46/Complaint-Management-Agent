````markdown
# 🛠 Complaint Management Agent

A full-stack complaint submission and review system with public and internal views.

## 🚀 Quick Start (Dev Container Setup)

### 1. Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and **running**
- [VS Code](https://code.visualstudio.com/) with the **Dev Containers** extension

### 2. Clone and Open

```bash
git clone https://github.com/yourusername/complaint-management-agent.git
cd complaint-management-agent
code .
```
````

Click **"Reopen in Container"** when prompted.

### 3. Add `.env` File

Create a `.env` file in the root:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the App

In the dev container terminal:

```bash
npm run dev
```

- Client: [http://localhost:5173/submit](http://localhost:5173/submit)
- Admin: [http://localhost:5173/admin](http://localhost:5173/admin)
- API: [http://localhost:3001](http://localhost:3001)

## 🗃 Database Schema

| Column       | Type      | Default             |
| ------------ | --------- | ------------------- |
| `id`         | UUID      | `gen_random_uuid()` |
| `name`       | text      |                     |
| `email`      | text      |                     |
| `complaint`  | text      |                     |
| `status`     | text      | `'Pending'`         |
| `created_at` | timestamp | `now()`             |

## 📋 Features

- Submit and manage complaints
- Toggle complaint status
- Filter by status
- Delete complaints
- Fully containerized for consistent dev experience

## 💡 Future Improvements

- Admin authentication
- Pagination & search
- Spam protection (e.g., CAPTCHA)
- Tests & monitoring

```

```
