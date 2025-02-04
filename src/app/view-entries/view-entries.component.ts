// src/app/view-entries/view-entries.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-view-entries',
  standalone: true, // Mark as standalone
  templateUrl: './view-entries.component.html',
  styleUrls: ['./view-entries.component.css'],
  imports: [CommonModule, FormsModule] // Add CommonModule and FormsModule to imports
})
export class ViewEntriesComponent {
  workouts: any[] = [];
  filteredWorkouts: any[] = [];
  groupedWorkouts: any[] = [];
  searchTerm: string = '';
  selectedType: string = '';
  currentPage: number = 0;
  itemsPerPage: number = 5;

  constructor() {}

  ngOnInit() {
    this.viewStoredData();
  }

  constantFileKey = 'workoutDataFile';

  // Parse the data from localStorage and convert it into an array of objects
  viewStoredData() {
    const fileContent = localStorage.getItem(this.constantFileKey);
    if (fileContent) {
      const parsedData = this.parseWorkoutData(fileContent);
      this.workouts = parsedData;
      this.filteredWorkouts = [...this.workouts]; // Initialize filteredWorkouts
      this.groupWorkouts(); // Group workouts after data is parsed
    }
  }

  // Helper function to parse CSV data
  parseWorkoutData(data: string): any[] {
    const lines = data.split('\n');
    return lines.map(line => {
      const [name, type, duration] = line.split(',').map(item => item.trim());
      return { name, type, duration: parseInt(duration, 10) };
    });
  }

  // Group workouts by name, calculate total time, and format output
  groupWorkouts() {
    const grouped = this.workouts.reduce((acc, workout) => {
      const existingPerson = acc.find((p: { name: any; }) => p.name === workout.name);
      if (existingPerson) {
        existingPerson.workouts.push(workout.type);
        existingPerson.totalDuration += workout.duration;
      } else {
        acc.push({
          name: workout.name,
          workouts: [workout.type],
          totalDuration: workout.duration
        });
      }
      return acc;
    }, []);

    this.groupedWorkouts = grouped;
    this.filteredWorkouts = [...this.groupedWorkouts];
  }



  // Search functionality
  onSearch() {
    this.currentPage = 0; // Reset to the first page when search changes
    this.filterData();
  }

  // Filter by workout type
  onFilter() {
    this.currentPage = 0; // Reset to the first page when filter changes
    this.filterData();
  }

  // Filter data by name and type
  filterData() {
    this.groupWorkouts(); // Re-group workouts after filtering
    this.filteredWorkouts = this.groupedWorkouts.filter(person => {
      const matchesSearch = person.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.selectedType ? person.workouts.some((workout: string) => workout === this.selectedType) : true;
      return matchesSearch && matchesType;
    });
  }

  // Pagination controls
  get paginatedData() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredWorkouts.slice(start, end);
  }

  // Change page
  changePage(direction: number) {
    this.currentPage += direction;
    if (this.currentPage < 0) this.currentPage = 0;
    if (this.currentPage >= this.totalPages) this.currentPage = this.totalPages - 1;
  }

  // Calculate total pages
  get totalPages() {
    return Math.ceil(this.filteredWorkouts.length / this.itemsPerPage);
  }
  // searchTerm: string = '';
  // selectedType: string = '';
  // itemsPerPage: number = 5; // Default items per page
  // currentPage: number = 0; // Current page index
  // totalPages: number = 0; // Total number of pages
  // paginatedData: any[] = []; // Replace with your actual data type
  // allData: any[] = []; // Replace with your actual data source

  // constructor() {
  //   this.allData = this.fetchData(); // Fetch or initialize your data
  //   this.updatePagination();
  // }

  // fetchData() {
  //   // Replace this with your actual data fetching logic
  //   return [
  //     { name: 'John Doe', workouts: ['Running', 'Swimming'], totalDuration: 30 },
  //     { name: 'Jane Smith', workouts: ['Yoga'], totalDuration: 60 },
  //     // Add more sample data as needed
  //   ];
  // }

  // onSearch() {
  //   this.updatePagination();
  // }

  // onFilter() {
  //   this.updatePagination();
  // }

  // changePage(direction: number) {
  //   this.currentPage += direction;
  //   this.updatePagination();
  // }

  // updatePagination() {
  //   let filteredData = this.allData.filter(person => {
  //     const matchesName = person.name.toLowerCase().includes(this.searchTerm.toLowerCase());
  //     const matchesType = this.selectedType ? person.workouts.includes(this.selectedType) : true;
  //     return matchesName && matchesType;
  //   });

  //   this.totalPages = Math.ceil(filteredData.length / this.itemsPerPage);
  //   const startIndex = this.currentPage * this.itemsPerPage;
  //   this.paginatedData = filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  // }
}