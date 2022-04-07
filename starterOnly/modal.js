
// fonction pour que la navigation du menu sois reponsive
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

// Element du DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const cruxModal = document.querySelector(".close");
const form = document.querySelector('form');
const modalBody = document.querySelector('.modal-body');
const input = document.querySelectorAll('input');
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

// ouvre la modal au click
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// fonction qui ouvre la modal
function launchModal() {
  modalbg.style.display = "block";
}

// fonoction généraliste pour ajouter tout type d'événement qui s'adapte sur tout les navigateurs

function addEvent(element, evnt, funct){
  if (element.attachEvent){
   return element.attachEvent('on'+evnt, funct);
  }
  else{
   return element.addEventListener(evnt, funct, false);
  }
};

addEvent(buttonSubmit, 'click', function(event){
  event.preventDefault();
});

// function qui ferme la modal au click sur la croix

addEvent(cruxModal, 'click', function(){
    modalbg.style.display = "none";
    for(let i = 0; i <=12; i++){
      input[i].style.border = 'none'
      input[i].value = '';
      if (input[i].checked === true){
        input[i].checked = false;
      }
      
    }


});

// fonction qui ferme la modal si on cliquer sur l'éxtérieur de la modal

addEvent(window, 'click', function(event){
    if(event.target == modalbg){
      modalbg.style.display = "none";
      for(let i = 0; i <=12; i++){
        input[i].style.border = 'none'
        input[i].value = '';
        if (input[i].checked === true){
          input[i].checked = false;
        }
      }
    }
  }
  );


// validation du formulaire, si la condition est vrai, remise à zéro des champs du formulaire

function validate() {
  if (checkCondition.checked === false){
    checkIsValid();
  }else{
    if( isDisabledSubmit() === false){
      alert('Veuillez remplir le formulaire d\'inscription');
      for(let i=0; i<=4; i++){
        if (input[i].value === ''){
          testFormulaireErreur(input[i]);
          // input[i].style.border = '2px solid #e54858';
        }
      }
    }
    else{
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
    for(let i = 0; i <=12; i++){
      input[i].style.border = 'none'
      input[i].value = '';
      input[i].checked = false;
    }
    checkCondition.checked = true;
  });
  
  prenomDisabled = false;
  nameDisabled = false;
  dateDisabled = false;
  mailDisabled = false;
  quantityDisabled = false;
  disableRadio = false;
    }

}
};

// fonction pour tester les erreurs du formulaire

function testFormulaireErreur(champsFormulaire){
    champsFormulaire.style.border = '2px solid #e54858';
    document.querySelector('#'+champsFormulaire.name).textContent = 'le '+ champsFormulaire.id + ' n\'est pas valide';

    if (champsFormulaire.id === "birthdate"){
      document.querySelector('#'+champsFormulaire.name).textContent = 'la date de naissance n\'est pas valide';
    }
};

// fonction pour tester la validation

function testFormulaireValide(champsFormulaire){
  champsFormulaire.style.border = '2px solid #279e7a';
  document.querySelector('#'+champsFormulaire.name).textContent = ' ';
};

//fonction pour stocker une REGEX

function regex(regex){
  return regex;
};

// fonction pour tester si tout les champs du formulaire sont bien remplis.

function isDisabledSubmit(){
  if (prenomDisabled === true && nameDisabled === true && dateDisabled === true && mailDisabled === true && quantityDisabled === true && disableRadio === true){
    return true;
  }else{
    return false;
  }
}
isDisabledSubmit();

// suite d'event aux input du formulaire qui teste la validité des champs souhaité par des REGEX


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
  if(regex(/[1|2]{1}[9|0]{1}[0-9]{1}[0-9]{1}[-]{1}[0-9]{2}[-]{1}[0-9]{2}/.test(e.target.value))){
    testFormulaireValide(birthdate);
    dateDisabled = true;
    isDisabledSubmit();
  } else{
    testFormulaireErreur(birthdate);
    dateDisabled = false;
    isDisabledSubmit();
  }
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

  // fait apparaitre un message d'alert si les conditions général ne sont pas cocher

    function checkIsValid(){
      
      alert('Veuillez accepté les conditions d\'utilisations');
    }

