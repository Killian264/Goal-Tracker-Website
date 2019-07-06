
const createGoalBtn = document.getElementById('button');
const goalCreatePopup = document.getElementById('creategoaloverlay');
const cancelBtn = document.getElementById('cancelbutton');

createGoalBtn.addEventListener('click', ()=>{
    goalCreatePopup.style.display = "block";
}, false)

cancelBtn.addEventListener('click', ()=>{
    goalCreatePopup.style.display = "none";
}, false)

const navSlide = () => {
    const navdropdown = document.querySelector('.navdropdown');
    const nav = document.querySelector('.sidenav');
    const navlinks = document.querySelectorAll('.navlinks a')

    navdropdown.addEventListener('click', ()=>{
        nav.classList.toggle('nav-active');
        navlinks.forEach((link, index)=>{
            if(link.style.animation){
                link.style.animation = '';
            }
            else{
                link.style.animation = `navLinkFade 0.5s ease forwards ${(index / 7) + .15}s`;
            }
        });

        navdropdown.classList.toggle('toggle');
    });
}
navSlide();