// Variables

const car = document.querySelector('#carrito');
const containerCart = document.querySelector('#lista-carrito tbody');
const emptyCarBtn = document.querySelector('#vaciar-carrito');
const listCourses = document.querySelector('#lista-cursos');
let articlesCart = [];

loadEventListeners();
function loadEventListeners() {
    // When add a course pressing "Add the car"
    listCourses.addEventListener('click', addCourse);

    // Eliminate courses of the cart
    car.addEventListener('click', eliminateCourse);

    // Show the courses of the Local Storage
    document.addEventListener('DOMContentLoaded',() => {
        articlesCart = JSON.parse( localStorage.getItem('cart')) || [];
        cartHTML();
    });

    // Empty the cart
    emptyCarBtn.addEventListener('click', ()=>{
        console.log('Empty the cart...');
        articlesCart = []; // Reset the array

        cleanerHTML();  // Eliminate all the HTML
    });
};

// Functions
function addCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const courseSelected = e.target.parentElement.parentElement;

        readDataCourse(courseSelected);
    };
    
};

//Eliminate course of cart 
function eliminateCourse(e){
    
    if(e.target.classList.contains('borrar-curso')){
        const courseID = e.target.getAttribute('data-id');
        
        // Eliminate of the array of ArticlesCart for the data-id
        articlesCart = articlesCart.filter(course => course.id !== courseID);
        console.log(articlesCart);

        cartHTML(); // Iterate over cart and display its HTML
    };
};

// Read the content of the HTML that we clicking and extract the infomation of course

function readDataCourse(course) {
    console.log(course);

    // Creating an object with the content of actual course
    const infoCourse = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        id: course.querySelector('a').getAttribute('data-id'),
        amount: 1,
    };

    // Check if a element exist in the cart
    const exist = articlesCart.some(course => course.id === infoCourse.id);
    if (exist) {
        // Update the amount 
        const courses = articlesCart.map(course => {
            if (course.id === infoCourse.id) {
                course.amount++
                return course;  // return the update object 
            }else{
                return course;  // return the object that no is the duplicated
            }
        });
        articlesCart = [...courses];
    } else {
        // Our Add the course to the cart  
        articlesCart = [...articlesCart, infoCourse];

    };


    console.log(articlesCart);

    cartHTML();
};


// Showing the cart of shopping in the HTML
function cartHTML() {
    // Cleaner the HTML

    cleanerHTML();
    // Travel the cart and generate the HTML

    articlesCart.forEach(course => {
        const { image, title, price, amount, id } = course;              // Destructuring
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${image}" width="100"> 
        </td>
        <td>${title}</td>
        <td>${price}</td>
        <td>${amount}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        // Add the HTML of cart in the tbody
        containerCart.appendChild(row);
    })

    // Add the shopping cart to the storage
    synchronizeStorage();
};

function synchronizeStorage(){
    localStorage.setItem('cart', JSON.stringify(articlesCart));
};

// Eliminate the courses of tbody
function cleanerHTML() {
    // Slow form
    // containerCart.innerHTML = '';
    while (containerCart.firstChild) {
        containerCart.removeChild(containerCart.firstChild);
    };
};






