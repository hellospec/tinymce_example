document.addEventListener('turbolinks:load', function(){
  tinyMCE.init({
    selector: "textarea.tinymce",
    plugins: ["image link paste"],
    toolbar: "undo redo | stylesheet | bold italic | link",
    
    paste_data_images: true,
    convert_urls: false,
    //images_upload_url: "/photos"

    images_upload_handler: function(blobInfo, success, failure){
      console.log("uploading image");

      var xhr, formData;

      formData = new FormData();
      formData.append('image[image]', blobInfo.blob());

      xhr = new XMLHttpRequest();

      xhr.open('POST', '/images');

      xhr.setRequestHeader("X-CSRF-Token", document.querySelector("meta[name='csrf-token']").content);

      xhr.onload = function() {
        var response = JSON.parse(xhr.responseText);
        
        console.log("url: " + response.location);
        success(response.location);
      };
      
      xhr.onloadend = function() {
        var response = JSON.parse(xhr.responseText);
        setDataImageId(response);
        addInputHiddenForImageId(response);
      };

      xhr.send(formData);
    }
  });
});

