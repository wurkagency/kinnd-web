---
title: "Encryption in detail"
---

## 1. What is encrypted at rest

These are encrypted with **AES-256-GCM** when they are stored:

- photos and videos
- messages
- medical information about a child

AES-256-GCM is authenticated encryption. It keeps the content unreadable without the key, and it shows if anyone has changed the stored data.

Each photo and video is encrypted with **its own key**. A key that opens one file does not open the next.

## 2. What is protected by access control

The calendar, tasks, lists, the child profile and growth data are not encrypted with AES-256-GCM in the app itself. They are protected by access control: only adults with access to that child can see them, and only what their role allows.

They travel over an encrypted connection like everything else, and they are included in the encrypted backups.

## 3. Where the keys are kept

The keys that unlock your data are kept in a separate, secured key vault, apart from the data itself.

A copy of the database or the file storage on its own is unreadable. Opening the data needs both the data and the key vault.

## 4. In transit

Everything between your device and KINND is sent over an encrypted connection with **TLS 1.3**. That covers the website, the app and every file you upload or download.

## 5. Location data in photos

We keep the original photo and video files with their embedded metadata (EXIF), so you can download them again in full quality.

The GPS position in that metadata is never shown to other users, and it is removed from the copies others download. We only use it when it is needed to investigate a specific case of misuse.

## 6. Backups

Backups are incremental and encrypted. They are kept for 90 days and stored in the EU.

## 7. Where your data lives

All data, live and in backups, is stored in the EU.

| Supplier | What they do | Where |
| --- | --- | --- |
| Hetzner | Servers, database and file storage | Germany |
| Brevo | Email and text messages | France |
| Quickpay | Card payments | Denmark |

KINND never stores card numbers. Card payments are handled by Quickpay.

## 8. What we do not claim

KINND is **not end-to-end encrypted**. Our servers have to process photos and videos, for example to make previews, so the service holds the keys in its key vault.

That is why we are strict about who can use them and when. See [Who can see what](../access/).
