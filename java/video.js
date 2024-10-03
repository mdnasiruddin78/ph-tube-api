// creat load Categories
const loadCategories = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
};

const loadVideos = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error))
};

function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = remainingSecond /60;
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`
} 

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for(let btn of buttons){
        btn.classList.remove("active");
    }
} 

    getTimeString(4320)

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos')
    videoContainer.innerHTML = "";

    if(videos.length === 0){
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML = `
        <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
            <img src="images/icon.png"/>
            <h2 class="text-2xl font-bold">
            !!NO CONTENT HERE IN THIS CATEGORY
            </h2>
        </div>
        `;
        return;
    }else{
        videoContainer.classList.add('grid');
    }

    videos.forEach((video) => {

        const card = document.createElement('div')
        card.classList = "card card-compact";
        card.innerHTML = `
            <figure class="h-[200px] relative">
                <img
                src= ${video.thumbnail}
                class="h-full w-full object-cover rounded-xl"
                alt="Shoes" />

                ${
                    video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 text-xs text-white bg-black rounded p-1">${getTimeString(video.others.posted_date)}</span>`
                }

                
            </figure>
            <div class="py-2 flex gap-2">
               <img class="w-[40px] h-[40px] rounded-full object-cover" src="${video?.authors[0]?.profile_picture}">
               <div>
                    <h2 class="font-bold">${video?.title}</h2>
                    <div class="flex space-x-2">
                        <p class="text-gray-400">${video?.authors[0]?.profile_name}</p>
                        ${video.authors[0].verified == true ? `<img class="w-5 object-cover" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : " "}
                    </div>

               </div>
            </div>
        `
        videoContainer.append(card) 
    })
}


const loadCategoryvideos = (id) => {
    // alert(id);
        // fetch the data
        fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            // sobika active class remove koro
            removeActiveClass();
            // id class k active koro
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('active')
            displayVideos(data.category)
        })
        .catch((error) => console.log(error))
    };

/*
"category_id": "1001",
"category": "Music"
*/ 

// creat display Categories
const displayCategories = (Categories) => {

    const CategoryContainer = document.getElementById('Categories')
    // add data in html
    Categories.forEach((item) => {
        
        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = `

        <button id="btn-${item.category_id}" onclick="loadCategoryvideos(${item.category_id})" class="btn category-btn">${item.category}</button>
        `
        // add button to category container
        CategoryContainer.append(buttonContainer)

    });

};


loadCategories();
loadVideos();