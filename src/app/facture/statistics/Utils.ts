// utils.ts

export class Utils {
    static months({ count }: { count: number }): string[] {
      const currentDate = new Date();
      const labels: string[] = [];
  
      for (let i = 0; i < count; i++) {
        labels.unshift(this.getMonthName(currentDate.getMonth()));
        currentDate.setMonth(currentDate.getMonth() - 1);
      }
  
      return labels;
    }
  
    private static getMonthName(monthIndex: number): string {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
  
      return monthNames[monthIndex];
    }
  }
  