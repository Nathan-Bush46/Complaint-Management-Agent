````markdown
# Complaint Management Agent

A full-stack complaint submission and review system with public and internal views.

## 🚀 Quick Start (Dev Container Setup)

### 1. Prerequisites

- Docker Desktop installed and running
- VS Code with the Dev Containers extension

### 2. Clone and Open

```bash
git clone https://github.com/yourusername/complaint-management-agent.git
cd complaint-management-agent
code .
```
````

When prompted, choose "Reopen in Container".

### 3. Add .env File

Create a `.env` file in the project root:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the App

```bash
npm run dev
```

Access the app:

- http://localhost:5173/submit – Submit complaints
- http://localhost:5173/admin – View and manage complaints

## 🗃 Database Schema

| Column     | Type      | Default           |
| ---------- | --------- | ----------------- |
| id         | UUID      | gen_random_uuid() |
| name       | text      |                   |
| email      | text      |                   |
| complaint  | text      |                   |
| status     | text      | 'Pending'         |
| created_at | timestamp | now()             |

## 💡 Future Improvements

- Add user authentication for admin view
- Add email notifications for new submissions
- Add backend validation with a schema validator
- Improve styling and responsiveness
- Add loading and error states to the frontend
- Add API rate limiting to prevent spam
