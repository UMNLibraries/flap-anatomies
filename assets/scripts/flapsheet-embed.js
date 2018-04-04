// Run the function passed in when the page fully loads. This ensures that all appropriate markup is in place.

$(document).ready(function(){

    // Get the wrapper HTML element for the flap anatomy and store it in $wrapper
    var $wrapper = $('.flip-up-wrapper');

    // Configure the wrapper based off our flap configuration. This sets the width, height
    // and background image to the appropriate configuration values.
    $wrapper.css({
        'width': FlapConfiguration.background.width,
        'height': FlapConfiguration.background.height,
        'background-image': 'url(' + FlapConfiguration['base-url'] + '/' + FlapConfiguration.background.path + ')',
        'perspective:': FlapConfiguration.background.width
    });

    var flipDir = FlapConfiguration['flip-dir'];
    var baseUrl = FlapConfiguration['base-url'];

    $wrapper.addClass('flip-dir-' + flipDir);

    // Clear out any HTML currently in the target .flip-up element. This ensures we start
    // with a clean slate.
    $wrapper.find('.flip-up').empty();

    // Mustache is a template system that allows you to specify dynamic markup within HTML.
    // You can find the template referred to here by searching in FlapAnatomy.htm for component-markup
    var componentTemplate = $('#component-markup').html();

    var idx=1;
    // Loop over each component within our configuration file
    for(var flap in FlapConfiguration.components) {
        var component = FlapConfiguration.components[flap];
        // Create the HTML markup for this component.
        var $markup = $(Mustache.render(componentTemplate, {'baseUrl': baseUrl, 'idx': idx, 'component': component}));

        // Apply custom CSS specific to this component. It's necessary to ensure proper positioning
        // and scaling of the components.
        $markup.css({
            top: component.y + '%',
            left: component.x + '%',
            height: component.h + '%',
            maxHeight: component.h + '%',
            width: component.w + '%'
        })
        // Configure the first flap as the 'active' flap. That is, the one that will receive clicks
        .toggleClass('active', idx==1)
        .data('desc', component.desc);

        // Append the generated markup to the .flip-up div
        $wrapper.find('.flip-up').append($markup);

        idx++;
    };

    // The last component is just an empty Mustache template that doesn't have any images.
    $lastComponent = Mustache.render(componentTemplate, {'idx': idx});

    $wrapper.find('.flip-up').append($lastComponent);

	  var index = 0,
		currentActive = 0,
		components = [];


    function autoFlip(clicked, active){
      if (clicked > active){
          //flip up
          for (var i = active; i < clicked; i++) {
              updateCurrentActive('up');
          }

      } else if (clicked < active){
            for (var i = active; i > clicked; i--) {
                updateCurrentActive('down');
            }
      }
      changeDescription();
    }

    function clickIndicator(id){
        var id = id.slice(2);
        console.log("indicator clicked: " + id);
        // magic happens that switches to the flap with id=id

        if (id == "zero"){
          autoFlip(0,currentActive);
        }
        if (id == "one"){
          autoFlip(1,currentActive);
        }
        if (id == "two"){
          autoFlip(2,currentActive);
        }
        if (id == "three"){
          autoFlip(3,currentActive);
        }
        if (id == "four"){
          autoFlip(4,currentActive);
        }
        if (id == "five"){
          autoFlip(5,currentActive);
        }
        if (id == "six"){
          autoFlip(6,currentActive);
        }
    }

    // add onclick functions to each indicator
    $("#i_zero").on( "click", function() {
        clickIndicator(this.id);
    });
    $("#i_one").on( "click", function() {
        clickIndicator(this.id);
    });
    $("#i_two").on( "click", function() {
        clickIndicator(this.id);
    });
    $("#i_three").on( "click", function() {
        clickIndicator(this.id);
    });
    $("#i_four").on( "click", function() {
        clickIndicator(this.id);
    });
    $("#i_five").on( "click", function() {
        clickIndicator(this.id);
    });
    $("#i_six").on( "click", function() {
        clickIndicator(this.id);
    });



    // Create a new pseudo-class to represent a component. This will allow for better handling
    // of click events in a structured way.
    var Component = function( elem , figure ){
		    this.index = index;
		    this.self = $( '#' + elem );
		    this.back = this.self.find( '.flip-up-back' );
		    this.initHeight = this.self.height();

        // Configure the click event on the component object. On click, this first checks to see
        // if the component has the 'active' class. If so, and it's not the last component in
        // the list, we flip the component up and displays the components beneath it
        // (showing the back side of this component).
        // If it is the last component, it sets the active state to 'last'.
        //
        // If the component isn't active, then we assume we're flipping the component back down to
        // reveal its front.

		   this.self.click(function(){
			 if ($(this).hasClass('active')){
			     if( $(this).hasClass('last') && ($(this).height() == 0 || $(this).width() == 0)){
					     updateCurrentActive('last', figure );
				   } else {
					     updateCurrentActive('up', figure );
				   }
			}
			if ($(this).hasClass('previous')){
          updateCurrentActive('down', figure);
      }
      });
      index++;
	}

	var i = 1;
  // Initialize the component list, creating the pseudo-class described above for
  // each component found
	while( $('.component-' + i).length){
	     var component = new Component( 'component-' + i );
       components.push(component);
		   i++;
	}

  // Helper method for configuring the current active state. currentActive is just maintaining
  // the index of the currently-active component
	function updateCurrentActive( direction , figure ){
      component = components[currentActive];

      // Call the autoDrag function, which triggers the transition for lifting up
      // or dragging down the component
      autoDrag( component , direction);
          if( direction == 'up'  && currentActive < components.length-1 ){
              currentActive++;
              changeDescription();
          } else if (direction == 'down' ){
              currentActive--;
              changeDescription();
          }
	}

    /**
     * In order to simulate the drag functionality, the flap anatomy makes use of CSS transitions,
       like shown here (the below is from `flapsheet-embed.css`):
         .flip-up-component-wrapper,.flip-up-component,.flip-up-back {
            -webkit-transition:1s ease-in-out;
            transition:1s ease-in-out;
            -moz-box-sizing:border-box;
            box-sizing:border-box;
            -webkit-backface-visibility:hidden;
            -ms-backface-visibility:hidden;
            backface-visibility:hidden;
            -webkit-perspective:1000;
            -ms-perspective:1000;
            perspective:1000
        }

       For a bit more info on CSS transitions, you can read the W3C article here: https://www.w3schools.com/css/css3_transitions.asp

       Essentially, we set up the CSS transitions to invert the images, flipping them head-to-toe.

       What CSS transitions do is apply transitions (think slideshow transitions) when certain CSS
       changes affect an element. In this instance, we're setting the height of the flap to 0
       and the height of the back of the flap to 100%, and what this does is trigger the animation to
       squish the flap and reveal the back of the flap.
       You can set `opacity: 1` in flapsheet-embed.css at line 68 (to always show the border around the flap)
       and see exactly what's happening to the flap.

       This method is reversed when you click on the back of the flap to reveal the flap itself.
     */
	function autoDrag( component , direction , figure ){
      if( direction == 'up' ){
          component.self.addClass('flipped');
			    component.self.removeClass('active').css('z-index', 1000 );

			if( component.self.next( '.flip-up-component-wrapper')[0] ){
				setTimeout(function(){
                    $('.previous').removeClass('previous');
					component.self.addClass('previous');
					component.self.next('.flip-up-component-wrapper').addClass('active');
				},500);
			}
		  } else if ( direction == 'down' ){
			     var prevComponent;
           prevComponent = components[component.index - 1];
           $('.active').removeClass('active');
           $('.previous').removeClass('previous').removeClass('flipped').addClass('active');

			     prevComponent.self.prev('.flip-up-component-wrapper').addClass('previous');
			     prevComponent.self.css('z-index', '');
		 } else if (direction == 'last' ){
		       component.self.prev('.flip-up-component-wrapper').addClass('previous');
		 }
	}

    changeDescription();
    $(".flap-info").css({'height': FlapConfiguration.background.height});

  function removeIndicators(num){
    if (num != 0){
      $("#i_zero").css('color', '');
    }
    if (num != 1){
      $("#i_one").css('color', '');
    }
    if (num != 2){
      $("#i_two").css('color', '');
    }
    if (num != 3){
      $("#i_three").css('color', '');
    }
    if (num != 4){
      $("#i_four").css('color', '');
    }
    if (num != 5){
      $("#i_five").css('color', '');
    }
    if (num != 6){
      $("#i_six").css('color', '');
    }
  }

  // dynamically change text in description based on what CurrentActive is set to
  // new addition
  // dynamically change text in description based on what CurrentActive is set to
  function changeDescription() {
      var selector = components[currentActive].index;

      // we have 5 flaps, bottom layer=6 so it gets custom text
      var customText = "<h1>Last Component</h1>";
      if (selector != 6){
        $( "#custom-description" ).html(components[currentActive].self.data('desc'));
      } else {
        $( "#custom-description" ).html(customText);
      }

      if (selector == 0){
        $("#zero").removeClass("hidden");
        $("#one").addClass("hidden");
        $("#i_zero").css('color', 'yellow');
        removeIndicators(0);
      }
      if (selector == 1){
        $("#one").removeClass("hidden");
        $("#zero").addClass("hidden");
        $("#two").addClass("hidden");
        $("#i_one").css('color', 'yellow');
        removeIndicators(1);
      }
      if (selector == 2){
        $("#two").removeClass("hidden");
        $("#one").addClass("hidden");
        $("#three").addClass("hidden");
        $("#i_two").css('color', 'yellow');
        removeIndicators(2);
      }
      if (selector == 3){
        $("#three").removeClass("hidden");
        $("#two").addClass("hidden");
        $("#four").addClass("hidden");
        $("#i_three").css('color', 'yellow');
        removeIndicators(3);
      }
      if (selector == 4){
        $("#four").removeClass("hidden");
        $("#three").addClass("hidden");
        $("#five").addClass("hidden");
        $("#i_four").css('color', 'yellow');
        removeIndicators(4);
      }
      if (selector == 5){
        $("#five").removeClass("hidden");
        $("#four").addClass("hidden");
        $("#six").addClass("hidden");
        $("#i_five").css('color', 'yellow');
        removeIndicators(5);
      }
      if (selector == 6){
        $("#five").addClass("hidden");
        $("#i_six").css('color', 'yellow');
        removeIndicators(6);
      }
  }

  //hover to show border both on front flip-up-component active and the previous
  //flip-up component

/*  $('.flip-up-component-wrapper .active').hover(function(){
    $(this).find('.component-border').css({'opacity': 1});
    console.log('Hi!');
  }, function(){
    $(this).find('.component-border').css({'opacity': 0});
    console.log('NO!');
  });*/
});
