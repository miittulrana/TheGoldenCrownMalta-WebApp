const theme = {
    colors: {
      primary: '#FFA500',  // Orange
      accent: '#FFD700',   // Gold
      background: '#121212',
      surface: '#1E1E1E',
      text: '#FFFFFF',
      subtext: '#AAAAAA',
      error: '#CF6679',
      warning: '#FFB74D',
      success: '#81C784',
    },
    gradients: {
      primary: ['#FFA500', '#FFD700'], // Orange to Gold
    }
  } as const;
  
  export default theme;