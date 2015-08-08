$(function() {
	var $window = $(window),
		$document = $(document),
		transitionSupported = typeof document.body.style.transitionProperty === 'string',
		scrollTime = 1; // scroll time in seconds

	$("a[href=#main]").on("click", function(e) {
		var target,
			avail,
			scroll,
			deltaScroll;
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			target = $(this.hash);
			target = target.length ? target : $("[id=" + this.hash.slice(1) + "]");

			if (target.length) {
				avail = $document.height() - $window.height();

				if (avail > 0) {
					scroll = target.offset().top;
					if (scroll > avail) {
						scroll = avail;
					}
				} else {
					scroll = 0;
				}

				deltaScroll = $window.scrollTop() - scroll;

				// if we don't have to scroll because we're already at the right scrolling level, 
				if (!deltaScroll) { // do nothing
					return;
				}

				e.preventDefault();
				if (transitionSupported) {
					$("html").css({
						"margin-top": deltaScroll + "px",
						"transition": scrollTime + "s ease-in-out"
					}).data("transitioning", scroll);
				} else {
					$("html, body").stop(true, true) // stop potential other jQuery animation (assuming we're the only one doing it)
					.animate({
						scrollTop: scroll + 'px'
					}, scrollTime * 1000);
					return;
				}
			}
		}
	});

	if (transitionSupported) {
		$("html").on("transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd", function(e) {
			var $this = $(this),
				scroll = $this.data("transitioning");
			if (e.target === e.currentTarget && scroll != null) {
				$this.removeAttr("style").data("transitioning", null);
				$("html, body").scrollTop(scroll);
			}
		});
	}
});
//# sourceMappingURL=app.js.map
