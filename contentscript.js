function duplicate(el) {
  $(el).clone().attr('id', el.tagName+$.now()).insertAfter(el);
  reHover(); // apply hovering rules to appended elements
}

function rem(el) {
  el.remove();
}

function handleRight(el) {
    $("#cm li").click(function(){
      // This is the triggered action name
      switch($(this).attr("data-action")) {
        // A case for each action. Should personalize to your actions
        case "add": duplicate(el); break;
        case "rem": rem(el); break;
        }
      });
}

// Function for inplace text editing
function textClicked(el) {
    var content = el.innerHTML; //select's the contents of div immediately previous to the button
    var editableText = $("<textarea />");
    editableText.val(content);
    $(el).hide();
    $(el).after(editableText);
    $(editableText).select();
    // setup the blur event for this new textarea
    editableText.blur(function(){
      $(el).html(editableText.val());
      $(el).show();
      $(editableText).remove();
    });
}

// Just outline the element under mouse
function reHover() {
    $('*:not(#cm, #cm li)').hover(
        function(e){
            $(this).parents().css("border", "none");
            $(this).css('border', '2px solid #4d89e2');
            e.preventDefault();
            e.stopPropagation();
            return false;
        },function(e){
            $(this).css('border', 'none');
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    );
}


$(document).ready(function(){ 

      $("body").append("<ul class='custom-menu' id='cm'></ul>");
      $("#cm").append("<li data-action='add'>Duplicate</li>");
      $("#cm").append("<li data-action='rem'>Remove</li>");

      // Trigger action when the cm is about to be shown
    $(document).bind("contextmenu", function (event) {
      // Avoid the real one
      event.preventDefault();
      // Show cm with a fast effect
      $(".custom-menu").toggle(100).
      // In the right position (the mouse)
      css({
        top: event.pageY + "px",
        left: event.pageX + "px"
        });
      });

    // If the document is clicked somewhere
    $(document).bind("mousedown", function () {
      $(".custom-menu").hide(100);
    });

      
      document.oncontextmenu = function() {return false;};

      $(document).mousedown(function(e){ 
        if( e.button == 2 ) { 
          handleRight(e.target);
          return false; 
        } 
        return true; 
      }); 

      $('html').dblclick(function(e) {
        e.preventDefault();
    		if (e.target.tagName == "P" 
          || e.target.tagName == "DIV" 
          || e.target.tagName == "H1"
          || e.target.tagName == "H2"
          || e.target.tagName == "H3"
          || e.target.tagName == "H4"
          || e.target.tagName == "SPAN"
          || e.target.tagName == "A"
        ) textClicked(e.target);
    		return false; 
    	});

      reHover();
});