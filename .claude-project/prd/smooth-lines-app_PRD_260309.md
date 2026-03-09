# smooth-lines-app — Product Requirements Document

**Version:** 1.0
**Date:** 2023-10-27
**Status:** Draft

---

## 0. Project Overview

### Product

**Name:** smooth-lines-app
**Type:** Web Application (Mobile-Responsive for Clients, Desktop-Optimized for Admin)
**Deadline:** Q1 2024
**Status:** Draft

### Description

Smooth Lines is a premium barber shop based in Phoenix, AZ, currently operating with three barbers. The `smooth-lines-app` is a custom-built booking and client management ecosystem designed to replace their current Booksy subscription. It focuses on a frictionless booking experience for clients, a robust CRM for barbers to track style preferences, and automated SMS reminders to reduce no-shows.

### Goals

1. **Reduce Overhead:** Eliminate monthly per-barber fees associated with third-party platforms like Booksy.
2. **Improve Retention:** Utilize a custom CRM to track client haircut history and preferences (e.g., "Number 2 fade on sides").
3. **Minimize No-Shows:** Implement an automated SMS notification pipeline for appointment confirmations and 24-hour reminders.

### Target Audience

| Audience | Description |
|----------|-------------|
| **Primary** | Local Phoenix residents (men and children) seeking professional grooming services. |
| **Secondary** | The 3 staff barbers at Smooth Lines who need to manage their daily schedules and client notes. |

### User Types

| Type | DB Value | Description | Key Actions |
|------|----------|-------------|-------------|
| **Client** | `0` | End-customer booking a service | Browse barbers, book appointments, manage own profile |
| **Barber** | `1` | Staff member providing services | View personal schedule, manage client CRM notes, block time |
| **Admin** | `99` | Shop Owner (Manager) | Manage shop hours, add/remove services, view shop-wide analytics |

### User Status

| Status | DB Value | Behavior |
|--------|----------|----------|
| **Active** | `0` | Full access to booking or management features. |
| **Suspended** | `1` | Client cannot book (used for repeat no-shows). |
| **Withdrawn** | `2` | Account deactivated; data anonymized after 30 days. |

### MVP Scope

**Included:**
- Real-time booking calendar for 3 barbers.
- Client CRM with haircut history and photo uploads.
- Automated SMS reminders via Twilio.
- Admin dashboard for service and price management.

**Excluded (deferred):**
- In-app point-of-sale (POS) processing (will use external terminal for now).
- Multi-location support.
- Inventory management for hair products.

---

## 1. Terminology

### Core Concepts

| Term | Definition |
|------|------------|
| **Smooth Lines** | The brand and physical barber shop entity. |
| **Appointment** | A reserved time slot for a specific service with a specific barber. |
| **Service** | A specific offering (e.g., "Classic Fade", "Beard Trim") with a set duration and price. |
| **CRM Note** | Internal barber notes regarding a client's specific hair quirks or preferred blade guards. |

### User Roles

| Role | Description |
|------|-------------|
| **Guest** | Unauthenticated user who can view availability but must register/login to confirm a booking. |
| **Client** | Authenticated user with a history of bookings. |
| **Barber** | Staff user with access to their specific calendar and client list. |
| **Admin** | Full system access, including financial overviews and staff management. |

### Status Values

| Enum | Values | Description |
|------|--------|-------------|
| **AppointmentStatus** | `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`, `NO_SHOW` | Tracks the lifecycle of a haircut booking. |
| **SMSStatus** | `SENT`, `DELIVERED`, `FAILED` | Tracks the status of the reminder notification. |

---

## 2. System Modules

### Module 1 — Booking Engine

Handles the logic of availability, ensuring no double-bookings occur across the 3 barbers.

#### Main Features

1. **Dynamic Slot Calculation** — Calculates available 30/60 min slots based on barber working hours and existing appointments.
2. **Conflict Prevention** — Locks a slot for 5 minutes while a client is in the checkout flow.
3. **Buffer Management** — Automatically adds a 5-minute "cleanup" buffer between appointments.

#### Technical Flow

##### Booking an Appointment

1. **User** selects a Barber and a Service.
2. **App** queries the backend for available slots for the selected date.
3. **Backend** checks `appointments` table and `barber_schedules` to return non-conflicting ISO strings.
4. **User** selects a time and clicks "Confirm".
5. **Backend** creates a record with status `CONFIRMED`.
6. **On success:**
   - Trigger SMS Service to send confirmation.
   - Update UI to show "Success" page.
7. **On failure:**
   - Show "Slot no longer available" and refresh calendar.

---

### Module 2 — Client CRM

A centralized database of client interactions to personalize the grooming experience.

#### Main Features

1. **Style Profile** — Stores specific technical details (e.g., "Tapered neck, #1 on sides").
2. **Visit History** — Chronological list of all past services and the barber who performed them.
3. **Contact Management** — One-click SMS or Call functionality for barbers.

#### Technical Flow

1. **Barber** opens a "Completed" appointment.
2. **Barber** enters notes into the "Style Profile" text area.
3. **Backend** updates the `client_profiles` table linked by `client_id`.
4. **On success:** Note is timestamped and visible for the client's next visit.

---

### Module 3 — SMS Notification Service

Integration with Twilio to handle automated communications.

#### Main Features

1. **Instant Confirmation** — Sent immediately upon booking.
2. **24-Hour Reminder** — Cron job triggered reminder.
3. **Cancellation Alert** — Notifies the barber if a client cancels via the app.

#### Technical Flow

