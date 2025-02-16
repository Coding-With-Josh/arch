import { User } from "@/types/user"

export class SyncError extends Error {
  constructor(message: string, public code: number) {
    super(message)
  }
}

export async function syncUser(): Promise<User> {
  try {
    const response = await fetch('/api/auth/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new SyncError(
        'Failed to sync user', 
        response.status
      );
    }

    const data = await response.json();
    return data as User;
  } catch (error) {
    if (error instanceof SyncError) {
      throw error;
    }
    throw new SyncError(
      'Error syncing user', 
      500
    );
  }
}