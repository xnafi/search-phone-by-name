const loadPhoneData = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  const res = await fetch(url);
  const data = await res.json();
  getPhoneData(data.data)
}
function searchBtn() {
  toggleSpinner(true)
  const searchField = document.getElementById('searchField')
  const searchValue = searchField.value;
  loadPhoneData(searchValue);
  searchField.value = ''
}
getPhoneData = (data) => {
  console.log(data);
  const phoneContainer = document.getElementById('phone-container')
  const viewMore = document.getElementById('view-more')
  phoneContainer.textContent = '';
  if (data.length > 10) {
    toggleSpinner(false)
    data = data.slice(0, 10)
    viewMore.classList.remove('d-none');
  } else {
    viewMore.classList.remove('d-none');
  }
  data.forEach(ele => {
    const childDiv = document.createElement('div');
    childDiv.innerHTML = `
        <div class="col">
          <div class="card">
            <img src="${ele.image}" class="card-img-top img-thumbnail" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${ele.phone_name}</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <button
              onclick="modalBtn('${ele.slug}')"
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Detail
            </button>
                
                
               
                
            </div>
          </div>
        </div>
        
        `
    phoneContainer.appendChild(childDiv)
  })
}
const modalBtn = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(url);
  const data = await res.json();
  getModalData(data.data)
}
const getModalData = (data) => {
  console.log(data);
  const parentDiv = document.getElementById('modal-body')
  parentDiv.textContent = '';
  const createDiv = document.createElement('div')
  createDiv.classList.add('modal-header')
  const childDiv = document.createElement('div')
  childDiv.innerHTML = `
  <div class="modal-content">
  <div  class="modal-header">
    <h5 class="modal-title" id="staticBackdropLabel">${data.name}</h5>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="modal"
      aria-label="Close"
    ></button>
  </div>
  <div class="modal-body">
   <h3>name : ${data.releaseDate}</h3>
  </div>
  <div class="modal-footer">
    <button
      type="button"
      class="btn btn-secondary"
      data-bs-dismiss="modal"
    >
      Close
    </button>
    <button type="button" class="btn btn-primary">Understood</button>
  </div>
</div>
  
   
    

  `
  parentDiv.appendChild(childDiv)




  parentDiv.appendChild(createDiv)
}
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('spin');
  if (isLoading) {
    loaderSection.classList.remove('d-none')
  }
  else {
    loaderSection.classList.add('d-none');
  }
}
document.getElementById('searchField').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    searchBtn(10)
  }
})