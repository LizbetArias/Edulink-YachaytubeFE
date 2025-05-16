export interface EducationalSeat {
  id: string;
  name: string;
  active: boolean;
  createdAt: Date;
}

// Mock API service for CRUD operations
export class EducationalSeatService {
  private static STORAGE_KEY = 'educational_seats';
  
  static getSeats(): EducationalSeat[] {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (!storedData) return [];
    return JSON.parse(storedData);
  }
  
  static getSeatById(id: string): EducationalSeat | undefined {
    const seats = this.getSeats();
    return seats.find(seat => seat.id === id);
  }
  
  static createSeat(seat: Omit<EducationalSeat, 'id' | 'createdAt'>): EducationalSeat {
    const seats = this.getSeats();
    const newSeat: EducationalSeat = {
      ...seat,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    
    const updatedSeats = [...seats, newSeat];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedSeats));
    return newSeat;
  }
  
  static updateSeat(id: string, updates: Partial<EducationalSeat>): EducationalSeat | null {
    const seats = this.getSeats();
    const seatIndex = seats.findIndex(seat => seat.id === id);
    
    if (seatIndex === -1) return null;
    
    const updatedSeat = {
      ...seats[seatIndex],
      ...updates
    };
    
    seats[seatIndex] = updatedSeat;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(seats));
    return updatedSeat;
  }
  
  static deleteSeat(id: string): boolean {
    const seats = this.getSeats();
    const filteredSeats = seats.filter(seat => seat.id !== id);
    
    if (filteredSeats.length === seats.length) return false;
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredSeats));
    return true;
  }
}