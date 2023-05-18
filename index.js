/* // Function to perform the video search
function searchVideos() {
    var searchInput = document.getElementById('searchInput').value;
    var videoList = document.getElementById('video-list');
    videoList.innerHTML = ''; // Clear previous results

    // Use the PSE Element Library (JS API) to fetch and display the search results
    var element = document.createElement('gcse:searchresults-only');
    element.setAttribute('cx', '78f4a5b66e09130bb');
    element.setAttribute('attribute__moreOptions.searchTerms', `category:youtube.com ${searchInput}`);
    element.setAttribute('attribute__moreOptions.sortBy', '-viewCount');
    element.setAttribute('attribute__numTop', '10');
    element.setAttribute('attribute__noThumbnails', 'true'); // Disable thumbnails
    element.setAttribute('attribute__noResultsString', 'No videos found'); // Custom "No results" message

    videoList.appendChild(element);
}

// Event listener for the video preview overlay
document.getElementById('video-list').addEventListener('click', function (event) {
    var target = event.target;
    if (target.tagName === 'A') {
        var videoUrl = target.getAttribute('href');
        openVideoPreview(videoUrl);
        event.preventDefault();
    }
});

function openVideoPreview(videoUrl) {
    var videoFrame = document.getElementById('video-frame');
    videoFrame.innerHTML = `<iframe width="100%" height="100%" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
    document.getElementById('video-preview-overlay').style.display = 'block';
  }
  
  // Function to close the video preview overlay
  function closeVideoPreview() {
    var videoFrame = document.getElementById('video-frame');
    videoFrame.innerHTML = '';
    document.getElementById('video-preview-overlay').style.display = 'none';
  }
  
  // Event listener for the video preview overlay
  document.getElementById('video-list').addEventListener('click', function(event) {
    var target = event.target;
    if (target.tagName === 'A') {
      var videoUrl = target.getAttribute('href');
      openVideoPreview(videoUrl);
      event.preventDefault();
    }
  });
  
  // Event listener for the 'Visit' button in the video preview overlay
  document.getElementById('visit-button').addEventListener('click', function() {
    var videoUrl = document.getElementById('video-frame').querySelector('iframe').src;
    window.open(videoUrl, '_blank');
    closeVideoPreview();
  });
  
  // Event listener for the 'Close' button in the video preview overlay
  document.getElementById('close-button').addEventListener('click', function() {
    closeVideoPreview();
  }); */