/* your javascript goes here */

$(document).ready(initiateApp);

var pictures = [
	'images/landscape-1.jpg',
	'images/landscape-10.jpg',
	'images/landscape-11.jpg',
	'images/landscape-13.jpg',
	'images/landscape-15.jpg',
	'images/landscape-17.jpg',
	'images/landscape-18.jpg',
	'images/landscape-19.jpg',
	'images/landscape-2.jpg',
	'images/landscape-3.jpg',
	'images/landscape-8.jpg',
	'images/landscape-9.jpg',
	'images/pexels-photo-132037.jpeg',
	'images/pretty.jpg',
];

function initiateApp(){
  //advanced: add jquery sortable call here to make the gallery able to be sorted
  pictures = JSON.parse(localStorage.getItem('pictures')) || pictures;
		//on change, rebuild the images array into the new order
  $('#gallery').sortable({
    update: function (event, ui) {
      pictures = [...$('#gallery').sortable('refreshPositions').children()]
                  .map(figure => figure.innerText);
      localStorage.setItem('pictures', JSON.stringify(pictures));
    }
  });

	makeGallery(pictures);
	addModalCloseHandler();
}
function makeGallery(imageArray){
	//use loops and jquery dom creation to make the html structure inside the #gallery section

  //create a loop to go through the pictures
  pictures.forEach(picture => {
    //create the elements needed for each picture, store the elements in variable
    const figure = $('<figure>', {
      class: 'imageGallery col-xs-12 col-sm-6 col-md-4',
      style: `background-image: url(${picture});`,
    });
    const figcaption = $('<figcaption>').text(`${picture}`);
    figure.append(figcaption);
		//attach a click handler to the figure you create.  call the "displayImage" function.  
    figure.click(displayImage);
    //append the element to the #gallery section
    $('#gallery').append(figure);
  });
}

function addModalCloseHandler(){
  $('.modal img').click(function() {
    $('.modal').modal('hide');
  });
	//add a click handler to the img element in the image modal.  When the element is clicked, close the modal
	//for more info, check here: https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp	
}

function getImgUrl(jqueryElement) {
  const url = jqueryElement.css('background-image');
  return url.match(/images\/[\w-]+.jpg/)[0];
}

function displayImage(){
  $('#galleryModal').modal('show');
  //find the url of the image by grabbing the background-image source, store it in a variable
	//grab the direct url of the image by getting rid of the other pieces you don't need
  let imgUrl = getImgUrl($(this));
	//grab the name from the file url, ie the part without the path.  so "images/pexels-photo-132037.jpeg" would become
		// pexels-photo-132037
		//take a look at the lastIndexOf method
  // imgUrl = getImgUrl(imgUrl);

  //change the modal-title text to the name you found above
  $('.modal-title').text(imgUrl);
	//change the src of the image in the modal to the url of the image that was clicked on
  $('.modal img').attr('src', imgUrl);
  //show the modal with JS.  Check for more info here: 
  $('.modal').modal();
	//https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
}





