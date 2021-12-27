(function() {
    const formElm = document.querySelector('form');
  //console.log(formElm);
  const nameInputElm = document.querySelector('.product-name');
  //console.log(productNameElm);
  const priceInputElm = document.querySelector('.product-price');
  //console.log(productPriceElm);
  const listGroupElm = document.querySelector('.list-group');
  //console.log(listGroupElm);
  const filterElm = document.querySelector ('#filter');
  //console.log(filterElm);
  
  
  
  // tracking item;
   let products = [
    //  { 
    //    id: 0,
    //    name: 'potato',
    //    price: 34
    //  },
    //  {
    //    id: 1,
    //    name: 'Banana',
    //    price: 20
    //  },
    //  {
    //    id: 2,
    //    name: 'Kaschi',
    //    price: 120
    //  },
     
   ]
  
  
  
  
  
  
  
  
  function showAllItemToUI(filteredArr){
    listGroupElm.innerHTML = '';
    filteredArr.forEach(item => {
      const listElm = `<li class="list-group-item item-${item.id} collection-item">
      <strong>${item.name}</strong>- <span class="price">$${item.price}</span>
      <i class="fa fa-trash delete-item float-right"></i>
    </li>`
    listGroupElm.insertAdjacentHTML('afterbegin',listElm)
    })
  }
  
  //deleting item (event delegation);
  
  
  function removeItemFromDataStore(id){
    //console.log(products);
   const productsAfterDelete = products.filter(product => product.id !== id)
   products = productsAfterDelete;
   //console.log(productsAfterDelete);
  }
  function removeItemFromUI(id){
    document.querySelector(`.item-${id}`).remove();
  
  }
  
  
  function getItemID(elm){
    const liElm = elm.parentElement;
    return Number(liElm.classList[1].split('-')[1]);
    //console.log(Number(liElm.classList[1].split('-')[1]));
    //console.log(liElm.classList);
    //console.log(elm);
  
  }
  
  function resetInput(){
    nameInputElm.value = '';
    priceInputElm.value = '';
  }
  
  function addItemToUI(id, name, price){
    // generate id
   
    const listElm = `<li class="list-group-item item-${id} collection-item">
              <strong>${name}</strong>- <span class="price">$${price}</span>
              <i class="fa fa-trash delete-item float-right"></i>
            </li>`
            listGroupElm.insertAdjacentHTML('afterbegin',listElm)
  }
  
  function valiDateInput(name, price){
    let isError = false;
    if(!name || name.length < 5){
      isError = true;
      alert('invalid name input!');
      //console.log('invalid name input');
    }
    if(!price || Number(price) <=0){
      //console.log(price);
      isError = true;
      //console.log('invalid price input');
      alert('invalid price input!');
  
    }
    return isError;
  }
  
  function receivedInputs(){
    const nameInput = nameInputElm.value;
    const priceInput = priceInputElm.value;
    return {
      nameInput,
      priceInput
    }
    // console.log(nameInput,priceInput);
    //formElm.textContent = nameInputElm.value;
    //console.log(nameInputElm.value,priceInputElm.value);
  
  }
  
  // single responsibility principle.
  
  function init(){
    formElm.addEventListener('submit',(evt) => {
   
      // console.log('triggerd');
      //prevent default action(browser reloading);
      evt.preventDefault();
      const {nameInput, priceInput} = receivedInputs();
      //const inputValues = receivedInputs();
      //console.log(inputValues);
      //console.log(evt);
      
      //Validate input.
      const isError = valiDateInput(nameInput, priceInput);
      if (isError) {
        alert('please provide valid input');
        return
      }
      //console.log(isError);
      if(!isError){
        //add item to data store.
        // generate item. 
        const id = products.length;
        products.push({ 
          id: id,
          //id: products.length,
          name: nameInput, 
          price: priceInput,
        })
        //add item to the UI.
        addItemToUI(id,nameInput, priceInput);
        //console.log(products);
        // reset 
        resetInput();
      }
      //console.log(isError);
    })
  
    filterElm.addEventListener("keyup",(evt)=>{
      //filter depend on this value.
       const filterValue = evt.target.value;
       //const result = products.filter((product)=>product.name.contains(filterValue));
      //  const result = products.filter((product)=>
      //   product.name.includes(filterValue)
      const filteredArr = products.filter((product)=>product.name.includes(filterValue)
      
      )
      showAllItemToUI(filteredArr)
      //show Item to UI.
      // console.log(filterArray);
    
       //console.log(result);
      //console.log(evt.target.value);
    })
  
    listGroupElm.addEventListener('click', (evt)=>{
      if(evt.target.classList.contains('delete-item')){
        const id = getItemID(evt.target);
        //delete item from UI.
        removeItemFromUI(id);
        //  document.querySelector(`.item-${id}`).remove();
         removeItemFromDataStore(id);
        // delete item.
       // console.log('delete item')
       // console.log(evt);
    
      }
      //console.log(evt);
    
    })
   }
  
   init();
  
  
  
  })();
  
  