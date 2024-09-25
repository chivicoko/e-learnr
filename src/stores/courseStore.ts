import { defineStore } from 'pinia';
import axios from 'axios';
import type { Course, Department } from '@/utils/types';

export const useCourseStore = defineStore('courses', {
  state: () => ({
    departments: [] as Department[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getDepartmentById: (state) => (id: string): Department | undefined => {
      return state.departments.find(department => department.id === id);
    },
    getCourseById: (state) => (departmentId: string, courseId: string): Course | undefined => {
      const department = state.departments.find(department => department.id === departmentId);
      return department?.courses.find(course => course.id === courseId);
    },
  },

  actions: {
    async getCourses(): Promise<void> {
      this.loading = true;
      this.error = null;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/departments`);

        if (res.status === 200 && Array.isArray(res.data)) {
          this.departments = res.data;
        } else {
          throw new Error('Unexpected response format from json-server');
        }
      } catch (error: any) {
        console.error('Error fetching from json-server, attempting fallback:', error);

        // Fallback to raw JSON file in the root of the project (the main purpose of this fallback is the live link)
        try {
          const fallbackRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL_LIVE}/elearncourses.json`);

          if (fallbackRes.status === 200 && Array.isArray(fallbackRes.data)) {
            this.departments = fallbackRes.data;
          } else {
            throw new Error('Unexpected response format from raw JSON file');
          }
        } catch (fallbackError: any) {
          this.error = fallbackError.message || 'Error fetching departments from both sources';
          console.error('Error fetching from raw JSON file:', fallbackError);
        }
      } finally {
        this.loading = false;
      }
    },

    async getDepartmentByIdAction(id: string): Promise<Department | undefined> {
      if (!id) {
        console.error('Department ID is required');
        return undefined;
      }

      this.loading = true;
      this.error = null;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/departments/${id}`);

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
        console.error(`Error fetching department with ID ${id} from json-server, attempting fallback:`, error);

        // Fallback to raw JSON file in project root (the main purpose of this fallback is the live link)
        try {
          const fallbackRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL_LIVE}/elearncourses.json`);
          const departments = fallbackRes.data as Department[];

          const department = departments.find(dept => dept.id === id);

          if (department) {
            const existingDepartment = this.getDepartmentById(id);
            if (!existingDepartment) {
              this.departments.push(department);
            }

            return department;
          } else {
            throw new Error(`No department found with ID ${id} in fallback file`);
          }
        } catch (fallbackError: any) {
          console.error(`Error fetching department with ID ${id} from raw JSON file:`, fallbackError);
          return undefined;
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
