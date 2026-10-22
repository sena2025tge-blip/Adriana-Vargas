# Security Specification

## 1. Data Invariants
- Users can only read their own profile.
- Instructors can read all profiles.
- Users cannot change their own role.

## 2. Dirty Dozen Payloads (Update examples)
1. Apprentice tries to update own role to 'instructor'.
2. Apprentice tries to update other apprentice profile.
3. Instructor tries to update other instructor profile (should be allowed).

## 3. Test Runner (Conceptual)
firestore.rules.test.ts would check these.
