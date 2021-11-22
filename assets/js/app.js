
const URL = 'https://fakestoreapi.com/products';


let model = {
    data: [],
    search: '',
    sort: null,
    renderList: function() {
                let s = this.search.toLowerCase().trim();

                let resultList = this.data.filter(function(item) {

                    let title = item.title.toLowerCase();
                    let description = item.description.toLowerCase();
                    return title.includes(s)||description.includes(s);
                });
                        if (this.sort != null) {
                            if (this.sort) {
                                resultList.sort((a, b) => a.price - b.price);
                            }  else {
                                resultList.sort((a, b) => b.price - a.price);
                            }
                        }
                        cardPlace.innerHTML = resultList.map(item => `
                    
                                <div class='p-2 card-group'>
                                    <div class="card shadow shadow-lg" >
                                        <img src="${item.image}" class="card-img-top p-2" alt="...">
                                        <div class="card-body">
                                            <h5 class="card-title">
                                                ${item.title}
                                            </h5>
                                            <p class="card-text">
                                                ${item.description}
                                            </p>
                                        </div>
                                        <div class="card-footer">
                                            <p class="text-end fw-bold fs-4">$${item.price}</p>
                                        </div>
                                    </div>
                                </div>
                        `).join('');
    }
}

let data = await fetch(URL);
model.data = await data.json();
model.renderList();

let searchInput = document.querySelector('#search');
    searchInput.addEventListener('input', function() {
        model.search = searchInput.value;
        model.renderList();
    });


let sortUp = document.querySelector('#sortUp');
let sortDown = document.querySelector('#sortDown');

sortUp.addEventListener('click', function() {
    model.sort = true;
    model.renderList();       
});

sortDown.addEventListener('click', function() {
    model.sort = false;
    model.renderList();           
});
 