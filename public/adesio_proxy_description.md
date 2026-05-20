# Adesio Sync: Product Data at Scale

Adesio Sync acts as an intelligent middleware layer, a single source of truth, that leverages AI to frictionlessly ingest messy legacy data, enrich it via automated datasheet parsing, and seamlessly syndicate it to all major global electronics ecosystem partners simultaneously.

Additionally, the platform includes an interactive **Global Network Map** visualization of the manufacturer's data flowing out into the ecosystem. It visually demonstrates the architecture—showing raw ingestion on one side, AI processing in the middle, and multi-channel syndication (APIs, EDI, WeChat) on the outbound side.

---

## The Challenge: Data Fragmentation

The electronics and hardware supply chain suffers from extreme data fragmentation. Component manufacturers possess the raw data (specifications, lifecycle status, pricing, inventory), but distributing this data to a myriad of distributors, search engines, and data partners (like Octopart, SiliconExpert, Avnet, DigiKey) is a manual, error-prone, and chaotic process.

Legacy ERP systems output messy `.csv`, `.tsv`, or antiquated EDI/XML formats that lack modern parametric standardizations, causing friction at every step of the syndication process. **Adesio Sync** exists to bridge this gap.

---

## Who is it for?

Adesio Sync is built for **Electronic Component Manufacturers**, specifically Supplier Admins, Data Managers, and Catalog Operations Teams.

These are the organizations that actually produce the hardware components and need a unified way to push their catalog updates out to the global market without manually managing dozens of separate partner portals and API schemas.

---

## How It Works: The Manufacturer's Playbook

Manufacturers use Adesio Sync as the central nervous system for their product catalog:

1. **Ingest Legacy Data**: Upload messy exports directly from legacy ERPs, or connect via API.
2. **Automated AI Mapping**: The platform automatically maps raw, inconsistent columns to standardized industry schemas, validating constraints instantly.
3. **Adesio Assist**: AI Enrichment for parts missing data, users upload (or link to) PDF datasheets. The AI automatically parses tables and text to extract missing parametric specs (Operating Temp, Package Type, RoHS compliance, etc.).
4. **Global Syndication**: With the click of a button, push clean, enriched catalogs out to all selected syndication partners via LiveSync APIs.
5. **Monitor & Track**: Use the Telemetry dashboard to monitor how often components are being searched and queried globally, billing usage through automated event tracking.

---

## 🤝 The Multiplier Effect: Benefits for Data Partners

While the manufacturers are the primary users, downstream data partners (Octopart, SiliconExpert, Avnet, etc.) reap massive ecosystem benefits:

- **Clean, Standardized Data**: Partners no longer have to build custom ingestion pipelines for every manufacturer's bespoke, broken CSV. They receive guaranteed, perfectly validated JSON payloads matching their exact requirements.
- **Real-Time Accuracy**: Because Adesio Sync uses LiveSync APIs, partners have real-time access to stock, pricing, and lifecycle changes rather than relying on delayed weekly FTP dumps.
- **Richer Catalogs**: Because Adesio Assist extracts deep parametric data from PDFs, partners can offer their end-users significantly better search and filtering experiences.

---

## 🧩 Detailed Functions and Platform Modules

### 1. 📊 Syndication Dashboard
A high-level command center showing overall catalog health, API sync status, and recent activity logs. It highlights the completeness of the Master Catalog of Parts (MCP) and flags synchronization warnings.

### 2. 🧠 AI Ingestion Engine
The entry point for messy data. It accepts legacy file formats and utilizes an AI Standards Inspector to cross-reference data against the specific requirements of chosen syndication partners. It dynamically auto-maps headers, extracts specs from stringified columns, and flags critical violations (like missing URLs) with one-click "AI Smart Resolutions."

### 3. ✨ Adesio Assist
An AI-driven extraction queue that identifies components missing critical parameters. Users can initiate a bulk extraction process that fetches datasheet URLs, runs OCR and Vision models, and uses LLMs to extract exact parametric specs (e.g., Core Type, Voltage, Package) directly into the MCP.

### 4. 🗄️ Catalog Manager
The central database view (Master Catalog of Parts). It offers a high-density, Bloomberg-style datagrid for managing thousands of SKUs. Users can filter by lifecycle, stock, or missing data, and make inline edits to ensure data integrity before syndication.

### 5. 🌐 Global Network Map
An interactive visualization showcasing real-time data flows from raw ingestion, through AI processing, and out to global downstream syndication endpoints.

### 6. 📈 Telemetry & Billing
A dual-sided analytics engine. It tracks internal user activity via PostHog (file uploads, edits) and monitors inbound/outbound partner API calls via Google Analytics. It visualizes geographic intent data (where components are being searched globally) and calculates dynamic monthly billing based on exact event volumes.

### 7. 👤 User Details
A profile administration portal showing operator info, APAC region gate details, and catalog API authority credentials.

It consists of three core functional tabs:

#### 👤 User Profile Details
Maintains operator metadata, assigned regional cloud gateways (such as Alibaba APAC), and active API authority scopes.

#### 🛡️ Role-Based Access Control (RBAC)
A secure permissions checklist granting or restricting operational authority (e.g., catalog writes, AI enrichment triggers) per user role.

#### 🔒 Security Best Practices
Integration compliance status covering SHA256 signature verification, WeChat IAM mappings, and HTTPS-only enforce protocols.

### 8. ⚡ LiveSync Settings
The routing matrix for outbound data. Users configure their live API endpoints, legacy SFTP connections, and webhook payloads for their downstream partners. It ensures that when a price changes in Adesio, it is instantly reflected on Octopart or DigiKey.

### 9. 💬 WeChat Integration (Omnichannel)
A dedicated module built for the APAC market. It provides Identity & Access Management (IAM) and an interactive simulator to visualize to the user how syndicated component data will render inside a WeChat Mini-Program for localized buyers.