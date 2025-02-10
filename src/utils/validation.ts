export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isValidPhone = (phone: string): boolean => {
    // Accepts formats like: +356 9999 9999, +3569999999, 99999999
    const phoneRegex = /^(\+356\s?)?[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };
  
  export const sanitizeInput = (input: string): string => {
    // Remove any HTML tags and trim whitespace
    return input.replace(/<[^>]*>/g, '').trim();
  };