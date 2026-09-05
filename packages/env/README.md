# Database Architecture and Schema Blueprint

This document serves as the comprehensive architectural reference for the core data layer of the PBC Eastgate platform. It maps out the 11 custom types (enums) and 32 models (database tables) implemented in the system's Prisma schema, organized cleanly by their functional bounded contexts and operational responsibilities.

---

## 1. Custom Types (Enums Reference)

These enumerated types enforce domain-level data integrity constraints across authentication pipelines, e-commerce workflows, financial tracking systems, and event registration loops.

| Enum Name              | Responsibility / Bounded Context                                      | Allowed Core Values                                                                                 |
| :--------------------- | :-------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| `SystemRole`           | RBAC security clearance for application entry boundaries.             | `SUPERADMIN`, `ADMIN`, `EDITOR`, `USER`                                                             |
| `MembershipStatus`     | Spiritual and organizational standing within the church.              | `GUEST`, `MEMBER`                                                                                   |
| `PostCategory`         | Contextual categorization for media and feed queries.                 | `SUNDAY_SERVICE`, `MIDWEEK_SERVICE`, `MINISTRY_EVENT`, `SCHOOL_EVENT`, `HOUSE_GROUP`, `BIBLE_STUDY` |
| `AnnouncementAudience` | Access scoping and display rules for internal notices.                | `CHURCH_WIDE`, `SCHOOL_ONLY`, `MINISTRY_SPECIFIC`                                                   |
| `EventScope`           | Structural boundaries of church gatherings.                           | `IN_HOUSE`, `MINISTRY_DEPARTMENT`, `COLLABORATION`                                                  |
| `RegistrationStatus`   | Step-by-step lifecycles of event tickets and entry nodes.             | `PENDING_PAYMENT`, `CONFIRMED`, `CANCELLED`                                                         |
| `OrderStatus`          | Procurement stages for retail fulfillment pipelines.                  | `PENDING`, `PAID`, `PROCESSING`, `SHIPPED`, `COMPLETED`, `CANCELLED`                                |
| `FulfillmentMethod`    | Logistics delivery mechanisms selected by consumers.                  | `HOME_DELIVERY`, `CHURCH_PICKUP`                                                                    |
| `FinancialPurpose`     | Liquidity pathways for cash flows to isolate core revenues.           | `TITHE`, `OFFERING`, `GENERAL_FUND_ALLOCATION`                                                      |
| `PledgeStatus`         | State engine tracking conditional commitment tracking.                | `PENDING`, `PARTIALLY_FULFILLED`, `FULFILLED`, `CANCELLED`                                          |
| `MaterialCategory`     | Categorization for tracking inventory of non-monetary physical items. | `FOOD`, `CLOTHES`, `EQUIPMENT`, `OTHER`                                                             |

---

## 2. Models and Domain Subsystems

### Identity, Access Control, and Profiles

_Responsibility: Handles primary authentication credentials, personal identifiable data (PII), strict access tokens, and administrative triggers used to process corporate status transitions (e.g., tracking milestones from Guest to official Church Member)._

- **`User`**: The central authorization hub of the entire ecosystem. Acts as the mandatory foreign key anchor for all operational activities, including orders, registrations, tracking nodes, postings, and giving streams.
- **`Profile`**: One-to-one extension of the user account containing real-world identification records such as first name, last name, phone numbers, and avatars.
- **`MembershipProgress`**: Stores evaluation metrics (e.g., Baptism completion flags, SHAPE course completion confirmations) used by administrative guards to transition an application user from `GUEST` to `MEMBER`.
- **`StaffProfile`**: Dedicated extensions identifying employee credentials, storing structured operational job descriptors and organizational business titles (e.g., Accountant, Secretary, Pastor).
- **`DeaconProfile`**: Clean relational storage tracking ordained leaders, their active statuses, exact board assignments within the Pastors and Deacons Board (PDB), and their terminal service date boundaries.

### Community & Ministry Administration

_Responsibility: Represents the structural governance structure of the organization, managing macro-ministries, structural departments, cross-relational group rosters, and administrative prayer queues._

- **`Ministry`**: Top-level strategic units within the church structure (e.g., `WORSHIP`, `NATURE`, `OUTREACH`, `CARE`, `IM_E`). Houses relational anchors linking to designated leaders and products.
- **`Department`**: Nested teams operating under a specific parent Ministry (e.g., `Media`, `Music`, `Prayer` groups under the Worship ministry). Enforces name uniqueness constraints per ministry.
- **`MinistryMember`**: Join table enforcing unique combinations to cleanly track congregational engagement within macro-ministries.
- **`DepartmentMember`**: Join table mapping specific user profiles into functional service rosters.
- **`PrayerRequest`**: System for capturing community prayer logs, managing anonymization flags, processing resolution trackers, and regulating public vs. internal visibility states.

