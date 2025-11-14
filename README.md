# Device Sandbox Simulator

A modern web application for creating, managing, and testing device configurations through an interactive drag-and-drop interface. Built with Laravel and React, it provides a seamless full-stack experience.

## Table of Contents

- [Setup](#setup)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Modularity & Scalability](#modularity--scalability)
- [Workflow](#workflow)
- [API Documentation](#api-documentation)
- [File Structure](#file-structure)

---

## Setup

### Prerequisites

- **PHP** 8.2+
- **Node.js** 18+ with npm
- **MySQL**
- **Composer**

### Installation Steps

#### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repo-url>
cd device-sandbox-simulator

# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Build frontend assets
npm run build
```

#### 2. Database Setup

```bash
# .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=device_sandbox
DB_USERNAME=root
DB_PASSWORD=your_password
```

Then run migrations:

```bash
php artisan migrate
```

Also need to seed the database:

```bash
php artisan db:seed
```

### Running the Application

```bash
php artisan serve
```

This starts:
- PHP development server (port 8000)

---

## Tech Stack

### Backend

| Package | Version | Purpose |
|---------|---------|---------|
| **Laravel** | 12.0 | Framework, routing, ORM |
| **PHP** | 8.2+ | Backend language |
| **Inertia.js** | 2.0 | Server-side rendering bridge |
| **Laravel Pint** | 1.24 | PHP code formatting |

### Frontend

| Package | Version | Purpose |
|---------|---------|---------|
| **React** | 19 | UI library |
| **TypeScript** | 5.7 | Type safety |
| **Tailwind CSS** | 4.0 | Styling |
| **Inertia.js** | 2.0 | Page component rendering |
| **Vite** | 7.0 | Build tool & dev server |
| **Zustand** | 5.0 | State management |
| **@dnd-kit** | 6.3+ | Drag-and-drop library |
| **Axios** | 1.13 | HTTP client |
| **Lucide React** | 0.553 | Icon library |
| **React Hot Toast** | 2.6 | Toast notifications |

### Database & Storage

- **MySQL**

---

## Architecture

### Backend Architecture (Laravel)

```
app/
├── Models/                  # Eloquent models
│   ├── Device.php          # Device definitions (Light, Fan)
│   ├── Preset.php          # Saved configurations
│   └── User.php            # User model
├── Http/
│   ├── Controllers/Api/    # API controllers
│   │   ├── DeviceController.php    # Fetch devices
│   │   └── PresetController.php    # CRUD presets
│   ├── Requests/           # Form validation
│   │   └── StorePresetRequest.php  # Preset validation
│   └── Middleware/         # HTTP middleware
│       └── HandleInertiaRequests.php
└── Providers/              # Service providers

database/
├── migrations/             # Schema definitions
│   ├── create_devices_table
│   └── create_presets_table
└── seeders/               # Initial data
    └── DeviceSeeder.php   # Seed Light & Fan devices
```

### Frontend Architecture (React + TypeScript)

```
resources/js/
├── pages/                  # Page components
│   └── Sandbox.tsx        # Main application page
├── components/
│   ├── common/            # Shared layout components
│   │   ├── Sidebar.tsx    # Device & preset lists
│   │   ├── Canvas.tsx     # Drag-drop container
│   │   ├── CanvasDevice.tsx     # Device renderer
│   │   └── DragPreview.tsx      # Drag preview
│   ├── devices/           # Device-specific components
│   │   ├── Light/
│   │   │   ├── LightVisual.tsx  # Light visualization
│   │   │   ├── LightItem.tsx    # Sidebar item
│   │   │   └── LightController.tsx  # Settings panel
│   │   └── Fan/
│   │       ├── FanVisual.tsx
│   │       ├── FanItem.tsx
│   │       └── FanController.tsx
│   ├── presets/           # Preset components
│   │   ├── PresetItem.tsx
│   │   └── PresetDraggable.tsx
│   ├── dialogs/           # Modal dialogs
│   │   ├── SavePresetDialog.tsx
│   │   ├── ConfirmAddDeviceDialog.tsx
│   │   └── DeletePresetConfirmDialog.tsx
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx     # Button with variants
│   │   └── Dialog.tsx     # Dialog wrapper
├── stores/                # Zustand state stores
│   ├── canvasStore.ts     # Canvas & device state
│   ├── presetStore.ts     # Preset CRUD operations
│   └── deviceStore.ts     # Fetch available devices
├── types/                 # TypeScript definitions
│   └── index.ts
├── config/
│   └── axios.ts           # Axios instance with interceptors
├── utils/                 # Helper functions
│   └── dateHelpers.ts     # Date formatting
└── app.tsx               # Root component
```

**Key Patterns:**

1. **Component Modularity** - Each device type has independent components (Visual, Item, Controller)
2. **Device Registry Pattern** - Centralized device definitions for dynamic rendering
3. **Zustand Stores** - Lightweight state management for canvas, presets, devices
4. **Type Safety** - Full TypeScript coverage for props, API responses, store state
5. **Atomic Components** - Small, reusable UI components (Button, Dialog)

---

### Key Features

| Feature | Behavior |
|---------|----------|
| **Drag & Drop** | Devices from sidebar → canvas |
| **Live Preview** | Settings changes show instantly |
| **Preset Management** | Save, load, update, delete configurations |
| **Responsive Design** | Mobile: slide-over sidebar, stacked layout |
| **Error Handling** | Validation errors + server errors in toast |
| **State Persistence** | Presets stored in database, canvas in memory |

---

## API Documentation

### Base URL
```
http://localhost:8000/api/sandbox
```

### Endpoints

#### GET `/devices`
Fetch all active devices

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "type": "light",
      "name": "Light",
      "is_active": true,
      "settings": {
        "power": false,
        "brightness": 50,
        "colorTemp": "neutral"
      },
      "created_at": "2025-11-15T10:00:00Z",
      "updated_at": "2025-11-15T10:00:00Z"
    }
  ]
}
```

#### GET `/presets`
Fetch all presets (sorted by latest)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Warm Light Setup",
      "device_id": 1,
      "device": { /* DeviceModel */ },
      "configuration": {
        "power": true,
        "brightness": 80,
        "colorTemp": "warm"
      },
      "created_at": "2025-11-15T10:30:00Z",
      "updated_at": "2025-11-15T10:30:00Z"
    }
  ]
}
```

#### POST `/presets`
Create new preset

**Request:**
```json
{
  "name": "My Setup",
  "device_id": 1,
  "settings": {
    "power": true,
    "brightness": 100,
    "colorTemp": "cool"
  }
}
```

**Response:** `201 Created`
```json
{
  "data": { /* Preset with device */ }
}
```

#### PUT `/presets/{id}`
Update preset

**Request:** Same as POST

**Response:** `200 OK`

#### DELETE `/presets/{id}`
Delete preset

**Response:** `200 OK`
```json
{
  "message": "Preset deleted successfully"
}
```

---


## Author

@Mahfujur Rahman

