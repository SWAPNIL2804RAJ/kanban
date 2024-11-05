export async function fetchTicketsAndUsers() {
    try {
      const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  }
  