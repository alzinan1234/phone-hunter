const loadPhones = async(searchText, dataLimit)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res .json();
    displayPhones(data.data, dataLimit);
}
const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    // display 30 phone only
    const showAll =document.getElementById('show-all');
    if(dataLimit && phones.length > 20) {
        phones = phones.slice(0, 20);
        showAll.classList.remove('d-none');

    }
    else{
        showAll.classList.add('d-none');
    }
    
    // diaplay no phone found
    const noPhone = document.getElementById('no-found-message');

    if(phones.length === 0){
        noPhone.classList.remove('d-none');

    }
    else{
        noPhone.classList.add('d-none');
    }


    // display all phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-5">
                    <img src="${phone.image}" class="card-img-top w-75" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text"></p>
                      <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                    </div>
                  </div>
        
        `;
        phonesContainer.appendChild(phoneDiv);
        
    });
    // stop spineer or loader
    toggleSpinner(false);

}

const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}


document.getElementById('btn-search').addEventListener('click',function(){
    // start loader
    processSearch(10);

})
// search input field enter
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10);

    }
})

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();

})


const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await (fetch(url));
    const data = await res.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText =phone.name;
    const phoneDetails = document.getElementById('phoneDetails');
    phoneDetails.innerHTML = `
    <img src="${phone.image}" class="card-img-top w-25" alt="...">
                    <div class="card-body">
                    <p>Release Date💖 : ${phone.releaseDate ? phone.releaseDate :'No phone.releaseDate Found'}</p> 
                    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage found'}</p>
                    <p>chipSet: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No chipSet found'}</p>
                    <p>displaySize: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No displaySize found'}</p>
                    <p>memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'No memory found'}</p>
                    
    
    `;

}

// loadPhones();
