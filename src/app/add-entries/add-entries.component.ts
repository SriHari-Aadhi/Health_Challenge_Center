// src/app/add-entries/add-entries.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-add-entries',
  standalone: true, // Mark as standalone if using Angular 17
  templateUrl: './add-entries.component.html',
  styleUrls: ['./add-entries.component.css'],
  imports: [FormsModule] // Add FormsModule to imports
})
export class AddEntriesComponent {
  username: string = '';
  workoutType: string = '';
  workoutMinutes: number | null = null;

  // Simulated file content storedd in localStorage
  constantFileKey = 'workoutDataFile';


// Function to add workout data and append to the constant file
addWorkout() {
  if (this.username && this.workoutType && this.workoutMinutes) {
    // Prepare the workout data in CSV format
    const workoutData = `${this.username},${this.workoutType},${this.workoutMinutes}`;

    // Get the existing data from the "file" (localStorage)
    let fileContent = localStorage.getItem(this.constantFileKey);

    // If the file is empty, initialize it; otherwise, append the new data
    if (fileContent) {
      // Append new data with a newline
      fileContent = workoutData + '\n' + fileContent;
    } else {
      fileContent = workoutData;
    }

    // Save the updated file content back to localStorage
    localStorage.setItem(this.constantFileKey, fileContent);

    alert("Workout data saved to constant file");

    // Reset form data
    this.username = '';
    this.workoutType = '';
    this.workoutMinutes = null;
  } else {
    alert('Please fill in all fields.');
  }
}
//   // Properties to manage visibility of sections
//   isAddSectionVisible: boolean = true; // Show Add section by default
//   isViewSectionVisible: boolean = false; // Hide View section by default

//   // Properties for user input
//   username: string = '';
//   workoutType: string = '';
//   workoutMinutes: number | null = null; // Use null to indicate no value initially

//   // Properties for view section
//   searchTerm: string = '';
//   selectedType: string = '';
//   paginatedData: any[] = []; // Replace with your actual data type
//   currentPage: number = 0; // Current page index
//   totalPages: number = 0; // Total number of pages
//   itemsPerPage: number = 5; // Default items per page

//   constructor() {}

//   // Method to show the Add section
//   showAddSection() {
//     this.isAddSectionVisible = true;
//     this.isViewSectionVisible = false;
//   }

//   // Method to show the View section
//   showViewSection() {
//     this.isAddSectionVisible = false;
//     this.isViewSectionVisible = true;
//     this.onSearch(); // Optionally call search to refresh data
//   }

//   // Method to add a workout
//   addWorkout() {
//     // Validate input
//     if (!this.username || !this.workoutType || this.workoutMinutes === null) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     // Logic to add the workout (e.g., send to a service, update a list, etc.)
//     const workoutEntry = {
//       username: this.username,
//       workoutType: this.workoutType,
//       workoutMinutes: this.workoutMinutes
//     };

//     console.log('Workout added:', workoutEntry);

//     // Reset the form fields after adding the workout
//     this.username = '';
//     this.workoutType = '';
//     this.workoutMinutes = null;
//   }

//   // Method to handle search
//   onSearch() {
//     // Implement your search logic here
//     console.log('Searching for:', this.searchTerm);
//   }

//   // Method to handle filtering
//   onFilter() {
//     // Implement your filter logic here
//     console.log('Filtering by type:', this.selectedType);
//   }

//   // Method to change page (for the view section)
//   changePage(direction: number) {
//     this.currentPage += direction;
//     // Implement pagination logic here
//   }
 }