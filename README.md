# ReGreen Admin Dashboard

A compact Next.js admin dashboard built strictly around the supplied Rejesha API OpenAPI document.

## API
`https://regreen-environment.onrender.com`

## Run
```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Implemented API areas
- `/auth/login`
- `/auth/me`
- `/organizations`
- `/campaigns`
- `/zones`
- `/zones/{campaign_id}`
- `/observations`
- `/observations/{observation_id}/verify`
- `/dashboard/metrics`
- `/dashboard/campaigns`
- `/health`

The dashboard intentionally does not include CFAs, permits, incidents, payments, member registry, or other endpoints absent from the supplied OpenAPI.
