const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const indics = document.querySelectorAll('.indicator');

const images = document.querySelectorAll('.carousel img');

let currentIndex = 0;

let autoScroll;

function actuel(ajout){
    if(ajout === true){
        currentIndex = (currentIndex + 1) % images.length;
    }
    else{
        currentIndex = (currentIndex - 1+ images.length) % images.length;
            if (currentIndex < 0){
                /*currentIndex += images.length; deux possibilité différente*/
                currentIndex = images.length - 1;
            }
    }
    imageAffichage(currentIndex);
}

function indicateur(e = null){
    if (e !== null && e.currentTarget.classList.contains('indicator')){
        currentIndex = parseInt(e.target.dataset.index); /*parseint pour convertir une string en number,dataset récupère l'attribut data-index*/
        imageAffichage(currentIndex);
    }
    let active = document.querySelector('.indicator.active');
    active.classList.remove('active');
    let newActive = document.querySelector(`.indicator[data-index="${currentIndex}"]`);
    newActive.classList.add('active');
}


function imageAffichage(index){
    let active = document.querySelector('.carousel .active');
    active.style.transition = 'opacity 0.5s ease-in-out';
    active.style.opacity = '0';
    active.classList.remove('active');

    images[index].classList.add('active');
    images[index].style.transition = 'opacity 0.5s ease-in-out';
    images[index].style.opacity = '1';
    indicateur();
    clearInterval(autoScroll);
    autoScroll = setInterval(() => actuel(true), 3000);

}

nextButton.addEventListener('click',() => actuel(true));

prevButton.addEventListener('click',() => actuel(false));

indics.forEach((indic) => {
    indic.addEventListener('click', (e) => indicateur(e));
})

/*indic.addEventListener('click', (e) =>{
    if(e.currentTarget.classList.contains('indicator')){
        currentIndex = parseInt(e.target.dataset.index); /*parseint pour convertir une string en number,dataset récupère l'attribut data-index
        imageAffichage(currentIndex);
    }
})*/


autoScroll = setInterval(() => actuel(true), 3000);


//Modal JS

const modal = document.querySelector('.modal');
const openModal = document.querySelector('.openModal');
const closeModal = document.querySelector('.close');

const carousel = document.querySelector('.container');
const containerModal = document.querySelector('.modal .containerModal');
const orignalWrapper = document.querySelector('#carousel-original-wrapper');

openModal.addEventListener('click', () => {

    containerModal.appendChild(carousel);

    modal.classList.add('active');
    document.body.classList.add('openModal');
});

closeModal.addEventListener('click', () => {
    orignalWrapper.appendChild(carousel);

    modal.classList.remove('active');
    document.body.classList.remove('openModal');
});