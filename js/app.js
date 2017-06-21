document.addEventListener("DOMContentLoaded", function() {

  function getDataFromBackend () {
    return new Promise ( function (resolve, reject) {
    setTimeout (() => {
        if ( Math . random () < 0.5 ? true : false ) {
            resolve({
                status: 200 ,
                items: [
                { 'name' : 'London Pride' , 'type' : 'premium ale' , 'price' : 2.0 },
                { 'name' : 'Guiness' , 'type' : 'stout' , 'price' : 1.8 },
                { 'name' : 'Old Speckled Hen' , 'type' : 'fine ale' , 'price' : 1.5 },
                { 'name' : 'Kopparberg' , 'type' : 'cider' , 'price' : 2.0 },
                { 'name' : 'Old Mout Cider' , 'type' : 'cider' , 'price' : 2.2 },
                { 'name' : 'Hardys Endeavour' , 'type' : 'red wine' , 'price' : 7.0 },
                { 'name' : 'McGuigan' , 'type' : 'red wine' , 'price' : 8.0 },
                { 'name' : 'Cockburns' , 'type' : 'red wine' , 'price' : 9.0 },
                { 'name' : 'The Hedonist' , 'type' : 'red wine' , 'price' : 10.0 },
              ]
            });
        } else {
            reject({
                status: 500 ,
                message: 'Internal Server Error'
            });
        }
      }, 1000 );
    });
  }

  var btn = document.getElementById('getItemsButton');
  var loading = document.getElementById('loadingIndicator');
  var error = document.getElementById('error');
  var results = document.getElementById('results');

  btn.addEventListener('click', function () {
    error.innerText = '';
    results.innerText = '';
    results.classList.add('hidden');
    error.classList.add('hidden');

    var data = getDataFromBackend();

    data.then(function(resolve){
      console.log(resolve.items);
      var items = resolve.items;
      results.classList.remove('hidden');
      results.innerText = `number of items in stock: ${items.length} \n`;
      for (var i = 0; i < items.length; i++) {
        results.innerText += `${items[i].name} (${items[i].type}) costs: ${items[i].price}£ \n`;
      }

    }).catch(function(reject) {
        console.log(reject.message);
        var message = reject.message;
        error.classList.remove('hidden');
        error.innerText = message;
    });

    btn.disabled = true;
    btn.classList.add('disabled');
    loading.classList.remove('hidden');
    setTimeout(function() {
      btn.disabled = false;
      btn.classList.remove('disabled');
      loading.classList.add('hidden');
    }, 1000);
  })

})
