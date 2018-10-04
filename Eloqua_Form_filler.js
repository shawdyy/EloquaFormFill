function getRandomArbitrary(min, max) {
  let o = Math.round(Math.random() * (max - min) + min);
  if(o===1){
  	return false;
  }
  else{
  	return true;
  }
}

function fillOut(){
	let form = document.querySelector('form.eloquaForm');
	let inputs = Array.from(form.querySelectorAll('input'));
	inputs = inputs.concat(Array.from(form.querySelectorAll('select')));

	for(let i = 0; i< inputs.length; i++){
		let type = inputs[i].type;
		if(type === 'text'){
			inputs[i].value = "ELTest";
		}
		else if(type === 'email'){
			inputs[i].value = "ElTest@eron.de"
		}
		else if(type === 'select-one'){
			let selected = inputs[i].options[inputs[i].options.length-1];
			inputs[i].value = selected.getAttribute('value');
			let parentChildren = inputs[i].parentElement.children;
			for(let j = 0; j <parentChildren.length; j++){
				if(parentChildren[j].classList.contains('MMM--fancyDropAnchor')){
					parentChildren[j].firstChild.textContent = selected.text;
				}
			}
		}
		else if(type === "checkbox"){
			inputs[i].checked = getRandomArbitrary(1,2);
		}
	}	
}

export {getRandomArbitrary, fillOut}
