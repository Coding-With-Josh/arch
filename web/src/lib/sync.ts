import { User } from "@/types/user";

export class SyncError extends Error {
  constructor(message: string, public code: number) {
    super(message);
  }
}

export async function syncUser(): Promise<User> {
  try {
    // Call the first route to sync user data
    const userResponse = await fetch('/api/auth/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the user sync was successful
    if (!userResponse.ok) {
      throw new SyncError(
        'Failed to sync user data',
        userResponse.status
      );
    }

    // Call the second route to sync organization data
    const orgResponse = await fetch('/api/auth/orgSync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the organization sync was successful
    if (!orgResponse.ok) {
      throw new SyncError(
        'Failed to sync organization data',
        orgResponse.status
      );
    }

    // Parse the user data from the first response
    const userData = await userResponse.json();

    // Optionally, parse the organization data from the second response
    const orgData = await orgResponse.json();

    // Combine or process the data as needed
    const combinedData: User = {
      ...userData,
      organizations: orgData.organizations || [], // Add organizations if needed
    };

    return combinedData;
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