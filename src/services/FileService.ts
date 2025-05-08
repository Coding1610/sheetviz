
/**
 * Service to handle file operations
 * In a real implementation, this would use Supabase for persistence
 */

import { toast } from '@/components/ui/sonner';

export interface FileData {
  id: number;
  name: string;
  uploadedDate: string;
  size: string;
  chartType: string;
  columns: string[];
  userId: string;
}

// Local storage key
const STORAGE_KEY = 'excel_viz_files';

// Get files from local storage
const getFilesFromStorage = (): FileData[] => {
  try {
    const filesJson = localStorage.getItem(STORAGE_KEY);
    return filesJson ? JSON.parse(filesJson) : [];
  } catch (error) {
    console.error('Error getting files from storage:', error);
    return [];
  }
};

// Save files to local storage
const saveFilesToStorage = (files: FileData[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
  } catch (error) {
    console.error('Error saving files to storage:', error);
    toast.error('Error saving file data');
  }
};

// Get all files for a user (or all files if userId is 'all' and caller is admin)
export const getUserFiles = (userId: string): FileData[] => {
  const allFiles = getFilesFromStorage();
  
  // Return all files if admin requesting with 'all'
  if (userId === 'all') {
    return allFiles;
  }
  
  // Return files for a specific user
  return allFiles.filter(file => file.userId === userId);
};

// Add a new file
export const addFile = (file: Omit<FileData, 'id'>): FileData => {
  const allFiles = getFilesFromStorage();
  const newId = allFiles.length > 0 ? Math.max(...allFiles.map(f => f.id)) + 1 : 1;
  
  const newFile: FileData = {
    ...file,
    id: newId
  };
  
  allFiles.push(newFile);
  saveFilesToStorage(allFiles);
  
  return newFile;
};

// Get a file by ID
export const getFileById = (fileId: number): FileData | undefined => {
  const allFiles = getFilesFromStorage();
  return allFiles.find(file => file.id === fileId);
};

// Delete a file (now supports admin deletion)
export const deleteFile = (fileId: number, userId: string): boolean => {
  try {
    const allFiles = getFilesFromStorage();
    const fileToDelete = allFiles.find(file => file.id === fileId);
    
    // Check if file exists
    if (!fileToDelete) {
      return false;
    }
    
    // Allow deletion if user owns the file or is admin
    if (fileToDelete.userId === userId || userId === 'admin') {
      const updatedFiles = allFiles.filter(file => file.id !== fileId);
      saveFilesToStorage(updatedFiles);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

// Update a file
export const updateFile = (fileId: number, updates: Partial<FileData>, userId: string): FileData | null => {
  try {
    const allFiles = getFilesFromStorage();
    
    const fileIndex = allFiles.findIndex(file => file.id === fileId);
    if (fileIndex === -1) {
      return null;
    }
    
    // Allow update if user owns the file or is admin
    if (allFiles[fileIndex].userId !== userId && userId !== 'admin') {
      return null;
    }
    
    const updatedFile = {
      ...allFiles[fileIndex],
      ...updates
    };
    
    allFiles[fileIndex] = updatedFile;
    saveFilesToStorage(allFiles);
    
    return updatedFile;
  } catch (error) {
    console.error('Error updating file:', error);
    return null;
  }
};