### Content Management System (CMS)

_Responsibility: Structures media assets, chronological series data, community highlights, daily scriptures, and expiration-tracked notice boards for rendering across user interfaces._

- **`CommunityPost`**: Media-rich social feed platform tracking service recaps, event image highlights, and text captions. Leverages PostgreSQL native string arrays (`mediaUrls`) for scaling DigitalOcean Spaces image references.
- **`DailyVerse`**: Database mapping single, distinct scripture records to unique calendar dates, preventing collision errors on frontend interfaces.
- **`SermonSeries`**: Content containers for cataloging multi-part chronological message series, holding distinct graphical covers and layout details.
- **`Sermon`**: Media archive storing video playback links, audio tracks, interactive presentation slide sets (`slideUrls`), and structural resource handouts (`handoutUrls`).
- **`Announcement`**: System notice engine supporting pinned layouts, demographic audience filters, and expiration timestamps for automated UI cleanups.

### Events & Volunteer Infrastructure

_Responsibility: Governs event logistics, scheduling systems, collaborative external networking profiles, transaction-backed registration pipelines, and operational volunteer allocations._

- **`Event`**: Core event matrix holding schedules, location parameters, pricing levels, and structural ownership pointers back to ministries or departments.
- **`ExternalPartner`**: Vendor registry managing external healthcare networks, community shelters, or corresponding non-profits participating in joint collaborative events.
- **`EventRegistration`**: Transactional ledger tracing event entries. Uses composite unique indexes to prevent double-booking anomalies per user.
- **`VolunteerSignUp`**: Capacity grid matching members to active production roles (e.g., logistics, security, setup teams) during major operations.

### E-Commerce Engine

_Responsibility: Coordinates standard commercial catalog definitions, physical SKU variants, relational tracking configurations, automated purchase records, and localized fulfillment matrices._

- **`Category`**: Root product classification levels optimizing browse and navigation filters.
- **`Product`**: Commercial catalog architecture containing item baselines and flexible keys mapping custom items (e.g., camp t-shirts) directly to target events, departments, or ministries.
- **`ProductVariant`**: Keeps stock allocations distinct by generating unique SKU strings coupled to concrete size and color permutations.
- **`Order`**: Parent purchase tracking entity managing logistical totals, active delivery states, and explicit customer fulfillment options (e.g., Home Delivery vs. Church Pickup).
- **`OrderItem`**: Historical point-in-time billing ledger recording exact item configurations, pricing parameters, and quantities purchased at the time of checkout.

### Financial Ledger, Donations & Pledging

_Responsibility: Houses the platform's core accounting layer, decoupling monetary capital assets from material goods, managing pledge tracking engines, and providing idempotent infrastructure optimized for M-Pesa STK push loops._

- **`DonationCampaign`**: Named target tracking entities dedicated to tracking macro capital campaigns (e.g., Sanctuary Sound System Upgrade).
- **`Donation`**: Records actual monetary contributions explicitly routed to internal purposes (Tithe/Offering) or bound to distinct ministries, events, or school projects.
- **`MaterialDonationCampaign`**: Structural target frameworks tracking non-monetary physical asset drives (Mapped natively via `@@map("MaterialDonationCampaign")`).
- **`MaterialDonationCampaignItem`**: Tracks the individual items and quantities required for physical drives, using specified tracking metrics (e.g., 5 Pieces, 50 Kgs).
- **`MaterialDonation`**: Material entry log mapping in-kind business corporate donations (e.g., supermarket food items, hardware components) straight to events or ministries without creating zero-dollar distortions inside standard cash ledgers.
- **`Pledge`**: Relational framework managing promised future commitments. Configured to track both monetary balances and pending material asset drop-offs.
- **`PaymentTransaction`**: Gatekeeper database tracking payment confirmation payloads. Leverages Safaricom asynchronous keys (`checkoutRequestId`, `merchantRequestId`) to enable complete payment idempotency.

### Communications & Auditing

_Responsibility: Low-overhead monitoring containers tracking external application integrations, public subscription lifecycles, and outbound communications logs._

- **`EmailSubscriber`**: Minimalist opt-in ledger controlling newsletter and weekly digital bulletin distribution flags.
- **`NotificationLog`**: System audit trail logging transmission states, targets, and deliverability statuses for outbound emails or app alerts.
