---
updated: "Last updated: 14 October 2026"
---

## 1. Overview

KINND is built for some of the most sensitive data a family has. This page explains, in technical detail, how the app and our internal management system protect it. For the short version, see [Safety & privacy](/safety/).

## 2. Encryption at rest

Sensitive content is encrypted before it is written to storage, using AES-256-GCM. This is authenticated encryption: it also detects if data has been tampered with.

| Data | Encryption | Key |
| --- | --- | --- |
| Photos and videos | AES-256-GCM | Its own key per file, locked with a master key |
| Messages | AES-256-GCM, field by field | A content key held by KINND, tied to each field |
| Medical information | AES-256-GCM, field by field | A content key held by KINND, tied to each field |
| Calendar, tasks, lists and child details | AES-256-GCM, field by field | A content key held by KINND, tied to each field |

Technical fields such as IDs, dates and roles are not encrypted, so the app can sort and check access. Because KINND holds the keys, this is not end-to-end encryption (see section 14).

## 3. Encryption in transit

All traffic between your device and KINND uses TLS 1.3. Browsers are told to always connect over HTTPS (HSTS).

## 4. Key management

Encryption keys are stored separately from the data they protect. A copy of the database or the stored media alone cannot be decrypted.

## 5. Sign-in and sessions

- Two-step sign-in is mandatory when you sign in with a password, and cannot be turned off.
- Signing in with a password always needs a 6-digit one-time code, sent by email or SMS. A code is valid for 10 minutes and allows 5 attempts.
- If you sign in with Google or Microsoft, their sign-in protects your account.
- Passwords are never stored in readable form. We store a bcrypt hash.
- Sessions end after 90 days without activity. If you do not choose to stay signed in, the session ends when you close the browser.

## 6. Access inside the app

- Access is given per child and per role. Each adult sees only what their relationship to the child allows.
- Access is checked in the app and again in the database.
- Parents invite the other parent and family members, and can remove a family member at any time.
- Invited family members only see what is shared with them. Medical information is visible to parents, and to other adults only if a parent gives them access.
- Deleting an account is confirmed through a link sent by email, valid for 24 hours.
- A child's data is deleted only when every parent agrees. It can be restored for 30 days, then it is permanently deleted.

## 7. Photos, videos and location

- Originals are stored encrypted, as they were uploaded, so they can be downloaded in full quality.
- Location in a photo's metadata (EXIF) is sealed with a separate key that only our management system can open. It is used only in investigations of misuse.
- Location data is removed from every copy other family members download. The person who uploaded a photo can download their own original unchanged.

## 8. Where data is stored

All data, including backups, is stored in the EU, with Hetzner in Germany. Backups are encrypted the same way as live data and kept for 90 days.

## 9. Retention and deletion

| Data | Kept for |
| --- | --- |
| Your content | Until you delete it or your account |
| Backups | 90 days |
| Technical data (IP addresses, device information, sign-in history) | 1 year, to detect and report misuse |
| A child's space after a subscription ends without payment | Hidden, then deleted 90 days after the subscription expires. Your account is kept. We give notice 90, 60 and 7 days before. |

## 10. The management system

- Our team works in a separate management system, not in the app.
- Staff sign in with multi-factor authentication, and access is role-based. Each role sees only what it needs.
- Every view of a case, an alarm or media is logged with who, what and when, and audited.

## 11. Abuse Central

Abuse Central is a complex system of triggers and patterns that watches for misuse around the clock, using technical signals. It looks for:

- Unusual sign-ins and attempts to take over an account
- Accounts created to reach a specific child
- Attempts to get access someone should not have
- Fraud on user accounts

When a trigger fires:

1. **Alarm.** Abuse Central raises a case alarm.
2. **Review.** A person on our team reviews the technical details. Every view is audited.
3. **Investigation.** If there are grounds, the case is investigated following the same protocols as the Danish authorities.
4. **Second review.** A second, senior reviewer approves before a case is reported, an account is banned or a parent's access is removed.
5. **Hand-over.** Confirmed illegal cases are handed to the police and followed until they are closed.

## 12. Working with the authorities

In a confirmed illegal case, we hand over the information the police need: account details, device information, IP addresses and the relevant media. We follow every case until it is closed. We do not hand over data without a confirmed case or a legal request.

## 13. Services we use

| Service | What for | What it receives |
| --- | --- | --- |
| Hetzner (Germany) | Hosting and storage | The stored data, encrypted as described above |
| QuickPay | Card payments | Payment details. KINND never stores full card numbers. |
| Brevo | Email and SMS | Name, email address, phone number |
| Google and Microsoft | Sign-in, if you choose it | Your sign-in with them |
| Browser push services | Notifications on your device | An encrypted notification |
| Have I Been Pwned | Checking that a new password has not leaked | The first 5 characters of a hash of the password, never the password |

## 14. What we do not do

- We do not use end-to-end encryption. This is what lets us detect abuse and help you recover your account.
- We do not show ads.
- We do not sell or share family data for marketing.
- We do not take sides in family conflicts.

## 15. Report a security issue

Found a vulnerability, or worried about an account? Write to <support@kinnd.eu>.
