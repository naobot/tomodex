// lib/db.ts
//
// Shared result type and helper for all database operations.
// Functions in lib/people.ts (and any future data-access modules) wrap their
// Prisma calls with `withDb` so they never throw — they return a typed result
// instead, letting the caller decide how to handle unavailability.

export type DbResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string }

/**
 * Wraps any async database operation. On success, returns { ok: true, data }.
 * On any error, logs to console and returns { ok: false, error }.
 *
 * The error message is intentionally kept as-is from the thrown value so that
 * callers (and the toast system) receive the original diagnostic string.
 */
export async function withDb<T>(fn: () => Promise<T>): Promise<DbResult<T>> {
  try {
    const data = await fn()
    return { ok: true, data }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("[db] operation failed:", message)
    return { ok: false, error: message }
  }
}
