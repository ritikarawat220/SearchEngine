const myWebSearchStartingCallback = (searchEngineName, query) => {
  return query + ' music' + ' song'; // Query to search only music videos
};

window.myWebSearchStartingCallbackName = myWebSearchStartingCallback;

const createTwoPartCallback = () => {
  let musicCategoryVideos = [];

  const readyCallback = (name, query, promos, results, resultsDiv) => {
    musicCategoryVideos = [];

    for (const result of results) {
      if (result?.richSnippet?.videoobject.genre === 'Music') {
        musicCategoryVideos.push({
          genre: 'Music',
          title: result?.titleNoFormatting,
          channel: result?.richSnippet?.person.name,
          thumbnailImage: result?.thumbnailImage?.url,
          url: result?.richSnippet?.videoobject?.url,
          views: result?.richSnippet?.videoobject?.interactioncount,
          imageUrl: result?.richSnippet?.imageobject?.url,
        });
      } else {
        musicCategoryVideos.push({ genre: 'NotMusic' });
      }
    }
  };

  const renderedCallback = (name, query, promos, results) => {
    const sortedVideos = musicCategoryVideos
      .filter((video) => video.genre === 'Music')
      .sort((a, b) => b.views - a.views);

    for (let i = 0; i < results.length; i++) {
      const div = results[i];
      const parent = div.parentNode;
      parent.classList.add('parent-container');

      if (i < sortedVideos.length) {
        const video = sortedVideos[i];
        div.innerHTML = '';
        div.classList.add('result-card');

        const imageDiv = document.createElement('div');
        const imageElement = document.createElement('img');
        imageElement.src = video.thumbnailImage;
        imageElement.width = '132';
        imageElement.height = '74';
        imageDiv.classList.add('thumbnail');
        imageDiv.appendChild(imageElement);
        div.appendChild(imageDiv);

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('result-card__right-container');

        const urlAndViewDiv = document.createElement('div');
        urlAndViewDiv.classList.add('result-card__innercontainer');

        const childElementArray2 = [
          document.createElement('span'),
          document.createElement('span'),
        ];

        const flexContainer = document.createElement('div');
        const ytLogo = document.createElement('img');
        ytLogo.src = './images/youtube.png';
        ytLogo.width = '10';
        ytLogo.height = '10';
        childElementArray2[0].textContent = 'Youtube.com';
        flexContainer.appendChild(ytLogo);
        flexContainer.appendChild(childElementArray2[0]);
        flexContainer.classList.add('flex');
        childElementArray2[1].textContent = formatNumber(video.views) + ' views';

        urlAndViewDiv.appendChild(flexContainer);
        urlAndViewDiv.appendChild(childElementArray2[1]);

        const childElementArray1 = [
          document.createElement('p'),
          document.createElement('p'),
          urlAndViewDiv,
        ];

        childElementArray1[0].textContent = shortenStringLength(video.title, 40);
        childElementArray1[0].classList.add('result-card__title');
        childElementArray1[1].textContent = video.channel;
        childElementArray1[1].classList.add('result-card__subtitle');

        for (const child of childElementArray1) {
          infoDiv.appendChild(child);
        }

        div.appendChild(infoDiv);

        div.addEventListener('click', () => {
          openFullPage(video);
        });
      } else {
        parent.removeChild(div);
      }
    }

    updateNavBar();
    updateSearchOnGoogleBtn();
  };

  return { readyCallback, renderedCallback };
};

const {
  readyCallback: webResultsReadyCallback,
  renderedCallback: webResultsRenderedCallback,
} = createTwoPartCallback();

window.__gcse || (window.__gcse = {});
window.__gcse.searchCallbacks = {
  web: {
    starting: myWebSearchStartingCallback,
    ready: webResultsReadyCallback,
    rendered: webResultsRenderedCallback,
  },
};

function shortenStringLength(sentence, maxLength = 20) {
  if (sentence.length > maxLength) {
    sentence = sentence.substring(0, maxLength) + '...';
  }
  return sentence;
}

function formatNumber(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  }
  return number.toString();
}

function updateNavBar() {
  const navigationElement = document.getElementsByClassName('gsc-cursor');
  const pageNumberComponent = document.getElementsByClassName('gsc-cursor-page');
  const pageArray = Array.from(pageNumberComponent);
  const currentPageIndex = pageArray.findIndex((div) =>
    div.classList.contains('gsc-cursor-current-page')
  );

  if (navigationElement[0]) {
    if (currentPageIndex > 0) {
      const currentDiv = pageArray[currentPageIndex];
      currentDiv.classList.add('curr-navBtn');

      const previousDiv = pageArray[currentPageIndex - 1];
      previousDiv.classList.add('navBtn');
      previousDiv.textContent = 'Prev';

      const leftArrowDiv = document.createElement('div');
      const leftArrowImage = document.createElement('img');
      leftArrowImage.src = './images/left.png';
      leftArrowImage.width = '16';
      leftArrowImage.height = '16';
      leftArrowDiv.classList.add('arrowcontainer');
      leftArrowDiv.appendChild(leftArrowImage);
      leftArrowDiv.appendChild(previousDiv);
      navigationElement[0].prepend(leftArrowDiv);
    }

    const nextDiv = pageArray[currentPageIndex + 1];
    nextDiv.classList.add('navBtn');
    nextDiv.textContent = 'Next';

    const rightArrowDiv = document.createElement('div');
    const rightArrowImg = document.createElement('img');
    rightArrowImg.src = './images/right.jpg';
    rightArrowImg.width = '16';
    rightArrowImg.height = '16';
    rightArrowDiv.classList.add('arrowcontainer');
    rightArrowDiv.appendChild(nextDiv);
    rightArrowDiv.appendChild(rightArrowImg);
    navigationElement[0].appendChild(rightArrowDiv);
  }
}

function updateSearchOnGoogleBtn() {
  const googleSearchDiv = document.getElementsByClassName(
    'gcsc-find-more-on-google-query'
  );

  if (googleSearchDiv) {
    const currentText = googleSearchDiv[0].innerText;
    const substringToRemove = 'music song';
    const newText = currentText.replace(substringToRemove, '');
    googleSearchDiv[0].innerText = newText;
  }
}

function openFullPage(data) {
  const modal = document.getElementById('modalContainer');
  const thumbnailImage = document.getElementById('modalimage');
  const visitBtn = document.getElementById('visit');
  const closeBtn = document.getElementById('close');
  const viewCount = document.getElementById('viewCount');
  const title = document.getElementById('title');
  const channel = document.getElementById('channelname');

  title.textContent = shortenStringLength(data.title, 200);
  thumbnailImage.src = data.imageUrl;
  viewCount.textContent = `${formatNumber(data.views)} views`;
  channel.textContent = data.channel;

  const elementsWithRedirection = [title, channel, thumbnailImage, visitBtn];
  elementsWithRedirection.forEach((element) => {
    element.addEventListener('click', () => {
      window.location.href = data.url;
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  modal.classList.add('show');
}
