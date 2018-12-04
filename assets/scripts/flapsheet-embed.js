// Run the function passed in when the page fully loads. This ensures that all appropriate markup is in place.

$(document).ready(function() {
  // Get the wrapper SVG element for the flap anatomy and store it in $wrapper
  var $wrapper = $('.flip-up-wrapper');

  var flipDir = FlapConfiguration['flip-dir'];
  var baseUrl = FlapConfiguration['base-url'];

  // Clear out any SVG elements currently in the target .flip-up element. This ensures we start
  // with a clean slate.
  $wrapper.find('.flip-up-wrapper').empty();

  // add background image
  // var svgComponent = document.getElementById("svg-diagram-container");
  var svgComponent = $('svg.flip-up-wrapper');

  //there is likely a better method for adding the "flip-dir" part of the class name
  svgElement = document.getElementById('svg-diagram-container');
  svgElement.setAttribute('class', svgComponent[0].classList.value + ' flip-dir-' + flipDir);

  //create background image svg
  var backgroundImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
  backgroundImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', baseUrl + '/background_diag1.png');
  backgroundImage.setAttributeNS('http://www.w3.org/1999/xlink', 'x', '0');
  backgroundImage.setAttributeNS('http://www.w3.org/1999/xlink', 'y', '0');
  backgroundImage.setAttributeNS('http://www.w3.org/1999/xlink', 'width', '100%');
  backgroundImage.setAttributeNS('http://www.w3.org/1999/xlink', 'height', '100%');
  svgComponent.append(backgroundImage);

  var flipUp = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  flipUp.setAttribute('class', 'flip-up');

  idx = 1;
  for (var flap in FlapConfiguration.components) {
    var currentFlap = FlapConfiguration.components[flap];
    var xValue = currentFlap.x + '%';
    var yValue = currentFlap.y + '%';
    var imageFront = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    var imageBack = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    var imageBorder = document.createElementNS('http://www.w3.org/2000/svg', 'image');

    imageBorder.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', baseUrl + '/' + currentFlap.border_src);
    imageBorder.setAttribute('class', 'component-border');
    imageBorder.setAttribute('x', xValue);
    imageBorder.setAttribute('y', yValue);
    imageBorder.setAttribute('width', currentFlap.w + '%');
    imageBorder.setAttribute('height', currentFlap.h + '%');

    imageFront.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', baseUrl + '/' + currentFlap.src);
    imageFront.setAttribute('class', 'component-img');
    imageFront.setAttribute('x', xValue);
    imageFront.setAttribute('y', yValue);
    imageFront.setAttribute('width', currentFlap.w + '%');
    imageFront.setAttribute('height', currentFlap.h + '%');

    imageBack.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', baseUrl + '/' + currentFlap.shadow_src);
    imageBack.setAttribute('x', xValue);
    imageBack.setAttribute('y', yValue);
    imageBack.setAttribute('width', currentFlap.w + '%');
    imageBack.setAttribute('height', currentFlap.h + '%');

    // create new grouping component
    var front_flip_up_comonent = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    front_flip_up_comonent.append(imageFront);
    front_flip_up_comonent.append(imageBorder);
    front_flip_up_comonent.setAttribute('class', 'front flip-up-component');

    var back_flip_up_back = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    back_flip_up_back.append(imageBack);
    back_flip_up_back.setAttribute('class', 'back flip-up-back');

    var flipper = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    flipper.append(back_flip_up_back);
    flipper.append(front_flip_up_comonent);
    flipper.setAttribute('class', 'flipper');

    var flipperContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    flipperContainer.append(flipper);

    if (idx == Object.keys(FlapConfiguration.components).length) {
      flipperContainer.setAttribute('class', 'flip-up-component-wrapper component-' + idx + ' right active');
    } else {
      flipperContainer.setAttribute('class', 'flip-up-component-wrapper component-' + idx + ' right');
    }

    flipperContainer.setAttribute('data', currentFlap.desc);
    flipUp.append(flipperContainer);
    idx++;
  }
  svgComponent.append(flipUp);

  var index = 0,
    currentActive = 0,
    components = [];

  // use retButton to verify where the autoFlip call is coming from
  var retButton = false;

  // clicked is the flap you want to navigate to, active is the current flap
  function autoFlip(clicked, active) {
    if (clicked > active) {
      //flip up
      for (var i = active; i < clicked; i++) {
        updateCurrentActive('up', 0);
      }
    } else if (clicked < active) {
      for (var i = active; i > clicked; i--) {
        updateCurrentActive('down', 0);
      }
    }
  }

  // depending on id, call autoFlip with different parameter
  function clickIndicator(id) {
    var id = id.slice(2);
    console.log('indicator clicked: ' + id);

    if (id == 'zero') {
      autoFlip(0, currentActive);
    }
    if (id == 'one') {
      autoFlip(1, currentActive);
    }
    if (id == 'two') {
      autoFlip(2, currentActive);
    }
    if (id == 'three') {
      autoFlip(3, currentActive);
    }
    if (id == 'four') {
      autoFlip(4, currentActive);
    }
    if (id == 'five') {
      autoFlip(5, currentActive);
    }
    if (id == 'six') {
      autoFlip(6, currentActive);
    }
    if (id == 'seven') {
      autoFlip(7, currentActive);
    }
    if (id == 'eight') {
      autoFlip(8, currentActive);
    }
    if (id == 'nine') {
      autoFlip(9, currentActive);
    }
    if (id == 'ten') {
      autoFlip(10, currentActive);
    }
  }

  // add onclick functions to each indicator
  $('#i_zero').on('click', function() {
    clickIndicator(this.id);
  });
  $('#i_one').on('click', function() {
    clickIndicator(this.id);
  });
  $('#i_two').on('click', function() {
    clickIndicator(this.id);
  });
  $('#i_three').on('click', function() {
    clickIndicator(this.id);
  });
  $('#i_four').on('click', function() {
    clickIndicator(this.id);
  });
  $('#i_five').on('click', function() {
    clickIndicator(this.id);
  });
  $('#i_six').on('click', function() {
    clickIndicator(this.id);
  });
  $('#i_seven').on('click', function() {
    clickIndicator(this.id);
  });
  $('#i_eight').on('click', function() {
    clickIndicator(this.id);
  });
  $('#i_nine').on('click', function() {
    clickIndicator(this.id);
  });
  $('#i_ten').on('click', function() {
    clickIndicator(this.id);
  });

  // Create a new pseudo-class to represent a component. This will allow for better handling
  // of click events in a structured way.
  var Component = function(elem, figure) {
    this.index = index;
    this.self = $('#' + elem);
    this.back = this.self.find('.flip-up-back');
    this.initHeight = this.self.height();

    // Configure the click event on the component object. On click, this first checks to see
    // if the component has the 'active' class. If so, and it's not the last component in
    // the list, we flip the component up and displays the components beneath it
    // (showing the back side of this component).
    // If it is the last component, it sets the active state to 'last'.
    //
    // If the component isn't active, then we assume we're flipping the component back down to
    // reveal its front.

    this.self.click(function() {
      if ($(this).hasClass('active')) {
        if ($(this).hasClass('last') && ($(this).height() == 0 || $(this).width() == 0)) {
          updateCurrentActive('last', figure);
        } else {
          updateCurrentActive('up', figure);
        }
      }
      if ($(this).hasClass('previous')) {
        updateCurrentActive('down', figure);
      }
    });
    index++;
  };

  var i = 1;
  // Initialize the component list, creating the pseudo-class described above for
  // each component found
  while ($('.component-' + i).length) {
    var component = new Component('component-' + i);
    components.push(component);
    i++;
  }

  // Helper method for configuring the current active state. currentActive is just maintaining
  // the index of the currently-active component
  function updateCurrentActive(direction, timeout) {
    component = components[currentActive];

    // check if the indicators are hidden, if they are this means the
    // user has clicked a flap instead of clicking the start button
    // if retButton is true we do not want to to execute this code because it has already been done
    if ($('#indicators').hasClass('hidden section') == true && retButton == false) {
      // hide startup screen
      $('#startup').addClass('hidden section');
      // show flap information and indicators
      $('#panel-text').removeClass('hidden section');
      $('#indicators').removeClass('hidden section');
      // show the return button
      $('#return').removeClass('hidden section');
    }
    // Call the autoDrag function, which triggers the transition for lifting up
    // or dragging down the component
    autoDrag(component, direction, timeout);

    if (direction == 'up' && currentActive < components.length - 1) {
      currentActive++;
      changeDescription();
    } else if (direction == 'down') {
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
  function autoDrag(component, direction, timeout) {
    // if timeout is 0 then this function is getting called from autoFlip
    // in this case we will not use any timeouts
    if (timeout == 0 && direction == 'up') {
      component.self.addClass('flipped');
      component.self.removeClass('active').css('z-index', 1000);
      if (component.self.next('.flip-up-component-wrapper')[0]) {
        $('.previous').removeClass('previous');
        component.self.addClass('previous');
        component.self.next('.flip-up-component-wrapper').addClass('active');
      }
    }
    if (timeout == 0 && direction == 'down') {
      var prevComponent;
      prevComponent = components[component.index - 1];
      $('.active').removeClass('active');
      $('.previous').removeClass('previous').removeClass('flipped').addClass('active');

      prevComponent.self.prev('.flip-up-component-wrapper').addClass('previous');
      prevComponent.self.css('z-index', '');
    }
    if (timeout != 0 && direction == 'up') {
      component.self.addClass('flipped');
      component.self.removeClass('active').css('z-index', 1000);

      if (component.self.next('.flip-up-component-wrapper')[0]) {
        setTimeout(function() {
          $('.previous').removeClass('previous');
          component.self.addClass('previous');
          component.self.next('.flip-up-component-wrapper').addClass('active');
        }, timeout || 500);
      }
    } else if (timeout != 0 && direction == 'down') {
      var prevComponent;
      prevComponent = components[component.index - 1];
      $('.active').removeClass('active');
      $('.previous').removeClass('previous').removeClass('flipped').addClass('active');

      prevComponent.self.prev('.flip-up-component-wrapper').addClass('previous');
      prevComponent.self.css('z-index', '');
    } else if (direction == 'last') {
      component.self.prev('.flip-up-component-wrapper').addClass('previous');
    }
  }

  $('.flap-info').css({ height: FlapConfiguration.background.height });

  // when the start button is clicked execute this code
  $('#start').on('click', function() {
    // hide startup elements
    $('#startup').addClass('hidden section');
    // show flap information and indicators
    $('#panel-text').removeClass('hidden section');
    $('#indicators').removeClass('hidden section');
    // show the return button
    $('#return').removeClass('hidden section');
    // fill in flap information
    changeDescription();
  });

  // when the return button is clicked execute this code
  $('#return-button').on('click', function() {
    // hide indicators/panel-text/return-button
    retButton = true;
    $('#panel-text').addClass('hidden section');
    $('#indicators').addClass('hidden section');
    $('#return').addClass('hidden section');
    // show the startup information, reset flaps
    $('#startup').removeClass('hidden section');
    autoFlip(0, currentActive);
    retButton = false;
  });

  function removeIndicators(num) {
    if (num != 0) {
      $('#i_zero').css('color', '');
    }
    if (num != 1) {
      $('#i_one').css('color', '');
    }
    if (num != 2) {
      $('#i_two').css('color', '');
    }
    if (num != 3) {
      $('#i_three').css('color', '');
    }
    if (num != 4) {
      $('#i_four').css('color', '');
    }
    if (num != 5) {
      $('#i_five').css('color', '');
    }
    if (num != 6) {
      $('#i_six').css('color', '');
    }
    if (num != 7) {
      $('#i_seven').css('color', '');
    }
    if (num != 8) {
      $('#i_eight').css('color', '');
    }
    if (num != 9) {
      $('#i_nine').css('color', '');
    }
    if (num != 10) {
      $('#i_ten').css('color', '');
    }
  }

  // dynamically change text in description, depends completely on which spread is being viewed
  function changeDescription() {
    var selector = components[currentActive].index;
    // we have 5 flaps, bottom layer=6 so it gets custom text
    var customText = 'Last Flap';
    if (selector != 6) {
      $('#custom-description').html(components[currentActive].self.data('desc'));
    } else {
      $('#custom-description').html(customText);
    }

    if (selector == 0) {
      $('#zero').removeClass('hidden');
      $('#one').addClass('hidden');
      $('#i_zero').css('color', 'yellow');
      removeIndicators(0);
    }
    if (selector == 1) {
      $('#one').removeClass('hidden');
      $('#zero').addClass('hidden');
      $('#two').addClass('hidden');
      $('#i_one').css('color', 'yellow');
      removeIndicators(1);
    }
    if (selector == 2) {
      $('#two').removeClass('hidden');
      $('#one').addClass('hidden');
      $('#three').addClass('hidden');
      $('#i_two').css('color', 'yellow');
      removeIndicators(2);
    }
    if (selector == 3) {
      $('#three').removeClass('hidden');
      $('#two').addClass('hidden');
      $('#four').addClass('hidden');
      $('#i_three').css('color', 'yellow');
      removeIndicators(3);
    }
    if (selector == 4) {
      $('#four').removeClass('hidden');
      $('#three').addClass('hidden');
      $('#five').addClass('hidden');
      $('#i_four').css('color', 'yellow');
      removeIndicators(4);
    }
    if (selector == 5) {
      $('#five').removeClass('hidden');
      $('#four').addClass('hidden');
      $('#six').addClass('hidden');
      $('#i_five').css('color', 'yellow');
      removeIndicators(5);
    }
    if (selector == 6) {
      $('#six').removeClass('hidden');
      $('#five').addClass('hidden');
      $('#seven').addClass('hidden');
      $('#i_six').css('color', 'yellow');
      removeIndicators(6);
    }
    if (selector == 7) {
      $('#seven').removeClass('hidden');
      $('#six').addClass('hidden');
      $('#eight').addClass('hidden');
      $('#i_seven').css('color', 'yellow');
      removeIndicators(7);
    }
    if (selector == 8) {
      $('#eight').removeClass('hidden');
      $('#seven').addClass('hidden');
      $('#nine').addClass('hidden');
      $('#i_eight').css('color', 'yellow');
      removeIndicators(8);
    }
    if (selector == 9) {
      $('#nine').removeClass('hidden');
      $('#eight').addClass('hidden');
      $('#i_nine').css('color', 'yellow');
      removeIndicators(9);
    }
    if (selector == 10) {
      $('#eight').removeClass('hidden');
      $('#nine').addClass('hidden');
      $('#i_ten').css('color', 'yellow');
      removeIndicators(10);
    }
  }
});
