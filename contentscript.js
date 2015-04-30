

function duplicate(el) {
  $(el).clone().attr('id', el.tagName+$.now()).insertAfter(el);
  reHover(); // apply hovering rules to appended elements
}

function rem(el) {
  //console.log("DELETE: "+$(el).html());
  el.remove();
}

function handleRight(el) {
    $(".custom-menu li").click(function(){
      // This is the triggered action name
      switch($(this).attr("data-action")) {
        // A case for each action. Should personalize to your actions
        case "add": duplicate(el); break;
        case "rem": rem(el); console.log("call"); break;
      }
      $(".custom-menu").hide(100);
      console.log("Data action:"+$(this).attr("data-action"));
      });
     
}

// Function for inplace text editing
function textClicked(el) {
    var content = el.innerHTML; //select's the contents of div immediately previous to the button
    var editableText = $("<textarea></textarea>");
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
            $(this).parents().removeClass("hovered");
            $(this).addClass("hovered");
            e.preventDefault();
            e.stopPropagation();
            return false;
        },function(e){
            $(this).removeClass("hovered");
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    );
}

$(document).ready(function(){ 

      if ($('#cm').length) return false; // Don't append again when button already clicked

      $("body").append("<ul class='custom-menu' id='cm'></ul>");
      $("#cm").append("<li data-action='add'>Duplicate</li>");
      $("#cm").append("<li data-action='rem'>Remove</li>");
      $('a').css('cursor','text');

      // Disable change of page in edit mode
      $('a').click(function(e){e.preventDefault();});
      $('button').click(function(e){e.preventDefault();});

      // Trigger action when the cm is about to be shown
    $(document).bind("contextmenu", function (e) {
      // Avoid the real one
      e.preventDefault();

      handleRight(e.target);
      // Show cm with a fast effect
      $(".custom-menu").finish().toggle(100).
      // In the right position (the mouse)
      css({
        top: e.pageY + "px",
        left: e.pageX + "px"
        });
      });
      

      // If the document is clicked somewhere else hide menu
      $(document).bind("mousedown", function (e) {
          // If the clicked element is not the menu
          if (!$(e.target).parents(".custom-menu").length > 0) {
              // Hide it
              $(".custom-menu").hide(100);
          }
      });

      // If pressed escape, hide menu
      $(document).keyup(function(e) {
          if (e.keyCode == 27) {
            $(".custom-menu").hide(100);
          }   // escape key maps to keycode `27`
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