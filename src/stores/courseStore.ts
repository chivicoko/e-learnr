import { defineStore } from 'pinia';
import axios from 'axios';
import type { Course, Department } from '@/utils/types';

// Define the course store using Pinia
export const useCourseStore = defineStore('courses', {
  state: () => ({
    departments: [] as Department[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    // Get department by ID
    getDepartmentById: (state) => (id: string): Department | undefined => {
      return state.departments.find(department => department.id === id);
    },
    // Get course by department ID and course ID
    getCourseById: (state) => (departmentId: string, courseId: string): Course | undefined => {
      const department = state.departments.find(department => department.id === departmentId);
      return department?.courses.find(course => course.id === courseId);
    },
  },

  actions: {
    // Fetch all courses
    async getCourses(): Promise<void> {
      this.loading = true;
      this.error = null;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/departments`);

        // Check for successful response and valid data format
        if (res.status === 200 && Array.isArray(res.data)) {
          this.departments = res.data;
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error: any) {
        this.error = error.message || 'Error fetching departments';
        console.error('Error fetching departments:', error);
      } finally {
        this.loading = false;
      }
    },

    // Fetch a specific department by ID
    async getDepartmentByIdAction(id: string): Promise<Department | undefined> {
      if (!id) {
        console.error('Department ID is required');
        return undefined;
      }

      this.loading = true;
      this.error = null;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/departments/${id}`);

        // Check for successful response and valid data
        if (res.status === 200 && res.data) {
          const department = res.data as Department;
          
          const existingDepartment = this.getDepartmentById(id);
          if (!existingDepartment) {
            this.departments.push(department);
          }

          return department;
        } else {
          throw new Error(`No department found with ID: ${id}`);
        }
      } catch (error: any) {
        console.error(`Error fetching department with ID ${id}:`, error);
        return undefined;
      } finally {
        this.loading = false;
      }
    },
  },
});
