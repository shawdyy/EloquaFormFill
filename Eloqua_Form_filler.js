// ==UserScript==
// @name         Eloqua Filler
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  One klick Eloqua fill
// @author       user
// @match        https://engage.3m.com/*
// @grant        none
// @updateURL
// ==/UserScript==

(function() {
    'use strict';

    class eloquaFormFill{
        constructor(){
            this.formElement = document.querySelector('form.eloquaForm');
            this.inputElements = {
                all: Array.from(this.formElement.querySelectorAll('input')).concat(Array.from(this.formElement.querySelectorAll('select'))),
                // "email" gets appended
                // "country" gets appended
                texts: []
            }
            this.userEmail = window.localStorage.elqFormFill_email;
            this.css = '#modal{\
                            display: flex;\
                            flex-wrap: wrap;\
                            justify-content: center;\
                            align-items: flex-start;\
                            z-index: 9999;\
                            margin-top: -2px;\
                            top:0;\
                            right:0;\
                            height: 80px;\
                            width: 250px;\
                            box-shadow: lightgrey -1px 2px 3px 0px;\
                            background-color: #ff5d84;\
                            color: white;\
                            font-weight: 600;\
                            position: fixed;\
                        }\
                        .modalButton{\
                            width: 45%;\
                            border: 1px solid white;\
                            border-radius: 5px;\
                            cursor: pointer;\
                            font-weight: 400;\
                            text-align: center;\
                        }\
                        .modalText{\
                            margin-top: 10px;\
                            text-align: center;\
                            display: block;\
                            width: 95%;\
                        }\
                        #errorMessage{\
                            color: red;\
                        }\
                        .hidden{\
                            display: none;\
                        }';

            this.getElements();
            this.renderModal();
        }
        get view(){
            return this.createView();
        }

        createView(){
            // creates all the relevant HTML elements which have to be rendered
            let style = document.createElement('style');
            style.innerHTML = this.css;

            let modal = document.createElement('div');
            modal.id = "modal";

            let modalText = document.createElement('span');
            {
                modalText.classList.add('modalText');
                modalText.innerText = "Eloqua Form Fill by Nils<3";
            }

            let modalButtons = [];

                modalButtons.push(document.createElement('span'));
                modalButtons.push(document.createElement('span'));
                modalButtons[0].id='fillButton';
                modalButtons[1].id='settingsButton';
                modalButtons[0].classList.add('modalButton');
                modalButtons[1].classList.add('modalButton');
                modalButtons[0].innerText = "Fill Out";
                modalButtons[1].innerText = "Settings";
                modalButtons[0].addEventListener('click',this.fillOut.bind(this));

            let errorMessage = document.createElement('span');
            errorMessage.classList.add('hidden');
            errorMessage.id = "errorMessage";
            errorMessage.innerText = "Please provide your Email.";

            modal.insertAdjacentElement('beforeend', modalText);
            modal.insertAdjacentElement('beforeend', modalButtons[0]);
            modal.insertAdjacentElement('beforeend', modalButtons[1]);
            modal.insertAdjacentElement('beforeend', errorMessage);

            return {html: modal, css: style};
        }
        
        renderModal(){
            // renders the overlay HTML Modal
            document.querySelector('head').insertAdjacentElement('beforeend', this.view.css);
            document.querySelector('body').insertAdjacentElement('afterbegin', this.view.html);
        };

        getRandomArbitrary(min, max) {
            // 50/50 boolean random
            let o = Math.round(Math.random() * (max - min) + min);
            if(o===1){
                return false;
            }
            else{
                return true;
            }
        }

        getElements(){
            //gets and sorts all the input fields of the form
            for(let i = 0;i < this.inputElements.all.length; i++){ //Cannot read property 'all' of undefined??
                if(this.inputElements.all[i].type === 'email'){
                    this.inputElements.email = this.inputElements.all[i];
                }
                else if(this.inputElements.all[i].name === 'country'){
                    this.inputElements.country = this.inputElements.all[i];
                }
                else if(this.inputElements.all[i].type ==='text'){
                    this.inputElements.texts.push(this.inputElements.all[i]);
                }
            }
        }

        fillOut(){
            // fills out the form with the relevant data
            console.log('trigger');
            for(let i = 0; i< this.inputElements.all.length; i++){
                let type = this.inputElements.all[i].type;
    
                if(type === 'text'){
                    this.inputElements.all[i].value = "ELTest";
                }
                else if(type === 'email'){
                    if (this.userEmail !== null){
                        this.inputElements.all[i].value = this.userEmail;
                        // HIER FEHLT NOCH WAS
                    }
                    else{
                        this.view.modal.errorMessage.classList.remove('hidden')
                    }
                }
                else if(type === 'select-one'){
                    if(this.inputElements.all[i].name !== 'country'){
                        let selected = this.inputElements.all[i].options[this.inputElements.all[i].options.length-1];
                        this.inputElements.all[i].value = selected.getAttribute('value');
                        let parentChildren = this.inputElements.all[i].parentElement.children;
                        for(let j = 0; j <parentChildren.length; j++){
                            if(parentChildren[j].classList.contains('MMM--fancyDropAnchor')){
                                parentChildren[j].firstChild.textContent = selected.text;
                            }
                        }
                    }
                }
                else if(type === "checkbox"){
                    this.inputElements.all[i].checked = this.getRandomArbitrary(1,2);
                }
            }
        }
    }
    let el = new eloquaFormFill();
    console.log(el);
})();
