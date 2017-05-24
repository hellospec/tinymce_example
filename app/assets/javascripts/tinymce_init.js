document.addEventListener('turbolinks:load', function(){
  upload_image = function(blobInfo, success, failure){
    var xhr, formData;

    xhr = new XMLHttpRequest();
    xhr.open('POST', '/images');

    xhr.setRequestHeader("X-CSRF-Token", document.querySelector("meta[name='csrf-token']").content);

    xhr.onload = function() {
      var response = JSON.parse(xhr.responseText);
      success(response.location);
    };

    formData = new FormData();
    formData.append('image[image]', blobInfo.blob());

    xhr.send(formData);
  }

  tinyMCE.init({
    selector: "textarea.tinymce",
    plugins: ["image link paste"],
    toolbar: "undo redo | stylesheet | bold italic | link",
    
    paste_data_images: true,
    convert_urls: false,

    images_upload_handler: upload_image
  });

});

