document.querySelector(".hamburger").addEventListener("click", function() {
  let hidden = document.querySelector('.about_me');
  hidden.classList.toggle("hidden");
});

document.querySelector(".hamburger").addEventListener("click", function() {
  let croix = document.querySelectorAll('i');
  for (let i = 0; i < croix.length; i++) {
    croix[i].classList.toggle("active");
  }
});

// SLIDER
const leftButton = document.querySelector('.arrow.left');
const rightButton = document.querySelector('.arrow.right');

leftButton.addEventListener('click', () => {
	turnSlider('left');
});

rightButton.addEventListener('click', () => {
	turnSlider('right');
});

function turnSlider(direction) {
	const slides = document.querySelectorAll(`.slide`);
	slides.forEach(slide => {
		let currentSlide = +(slide.classList + '').split('-')[1];
		let slideToBe;
		switch(direction) {
			case 'left': {
				slideToBe = currentSlide - 1;
				if(slideToBe < 1) {
					slideToBe = slides.length;
					slide.style.left = '-500px';
				}
				break;
			}
			case 'right': {
				slideToBe = currentSlide + 1;
				if(slideToBe > slides.length) {
					slideToBe = 1;
					slide.style.left = '2000px';
				}
				break;
			}
		}
		slide.classList.remove(`slide-${currentSlide}`);
		slide.classList.add(`slide-${slideToBe}`);
	});
}

// SKILLBAR
jQuery(document).ready(function() {
  jQuery(document).on('scroll', function(){
    if(jQuery('html,body').scrollTop() > jQuery('#first-sec').height()){
      jQuery(".skillbar").each(function() {
        jQuery(this).find(".skillbar-bar").animate({
          width: jQuery(this).attr("data-percent")
        },2000);

        jQuery(this).find(".skillbar-bar").animate({
          left: jQuery(this).attr("data-percent")
        },{
          duration: 3000,
          step: function(now, fx) {
            var data = Math.round(now);
            jQuery(this).find(".skillbar-bar").html(data + "%");
          }
        });
      });
    }
  });
});
