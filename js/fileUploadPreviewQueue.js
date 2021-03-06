/* Author: Mike Santoro, Date: 02/16/2012, Purpose: ajax like file upload with preview */
/* Modified: Mike Santoro, Date: 02/26/2012, Purpose: updated imagesuploaded variable */
/* Modified: Mike Santoro, Date: 02/26/2012, Purpose: changed variables for IE6, IE7 conflict */
;(function($){
 var _ = {
  build: {
   init: function(){
    _.build.uploadButton();
    _.build.previewPane();
    _.build.reloadField();
    _.build.imageLoading();
   },
   uploadButton: function(){
    $("input[type=file]").after("<input type=\"button\" class=\"uploadAjaxButton\" value=\"" + settings.uploadbutton + "\" />");
    $uploadButton = $("input[type=button].uploadAjaxButton");
    $jForm = $uploadButton.parents("form");
   },
   previewPane: function(){
    $uploadButton.each(function(i, v){
     var $obj = $(this);
     $jFile = $obj.prevAll("input[type=file]:first");
     previewtarget = $jFile.data("previewtarget") || settings.previewtarget;
     if(!$obj.parent().find(previewtarget).length){
      $obj.after("<div class=\"media\"></div>");
      $jFile.data("previewtarget", "div.media");
     }
    });
   },
   imageInsert: function($obj){
    var imagesuploaded = $obj.data("imagesuploaded") || 0,
        previewSection = [],
        showMove = {};
     $jFile
      .val("")
      .attr("name", jFile + "FileUploadField");
     $obj.data("imagesuploaded", ++imagesuploaded);
     if(localSettings.previewtarget){
      previewSection.push("<div>");
      if(localSettings.imagepreviewlist.indexOf(objData.serverfileext.toLowerCase()) !== -1){
       previewSection.push("<img class=\"removeImg\" data-filename=\"" + objData.filereturn + "\" src=\"" + localSettings.webroot + localSettings.deleteimage + "\" />");
       previewSection.push("<img class=\"filePreview\" src=\"" + localSettings.webroot + localSettings.webpath + objData.filereturn + "\" title=\"" + objData.filereturn + " " + objData.filesize + "\" />");
       showMove['width'] = "show";
      }
      else{
       previewSection.push("<img class=\"removeFile\" data-filename=\"" + objData.filereturn + "\" src=\"" + localSettings.webroot + localSettings.deleteimage + "\" />");
       previewSection.push("<div class=\"filePreview\">" + objData.filereturn + " " + objData.filesize + "</div>");
       showMove['height'] = "show";
      }
      previewSection.push("</div>");
      $obj
       .nextAll(localSettings.previewtarget + ":first")
        .prepend(previewSection.join(""))
        .find("div:first")
         .hide()
         .animate(showMove);
     }
     _.general.togButtons();
     $obj.toggle($obj.data("imagesuploaded") < localSettings.maxamount);
     $obj
      .before("<input type=\"hidden\" class=\"fileFieldLists\" name=\"" + jFile + "\" value=\"" + ($obj.data("filelist") || "") + "\" />");
     $("#reloadFileListField").val($("input[type=hidden].fileFieldLists").serialize());
   },
   hiddenSettingsField: function($obj){
    var uploadFields = [];
    uploadFields.push("<div class=\"workingFields\">");
    uploadFields.push("<img class=\"cancelLoad\" src=\"" + localSettings.webroot + localSettings.loadimage + "\" />");
    uploadFields.push("<input type=\"hidden\" name=\"ajaxFilePath\" id=\"ajaxFilePath\" value=\"" + localSettings.filepath + "\" />");
    uploadFields.push("<input type=\"hidden\" name=\"ajaxMaxSize\" id=\"ajaxMaxSize\" value=\"" + localSettings.maxsize * 1000 + "\" />");
    uploadFields.push("<input type=\"hidden\" name=\"ajaxMimeType\" id=\"ajaxMimeType\" value=\"" + localSettings.mimetype + "\" />");
    uploadFields.push("<input type=\"hidden\" name=\"ajaxFileName\" id=\"ajaxFileName\" value=\"" + $jFile.val() + "\" />");
    uploadFields.push("</div>");
   $obj
    .hide()
    .after(uploadFields.join(""))
     .next("div")
      .css("display", "inline")
      .parent()
       .find(".error")
        .slideUp()
        .remove();
   },
   reloadField: function(){
    $uploadButton
     .parents("form")
      .prepend("<input type=\"hidden\" name=\"reloadFileListField\" id=\"reloadFileListField\" value=\"" + settings.fileLoadValues + "\" />");
   },
   imageLoading: function(){
    if(settings.fileLoadValues){
     var $obj = $("#reloadFileListField"),
         loadedFiles = $obj.val().split("&"),
         fieldSplit,
         fieldValuesCnt = 0,
         $ajaxObj,
         fieldValues,
         isImage = false,
         internalSettings,
         re = new RegExp("\\+", "g"),
         previewSection = [];
     if($obj.val().length){
      for(var i = 0; i < loadedFiles.length; i++){
       fieldSplit = loadedFiles[i].split("=");
       $imageField = $("#" + fieldSplit[0]).next("input[type=button]");
       fieldValues = fieldSplit[1].split("*");
       fieldValuesCnt = fieldValues.length;
       internalSettings = $.extend({}, settings, $imageField.prevAll("input[type=file]:first").data());
       previewSection['length'] = 0;
       $imageField
        .data({
         filelist: fieldSplit[1],
         imagesuploaded: fieldValuesCnt
        })
        .prevAll("input[type=file]:first")
         .attr("name", fieldSplit[0] + "FileUploadField")
        .end()
         .before("<input type=\"hidden\" class=\"fileFieldLists\" name=\"" + fieldSplit[0] + "\" value=\"" + unescape(fieldSplit[1].replace(re, " ")) + "\" />");
       $imageField.toggle(fieldValuesCnt < internalSettings.maxamount);
       for(var j = 0; j < fieldValuesCnt; j++){
        fileExt = fieldValues[j].split(".");
        fieldValue = unescape(fieldValues[j].replace(re, " "));
        previewSection = [];
        if(fieldValue.length){
         previewSection.push("<div>");
         if(internalSettings.imagepreviewlist.indexOf(fileExt[1].toLowerCase()) !== -1){
          previewSection.push("<img class=\"removeImg\" data-filename=\"" + fieldValue + "\" src=\"" + internalSettings.webroot + internalSettings.deleteimage + "\" />");
          previewSection.push("<img class=\"filePreview\" src=\"" + internalSettings.webroot + internalSettings.webpath + fieldValue + "\" title=\"" + fieldValue + "\" />");
         }
         else{
          previewSection.push("<img class=\"removeFile\" data-filename=\"" + fieldValue + "\" src=\"" + internalSettings.webroot + internalSettings.deleteimage + "\" />");
          previewSection.push("<div class=\"filePreview\">" + fieldValue + "</div>");
         }
         previewSection.push("</div>");
         $imageField
          .nextAll(internalSettings.previewtarget)
          .first()
          .prepend(previewSection.join(""));
        }
       }
      }
      $("#reloadFileListField").val($("input[type=hidden].fileFieldLists").serialize());
     }
    }
   },
   errorDisplay: function($obj){
    var errDisplayText = objData.errText ? objData.errText : localSettings.defaulterr;
    $obj
     .show()
     .before("<input type=\"hidden\" class=\"fileFieldLists\" name=\"" + jFile + "\" value=\"" + ($obj.data("filelist") || "") + "\" />")
      .next("div")
       .remove()
      .end()
      .after("<div class=\"error hidden ajaxError\">" + errDisplayText + "</div>")
       .next(".error")
        .removeClass("hidden")
        .slideDown("slow");
    $jFrame
     .delay(100, "remove")
     .queue("remove", function(){
      $jFrame.remove();
     })
     .dequeue("remove");
    _.general.togButtons();
   }
  },
  listeners: {
   init: function(){
    _.listeners.uploadFile();
    _.listeners.removeImage();
    _.listeners.leavePage();
    _.listeners.imageZoom();
    _.listeners.cancelUpload();
   },
   uploadFile: function(){
    $uploadButton.delegate("", "click", function(event){
     var $obj = $(this);
     $jFile = $obj.prevAll("input[type=file]:first");
     jFile = $jFile.attr("id");
     localSettings = $.extend({}, settings, $jFile.data());
     _.build.hiddenSettingsField($obj)

     var $obj = $(this);
     $jFile = $obj.prevAll("input[type=file]:first");
     jFile = $jFile.attr("id");
     localSettings = $.extend({}, settings, $jFile.data());
     //if(!$jFile.val()){
      //$jFile.trigger("click.fileUpload");
      //return;
     //}
     _.general.togButtons();
     $jFile.attr("name", jFile);
     $obj
      .data("filelist", ($obj.prev("input[type=hidden]").val() || ""))
      .prev("input[type=hidden]")
       .remove();
     $jForm.bind("submit", function(event){
      _.general.callUpload($obj);
     });
     $jForm
      .trigger("submit")
      .unbind("submit")
      .attr("target", "");

    });
   },
   removeImage: function(){
    $uploadButton.each(function(i, v){
     var $obj = $(this),
         $jFile = $obj.prevAll("input[type=file]:first"),
         localSettings = $.extend({}, settings, $jFile.data());
     $obj.siblings(localSettings.previewtarget).delegate("img.removeImg, img.removeFile", "click", function(event){
      var $remButton = $(this),
          hideMove = {};
      hideMove[($remButton.hasClass("removeImg") ? "width" : "height")] = "hide";
      $remButton
       .parent("div")
        .animate(
         hideMove,
         200,
         function(){
          $(this).remove();
         }
       );
      $obj
       .data("imagesuploaded", $obj.data("imagesuploaded") - 1)
       .show();
      $obj
       .prevAll("input[type=hidden]:first")
        .val(function(){
         return $(this).val().replace(new RegExp("\\*?" + $remButton.data("filename"), "g"), "");
        });
      $("#reloadFileListField").val($("input[type=hidden].fileFieldLists").serialize());
      _.general.callDelete(localSettings.filepath + $remButton.data("filename"), true);
     });
    });
   },
   leavePage: function(){
    var $obj = $uploadButton,
        $window = $(window);
    $jForm
     .find("input[type=button],input[onclick*=Submit],input[value*=Submit],input[value*=Save],input[type=submit]")
     .not($obj)
     .bind("click.save mouseup.save", function(event){
      event.preventDefault();
      $window.unbind("beforeunload.cleanFile unload.removeFiles");
      $obj.prev("input[type=file]").val("");
     });
    $window.bind("beforeunload.cleanFile", function(event){
     var filesList = "";
     $("input[type=hidden].fileFieldLists").each(function(i, v){
      var $obj = $(this);
      filesList += ($obj.val() || "");
     });
     $(window).bind("unload.removeFiles", function(event){
      var filesList = [];
      $("input[type=hidden].fileFieldLists").each(function(i, v){
       var $obj = $(this),
           internalSettings = $.extend({}, settings, $obj.prev().data()),
           fieldValues = $obj.val().split("*");
       for(var i = 0; i < fieldValues.length; i++){
        filesList.push(internalSettings.filepath + fieldValues[i]);
       }
      });
      filesList.length && _.general.callDelete(filesList.join(","), false);
     });
     if(filesList.length){
      return settings.defaultLeaveMessage;
     }
    });
   },
   imageZoom: function(){
    $(".media").delegate("img:not(.removeImg,.removeFile)", "click", function(event){
     var $obj = $(this),
         w = $obj.width(),
         h = $obj.height(),
         adjWidth = 500,
         calcDim = adjWidth + "x" + adjWidth / w * h;
     $obj.enlargeImage({
      elTarget: $obj,
      elSize: calcDim,
      filter: "",
      filterReplace: ""
     });
    });
   },
   cancelUpload: function(){
    $jForm.delegate("img.cancelLoad", "click", function(){
     var $obj = $(this),
         $jFrame = $("#" + $obj.data("frameId"));
     $obj
      .parent()
       .prev($uploadButton)
        .show()
       .end()
      .end()
      .parent(".workingFields")
       .remove();
     $jFrame.remove();
     _.general.togButtons();
    });
   }
  },
  general: {
   callUpload: function($obj){
    var uniName = ("uploader" + (new Date()).getTime()),
        frameLoad = setTimeout(function(){
         _.build.errorDisplay($obj);
        }, (localSettings.maxsize || 10000) / localSettings.timoutFactor * 10000);
    $jFrame = $("<iframe name=\"" + uniName + "\" id=\"" + uniName + "\" src=\"about:blank\" />");
    $jFrame.css({
     position: "absolute",
     top: "-99999px"
    });
     $obj
      .next(".workingFields")
       .find(".cancelLoad")
        .data("frameId", uniName);
    $("body").append($jFrame);
    $jFrame.bind("load", function(event){
     var $objUploadBody = $(window[uniName].document);
     if($objUploadBody.find("div").is("#json")){
      var $jBody = $objUploadBody.find("#json");
      objData = $.parseJSON($jBody.html());
      objData.errText = $objUploadBody.find("#errText").html();
      if(objData.svrstatus === "0"){
       $obj
        .data("filelist", ($obj.data("filelist") ? $obj.data("filelist") + "*" : "") + (objData.filereturn || ""))
        .prev("input[type=file]")
         .val("")
        .end()
        .next("div")
         .remove();
       _.build.imageInsert($obj);
      }
      else{
       _.build.errorDisplay($obj);
      }
     }
     else{
      _.build.errorDisplay($obj);
     }
     $jFrame
      .delay(100, "remove")
      .queue("remove", function(){
       $jFrame.remove();
      })
      .dequeue("remove");
      clearTimeout(frameLoad);
    });
    $jForm
     .attr({
      action: "index.cfm?action=santoro.fileUploadAJAX&_nhd&fileField=" + jFile,
      method: "POST",
      enctype: "multipart/form-data",
      encoding: "multipart/form-data",
      target: uniName
     });
   },
   callDelete: function(fileList, cleaner){
    $.ajax({
     url: "index.cfm?action=santoro.fileDeleteAJAX",
     type: "POST",
     data: {fileList: fileList},
     timeout: settings.deleteTimeout,
     dataType: "json",
     async : cleaner || false
    });
   },
   togButtons: function(){
    $uploadButton.each(function(i, v){
     var $obj = $(this);
     //$obj.attr("disabled", $obj.attr("disabled") ? false : true);
    });
   }
  }
 },
 settings,
 localSettings,
 objData,
 $uploadButton,
 $jFrame,
 $jForm,
 jFile,
 $jFile;
 $.fileUploadPreview = {
  fileDefault: {
   maxamount: 1, //maximum number of files to be uploaded
   maxsize: 100, //max filesize in kb
   timeoutFactor: 25, //average connection speed in kb per second
   mimetype: "jpeg,jpg", //file extension to allow
   previewtarget: "div.media", //div to add previews to
   filepath: "image\\usa\\webportals", //File upload path.  Base path item is evaluated server side valid entries are image and media.
   webroot: "http://devimages.marketamerica.com/images/usa", //root image path for display
   loadimage: "/eng/webPortals/zoomloader.gif", //Image to display while uploading.
   deleteimage: "/eng/webPortals/redRemove.png", //Image to display to remove file.
   webpath: "/webPortals/", //web path to access images for preview
   defaulterr: "Your file did not upload.  Please try again.", //default error message for failure from server
   imagepreviewlist: "jpeg,jpg,png,gif", //list of images to preview
   imagezoom: "Yes", //enable image zoom
   uploadbutton: "Upload", //Upload button text
   fileLoadValues: "", //file field to store saved images, for use when rebuilding page
   defaultLeaveMessage: "You have uploaded files, if you leave this page your files will be deleted.", //message when page is left without submitting the form
   deleteTimeout: 5000 //Timeout for delete function
  },
  init: function(options){
   settings = $.extend({}, $.fileUploadPreview.fileDefault, options);
   localSettings = {};
   _.build.init();
   _.listeners.init();
  }
 };
})(jQuery);
