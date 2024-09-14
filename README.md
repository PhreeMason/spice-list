# Setup
clone project
open the workspace using visual studio

Open a terminal to supabase-functions

```bash
    bunx supabase init
    bunx supabase link project-ref
    bunx supabase db pull
    bunx supabase db pull --schema auth,storage
    bunx supabase start
    bunx supabase functions serve
```

## Optional step for builds on WSL2
In a different terminal run 
```bash
    ngrok http --domain=magical-swift-maximum.ngrok-free.app 54321
```

rename `env.example` inside the client folder named `frontend` to `.env` and update the values.

Open a terminal to `client` aka `frontend` and run the following to install dependencies

```bash
    bun install
    bun start -c
```

## Make a new function

```bash
bunx supabase functions new hello-world
```

# Tables
## New ReadingGoals Table:
      goal_id (Primary Key)
      user_id (Foreign Key to Users)
      goal_type (e.g., "pages", "books", "time")
      goal_value
      start_date
      end_date
      status (e.g., "in progress", "completed", "failed")

## Build Preview
```bash
eas build -p android --profile preview
```