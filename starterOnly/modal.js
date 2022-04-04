function editNav() {
  var x = document.getElementById("myTopnav");
  let logo = document.querySelector('.header-logo');
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
    logo.style.display = "block";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const cruxModal = document.querySelector(".close");
const form = document.querySelector('form');
const modalBody = document.querySelector('.modal-body');
const input = document.querySelectorAll('input');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form 

function addEvent(element, evnt, funct){
  if (element.attachEvent){
   return element.attachEvent('on'+evnt, funct);
  }
  else{
   return element.addEventListener(evnt, funct, false);
  }
};


addEvent(cruxModal, 'click', function(){
    modalbg.style.display = "none";
    for(let i = 0; i <=12; i++){
      input[i].style.border = 'none'
      input[i].value = '';
      input[i].checked = false;
    }
    // window.location.reload();

});

addEvent(window, 'click', function(event){
    if(event.target == modalbg){
      modalbg.style.display = "none";
      for(let i = 0; i <=12; i++){
        input[i].style.border = 'none'
        input[i].value = '';
        input[i].checked = false;
      }
      // window.location.reload();
    }
  }
  );


// cruxModal.onclick = function() {
//   modalbg.style.display = "none";
// }

// cruxModal.addEventListener('click', function(){
//   modalbg.style.display = "none";
// })


// window.onclick = function(event) {
//   if (event.target == modalbg) {
//     modalbg.style.display = "none";
//   }
// }

function validate() {
  if (checkCondition.checked === false){
    checkIsValid();
  }else{
  form.style.visibility = "hidden";
  form.style.display = 'none';
  modalBody.classList.add('formulaireEnvoie');
  const newDiv = document.createElement('div');
  const newButton = document.createElement('button');
  newDiv.innerHTML ='<p id="merci">Merci pour <br> votre inscription</p>';
  newButton.textContent = 'Fermer';
  modalBody.appendChild(newDiv);
  newDiv.appendChild(newButton);
  modalBody.prepend(newDiv);
  document.querySelector('.formulaireEnvoie button').classList.add('btn-submit');
  document.querySelector('.formulaireEnvoie button').setAttribute('id', 'buttonFermetureModal');
  const fermetureButton = document.querySelector('#buttonFermetureModal');
  addEvent(fermetureButton, 'click', function(){
    modalbg.style.display = "none";
    form.style.visibility = 'visible';
    form.style.display = 'block';
    newDiv.remove();
    newButton.remove();
    // form.reset();
    for(let i = 0; i <=12; i++){
      input[i].style.border = 'none'
      input[i].value = '';
      input[i].checked = false;
    }
    // window.location.reload();
  });
}
};

const prenom = document.querySelector('#Prénom');
const nom = document.querySelector('#nom');
const mail = document.querySelector('#mail');
const birthdate = document.querySelector('#birthdate');
const quantity = document.querySelector('#quantity');
const value = document.getElementsByName('location');
const buttonSubmit = document.querySelector('.btn-submit');
const checkCondition = document.getElementById('checkbox1')
let prenomDisabled = false;
let nameDisabled = false;
let dateDisabled = false;
let mailDisabled = false;
let quantityDisabled = false;
let disableRadio = false;


function testFormulaireErreur(champsFormulaire){
    champsFormulaire.style.border = '2px solid #e54858';
    document.querySelector('#'+champsFormulaire.name).textContent = 'le '+ champsFormulaire.id + ' n\'est pas valide';

    if (champsFormulaire.id === "birthdate"){
      document.querySelector('#'+champsFormulaire.name).textContent = 'la date de naissance n\'est pas valide';
    }
};

function testFormulaireValide(champsFormulaire){
  champsFormulaire.style.border = '2px solid green';
  document.querySelector('#'+champsFormulaire.name).textContent = ' ';
};



function regex(regex){
  return regex;
};

function isDisabledSubmit(){
  if (prenomDisabled === true && nameDisabled === true && dateDisabled === true && mailDisabled === true && quantityDisabled === true && disableRadio === true){
    buttonSubmit.removeAttribute('disabled');
  }else{
    buttonSubmit.setAttribute('disabled', 'false');
  }
}
isDisabledSubmit();

addEvent(prenom, 'input', function(e){
  if(regex(/[a-zA-Z]{2}/.test(e.target.value))){
    testFormulaireValide(prenom);
    prenomDisabled = true;
   isDisabledSubmit();
  } else{
    testFormulaireErreur(prenom);
    prenomDisabled = false;
    isDisabledSubmit();
  }
  
});

addEvent(nom, 'input', function(e){
  if(regex(/[a-zA-Z]{2}/.test(e.target.value))){
    testFormulaireValide(nom);
    nameDisabled = true;
    isDisabledSubmit();
  } else{
    testFormulaireErreur(nom);
    nameDisabled = false;
    isDisabledSubmit();
  }
});

addEvent(mail, 'input', function(e){
  if(regex(/[a-zA-Z0-9.]+@[a-zA-Z]{2,}\.[a-z]{2,}/.test(e.target.value))){
    testFormulaireValide(mail);
    mailDisabled = true;
    isDisabledSubmit();
  } else{
    testFormulaireErreur(mail);
    mailDisabled = false;
    isDisabledSubmit();
  }
});

addEvent(birthdate, 'input', function(e){
  if(regex(/[1]{1}[9]{1}[0-9]{1}[0-9]{1}[-]{1}[0-9]{2}[-]{1}[0-9]{2}/.test(e.target.value)) || regex(/[2]{1}[0]{1}[0-9]{1}[0-9]{1}[-]{1}[0-9]{2}[-]{1}[0-9]{2}/.test(e.target.value))){
    testFormulaireValide(birthdate);
    dateDisabled = true;
    isDisabledSubmit();
  } else{
    testFormulaireErreur(birthdate);
    dateDisabled = false;
    isDisabledSubmit();
  }
  console.log(e.target.value)
});

addEvent(quantity, 'input', function(e){
  if(regex(/[0-9]/.test(e.target.value))){
    testFormulaireValide(quantity);
    quantityDisabled = true;
    isDisabledSubmit();
  } else{
    testFormulaireErreur(quantity);
    quantityDisabled = false;
    isDisabledSubmit();
  }
});

for(let i=0; i<=5; i++){
  addEvent(value[i], 'click', function(){
    for(let i=0; i<=5; i++){
      if (value[i].checked === true) {
      disableRadio = true;
      isDisabledSubmit();
    }else{
      isDisabledSubmit();
    }
  }})};


  // buttonSubmit.addEventListener('click', function(e){
  //   if (checkCondition.checked === false){
    function checkIsValid(){
      
      alert('Veuillez accepté les conditions d\'utilisations');
    }
  //   }
  // })


