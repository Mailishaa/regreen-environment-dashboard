# ReGreen Admin Dashboard

A web-based administration dashboard for managing environmental restoration data, campaigns, organizations, zones, and field observations.

The dashboard provides administrators with tools to monitor restoration activities, verify submitted observations, and visualize environmental impact metrics such as trees planted, latest tree counts, and survival rates.

---

## Features

### Authentication
- Secure admin login using JWT authentication
- Token-based API communication
- Protected dashboard access
- Automatic session handling and logout

### Organization Management
- View registered organizations
- Manage environmental restoration partners
- Track organizations connected to campaigns

### Campaign Management
- Create and view restoration campaigns
- Associate campaigns with organizations
- Track restoration initiatives by project

### Zone Management
- Define restoration areas
- Associate zones with campaigns
- Store geographic boundaries for monitoring locations

### Observation Management
- Upload and review environmental observations
- Track:
  - Observation type
  - Tree count
  - Location coordinates
  - Capture date
  - Supporting images

### Verification Workflow
- Review submitted observations
- Approve verified field data
- Maintain reliable restoration records

### Dashboard Analytics
The overview dashboard provides:

- Total organizations
- Total campaigns
- Total observations
- Trees planted
- Latest tree count
- Survival rate

---

## Technology Stack

### Frontend

- Next.js
- React
- JavaScript (JSX)
- CSS
- Fetch API

### Backend Integration

- REST API
- JWT authentication
- Environment-based API configuration

### Deployment

The dashboard connects to the ReGreen environmental API:
