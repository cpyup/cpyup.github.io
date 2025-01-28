// Class to manage background changes
class BackgroundManager {
  constructor() {
      // Set initial background
      this.changeBackground('images/backgrounds/yuuClockBG1NoLogo.png');
  }

  // Method to change the background image
  changeBackground(imagePath) {
      document.body.style.backgroundImage = `url('${imagePath}')`;
      document.body.style.backgroundSize = 'cover'; // Ensures the background covers the entire screen
      document.body.style.backgroundRepeat = 'no-repeat'; // Prevents repeating the background image
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Instantiate the BackgroundManager class
  const backgroundManager = new BackgroundManager();

  // Attach functionality to buttons
  const bg1Button = document.querySelector('.bgButton1');
  const bg2Button = document.querySelector('.bgButton2');

  if (bg1Button) {
      bg1Button.addEventListener('click', () => {
          backgroundManager.changeBackground('images/backgrounds/yuuClockBG1NoLogo.png');
      });
  }

  if (bg2Button) {
      bg2Button.addEventListener('click', () => {
          backgroundManager.changeBackground('images/backgrounds/yuuClockBG2NoLogo.jpg');
      });
  }
});

