export default function () {
	var $anchorLinks  = $('.navigation__link');

	$(window).on('scroll', function () {
		$anchorLinks.each(function () {
			var $this = $(this);
			// Get section name
			var anchor = $this.attr('href');
			var section = $(anchor);
			// Offsets
			var windowTop = window.pageYOffset;
			var sectionTop = section.offset().top;
			// Add or remove an active class from nav link
			if (windowTop > sectionTop-1) {
				$anchorLinks.removeClass('navigation__link--active');
				$this.addClass('navigation__link--active');
			} else{
				$this.removeClass('navigation__link--active');
			}
		});
	})
}