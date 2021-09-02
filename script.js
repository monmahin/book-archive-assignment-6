const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const bookInfo = document.getElementById("book-info");

const searchResult = document.getElementById("search-result");


searchBtn.addEventListener("click", function () {
    const search = searchInput.value;
    // when empty input field 
    if (search === '') {
        alert('no result found')
    }

    const url = `https://openlibrary.org/search.json?q=${search}`;
    // clear 
    searchInput.value = ''
    bookInfo.textContent = ''
    searchResult.classList.add('d-none')


    fetch(url)
        .then((res) => res.json())
        .then((data) => showData(data.docs))

})



const showData = data => {
    // when search invalid input field
    if (data.length == 0) { return alert('wrong input') }


    searchResult.classList.remove('d-none')
    searchResult.classList.add('text-center')
    searchResult.classList.add('my-5')
    searchResult.innerHTML = `
    <h4 class="text-light  mx-auto p-2  d-inline bg-info"> seacrh-result: ${data.length}</h4>
    `



    data.forEach(bookdata => {
        // console.log(bookdata)
        // crreate booklist
        const div = document.createElement("div");
        div.classList.add("col-md-3");

        div.innerHTML = `
        <div class="rounded overflow-hidden border p-2">
                    <img 
                     src="https://covers.openlibrary.org/b/id/${bookdata.cover_i}-M.jpg"
                     class="w-100 img-thumbnail" alt="" />
                </div>
                <div class="my-3">
                    <h5>${bookdata.title}</h5>
                    
                    <p>author: <i class="text-info">${bookdata.author_name[0]}</i></p>
                     <p>publisher: <span class="text-success">${bookdata.publisher[0]}</span> </p> 
                     <p>publish date: <span class="text-danger">${bookdata.publish_date[0]}</span> </p> 
                     <hr />
                </div>
        `;

        bookInfo.appendChild(div)
    })
}
// note: publisher and publish_date doesn't exist all array element.
