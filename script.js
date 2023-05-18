
const apiKey = "WPu8rR6id83D4Ubtn5ehAlOURrUXQWpX_e504s0qI_k"

const formElement = document.querySelector(".form-element")
const searchInput = document.querySelector('#search-input')
const searchResults = document.querySelector('.search-results')
const showMoreBtn = document.querySelector('#show-more-btn')

let inputData = ''
let imagePage = 1

async function searchImages(){
  inputData = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${imagePage}&query=${inputData}&client_id=${apiKey}`
  console.log(url)
  
  const response = await fetch(url)
  
  const data = await response.json()

  if(imagePage === 1 ){
    searchResults.innerHTML = ''
  }

  const results = data.results;

  results.map((result1) =>{
    const imgWrapper = document.createElement('div')
    imgWrapper.classList.add('search-card-result');

    const image = document.createElement('img')
    image.src = result1.urls.small
    image.alt = result1.alt_description

    const imgLink = document.createElement('a')
    imgLink.href = result1.links.html
    imgLink.target = '_blank'
    imgLink.textContent = result1.alt_description

    imgWrapper.appendChild(image)
    imgWrapper.appendChild(imgLink)

    searchResults.appendChild(imgWrapper)
  })

  imagePage++
  
  if(imagePage  >= 1){
    showMoreBtn.style.display = 'block'
  }
}

formElement.addEventListener('submit' , (event) =>{
  event.preventDefault()
  page = 1;
  searchImages()
})

showMoreBtn.addEventListener('click' , () =>{
  searchImages()
})

