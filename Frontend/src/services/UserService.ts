
/**
 * Service to handle user operations
 * In a real implementation, this would use Clerk's API for management
 */

import { toast } from '@/components/ui/sonner';

export interface UserData {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  role: 'admin' | 'user';
  createdAt: string;
}

// Local storage key
const STORAGE_KEY = 'excel_viz_users';

// Get users from local storage
const getUsersFromStorage = (): UserData[] => {
  try {
    const usersJson = localStorage.getItem(STORAGE_KEY);
    if (usersJson) {
      return JSON.parse(usersJson);
    }
    
    // If no users exist yet, create some sample data
    const sampleUsers: UserData[] = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        imageUrl: '',
        role: 'admin',
        createdAt: new Date().toISOString().split('T')[0]
      },
      {
        id: '2',
        name: 'Regular User',
        email: 'user@example.com',
        imageUrl: '',
        role: 'user',
        createdAt: new Date().toISOString().split('T')[0]
      }
    ];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleUsers));
    return sampleUsers;
  } catch (error) {
    console.error('Error getting users from storage:', error);
    return [];
  }
};

// Save users to local storage
const saveUsersToStorage = (users: UserData[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to storage:', error);
    toast.error('Error saving user data');
  }
};

// Get all users
export const getAllUsers = async (): Promise<UserData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = getUsersFromStorage();
      resolve(users);
    }, 500); // Simulate API delay
  });
};

// Get a user by ID
export const getUserById = (userId: string): UserData | undefined => {
  const allUsers = getUsersFromStorage();
  return allUsers.find(user => user.id === userId);
};

// Check if user is an admin
export const isUserAdmin = (userId: string): boolean => {
  const user = getUserById(userId);
  return user?.role === 'admin';
};

// Create or update a user
export const createOrUpdateUser = (userData: Partial<UserData> & { id: string }): UserData => {
  const allUsers = getUsersFromStorage();
  const existingUserIndex = allUsers.findIndex(user => user.id === userData.id);
  
  if (existingUserIndex >= 0) {
    // Update existing user
    const updatedUser = {
      ...allUsers[existingUserIndex],
      ...userData
    };
    
    allUsers[existingUserIndex] = updatedUser;
    saveUsersToStorage(allUsers);
    
    return updatedUser;
  } else {
    // Create new user with default role as 'user'
    const newUser: UserData = {
      id: userData.id,
      name: userData.name || 'Unknown User',
      email: userData.email || '',
      imageUrl: userData.imageUrl || '',
      role: userData.role || 'user',
      createdAt: userData.createdAt || new Date().toISOString().split('T')[0]
    };
    
    allUsers.push(newUser);
    saveUsersToStorage(allUsers);
    
    return newUser;
  }
};

// Delete a user
export const deleteUser = async (userId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const allUsers = getUsersFromStorage();
        
        // Prevent deleting admin users
        const userToDelete = allUsers.find(user => user.id === userId);
        if (!userToDelete || userToDelete.role === 'admin') {
          resolve(false);
          return;
        }
        
        const updatedUsers = allUsers.filter(user => user.id !== userId);
        saveUsersToStorage(updatedUsers);
        
        resolve(true);
      } catch (error) {
        console.error('Error deleting user:', error);
        resolve(false);
      }
    }, 500); // Simulate API delay
  });
};

// Set user role
export const setUserRole = async (userId: string, role: 'admin' | 'user'): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const allUsers = getUsersFromStorage();
        const userIndex = allUsers.findIndex(user => user.id === userId);
        
        if (userIndex === -1) {
          resolve(false);
          return;
        }
        
        allUsers[userIndex].role = role;
        saveUsersToStorage(allUsers);
        
        resolve(true);
      } catch (error) {
        console.error('Error setting user role:', error);
        resolve(false);
      }
    }, 500);
  });
};