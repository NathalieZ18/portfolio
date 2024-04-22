document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
  
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        const index = Array.from(thumbnails).indexOf(thumbnail);
        openLightbox(index);
      });
    });
  
    function openLightbox(index) {
      // Clear existing content
      lightboxContent.innerHTML = '';
  
      // Load images and GIFs for the project
      const images = [
        'images/project1/image1.jpg',
        'images/project1/image2.jpg',
        'images/project1/image3.gif',
        'images/project1/image3.mp4'
        // Add more images and GIFs as needed
      ];
  
      // Create img elements for each image/GIF
      images.forEach((imageUrl, i) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Image ${i + 1}`;
        lightboxContent.appendChild(img);
      });
  
      // Show lightbox
      lightbox.style.display = 'block';
    }

    // Adjust modal size based on image aspect ratio
function adjustModalSize() {
    const modalImg = document.getElementById("modalImg");
    const aspectRatio = modalImg.naturalWidth / modalImg.naturalHeight;
    const maxWidth = window.innerWidth * 0.6; // Set maximum width to 60% of window width
    const maxHeight = window.innerHeight * 0.6; // Set maximum height to 60% of window height
    let modalWidth, modalHeight;
  
    if (aspectRatio > 1) { // Landscape orientation
      modalWidth = Math.min(maxWidth, modalImg.naturalWidth);
      modalHeight = modalWidth / aspectRatio;
    } else { // Portrait or square orientation
      modalHeight = Math.min(maxHeight, modalImg.naturalHeight);
      modalWidth = modalHeight * aspectRatio;
    }
  
    // Set modal content size and center it
    modalImg.style.width = modalWidth + 'px';
    modalImg.style.height = modalHeight + 'px';
    modalImg.style.left = `calc(50% - ${modalWidth / 2}px)`; // Center horizontally
    modalImg.style.top = `calc(50% - ${modalHeight / 2}px)`; // Center vertically
  }
  
  
    document.querySelector('.close-btn').addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
  });

  // Open the modal with the selected media
function openModal(thumbnailIndex) {
    const modal = document.getElementById("myModal");
    const mediaContainer = document.getElementById("mediaContainer");
    currentThumbnailIndex = thumbnailIndex; // Set current thumbnail index
    slideIndex = 0; // Reset slide index when opening modal
  
    // Load media for the selected thumbnail
    const media = imageSets[thumbnailIndex];
  
    // If there are media, display the first one in the slideshow
    if (media && media.length > 0) {
      const firstMedia = media[0];
      if (firstMedia.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = 'videos/' + firstMedia;
        video.autoplay = false; // Autoplay the video
        video.muted = true; // Mute the video
        video.controls = false; // Hide browser controls (we'll add custom controls)
        mediaContainer.innerHTML = ''; // Clear existing content
        mediaContainer.appendChild(video);
        videoElement = video; // Save reference to the video element
        updateVideoTime(); // Update initial video time
        video.addEventListener('timeupdate', updateVideoTime); // Update time on time update
        modal.querySelector(".modal-content").classList.add("show-controls"); // Show video controls
        playPauseButton = document.getElementById('playPauseButton'); // Save reference to play/pause button
      } else {
        const img = document.createElement('img');
        img.src = 'img/' + firstMedia;
        mediaContainer.innerHTML = ''; // Clear existing content
        mediaContainer.appendChild(img);
        modal.querySelector(".modal-content").classList.remove("show-controls"); // Hide video controls for images
      }
  
      modal.style.display = "flex";
      modal.style.alignItems = "center";
    }
  }
  
  // Close the modal
  function closeModal() {
    const modal = document.getElementById("myModal");
    const mediaContainer = document.getElementById("mediaContainer");
  
    // Remove event listener if video element exists
    if (videoElement) {
      videoElement.removeEventListener('timeupdate', updateVideoTime);
    }
  
    mediaContainer.innerHTML = ''; // Clear media container
    modal.style.display = "none";
  }
  