1. **Cron Job** runs every hour on the Backend.
2. **Backend** identifies appointments scheduled for T+24 hours.
3. **Backend** sends payload (Phone, Message) to Twilio API.
4. **Twilio** returns a SID; Backend logs the `SMSStatus` as `SENT`.

---

## 3. User Application

### 3.1 Page Architecture

**Stack:** React, React Router, Tailwind CSS, React Query.

#### Route Groups

| Group | Access |
|-------|--------|
| Public | Landing page, Barber profiles |
| Auth | Login, Signup, Phone Verification |
| Protected | Booking flow, My Appointments, Profile Settings |

#### Page Map

**Public**
| Route | Page |
|-------|------|
| `/` | Home (Shop Info & CTA) |
| `/barbers` | Meet the Team (3 Barber Profiles) |
| `/services` | Service Menu & Pricing |

**Auth**
| Route | Page |
|-------|------|
| `/auth/login` | Login (Email or Phone) |
| `/auth/register` | Create Account |

**Protected**
| Route | Page |
|-------|------|
| `/book` | Booking Wizard (Step-by-step) |
| `/my-appointments` | Upcoming & Past Visits |
| `/profile` | Personal Info & SMS Preferences |

---

### 3.2 Feature List by Page

#### `/` — Home

- **Hero Section:** High-quality imagery of the Phoenix shop.
- **Quick Book CTA:** Direct link to the booking wizard.
- **Location/Hours:** Google Maps integration and current shop status (Open/Closed).

#### `/book` — Booking Wizard

- **Barber Selection:** Cards for the 3 barbers with their specialties.
- **Service Selection:** List of services (Fade, Beard, Full Service) with prices.
- **Date/Time Picker:** Calendar view showing only available slots.
- **Summary:** Review of barber, service, time, and price before final click.

#### `/my-appointments` — My Appointments

- **Upcoming Tab:** Shows date, time, and barber. Includes a "Cancel" button (available up to 12 hours before).
- **History Tab:** List of previous cuts.
- **Rebook Button:** One-click to book the same service/barber again.

---

## 4. Admin Dashboard

### 4.1 Page Architecture

**Access:** Barber or Admin role only.

| Route | Page |
|-------|------|
| `/admin` | Daily Schedule Overview |
| `/admin/clients` | CRM / Client List |
| `/admin/clients/:id` | Detailed Client Profile & Notes |
| `/admin/services` | Service & Price Management |
| `/admin/settings` | Shop Hours & Staff Management |

---

### 4.2 Feature List by Page

#### `/admin` — Daily Schedule Overview

- **Calendar View:** Toggle between Day/Week views.
- **Appointment Cards:** Color-coded by status (e.g., Green for Confirmed, Red for No-Show).
- **Manual Entry:** Ability for barbers to "Walk-in" a client or block time for lunch.

#### `/admin/clients` — Client Management

- **Search:** Find clients by Name or Phone Number.
- **Filters:** Filter by "Frequent Clients" or "No-Show History".
- **Export:** Download client list (CSV) for external marketing.

#### `/admin/services` — Service Management

- **CRUD Operations:** Add new services (e.g., "Holiday Special").
- **Pricing:** Update prices and durations (e.g., 30 min vs 45 min).
- **Status Toggle:** Temporarily disable a service without deleting it.

---

## 5. Tech Stack

### Architecture

The system follows a modern monorepo-style or split-repo architecture with a RESTful API.

```
smooth-lines-app/
├── backend/    ← NestJS API (Node.js)
├── frontend/   ← React (Vite) Client App
└── shared/     ← TypeScript interfaces and Enums
```

### Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Backend | NestJS | 10.x | Scalable API architecture |
| Language | TypeScript | 5.x | Type safety across stack |
| ORM | TypeORM | 0.3.x | Database mapping |
| Database | PostgreSQL | 15 | Relational data storage |
| Frontend | React | 18.x | UI Library |
| Routing | React Router | 6.x | Client-side navigation |
| State | React Query | 4.x | Server state management |
| CSS | Tailwind CSS | 3.x | Utility-first styling |
| Build | Vite | 4.x | Fast frontend bundling |

### Third-Party Integrations

| Service | Purpose |
|---------|---------|
| **Twilio** | SMS gateway for reminders and confirmations. |
| **Cloudinary** | Storage for client "haircut reference" photos in CRM. |
| **Google Maps API** | Displaying shop location and calculating travel time for clients. |

### Key Decisions

| Decision | Rationale |
|----------|-----------|
| **PostgreSQL** | Chosen over NoSQL for strict relational integrity between Barbers, Services, and Appointments. |
| **NestJS** | Provides a structured framework that makes it easy to implement Cron jobs for SMS reminders. |
| **Mobile-First React** | Most clients will book via smartphones; a responsive web app avoids App Store fees and friction. |

---

## 6. Open Questions

| # | Question | Context / Impact | Owner | Status |
|:-:|----------|-----------------|-------|--------|
| 1 | Do we require a credit card deposit? | Prevents no-shows but adds friction to booking. Needs Stripe integration if 'Yes'. | Client | ⏳ Open |
| 2 | What are the specific shop hours? | Need exact Sunday-Saturday hours to configure the Booking Engine. | Client | ⏳ Open |
| 3 | Should clients be able to upload photos? | Useful for the CRM so barbers see what the client liked last time. | PM | ⏳ Open |
| 4 | SMS Provider preference? | Twilio is standard, but alternatives like MessageBird exist. | Dev | ✅ Twilio |