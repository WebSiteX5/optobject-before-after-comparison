$(document).ready(function () {

	// Automatic on mouse hover
	$( ".beforeAfter-hover" ).each(function () {
		var $this = $( this );
		var img2 = $this.find( ".img2" ).get( 0 );
		var img1 = $this.find( ".img1" ).get( 0 );
		var border = $this.find( ".border" ).get( 0 );

		function trackLocation(e) {
			var rect = img1.getBoundingClientRect();
			var position = ( (e.pageX - rect.left - $(window).scrollLeft()) / img1.offsetWidth ) * 100;
			if ( position <= 100 ) {
				img2.style.width = position + "%";
				border.style.left = position + "%";
			}
		}

		img2.style.width = "50%";
		border.style.left = "50%";
		$this.on( "mousemove", trackLocation );
		$this.get( 0 ).addEventListener( "touchstart", trackLocation, false );
		$this.get( 0 ).addEventListener( "touchmove", trackLocation, false );
	});

	// Slide with handle
	$( ".beforeAfter-slide" ).each(function () {
		var $this = $( this );
		var img2 = $this.find( ".img2" ).get( 0 );
		var img1 = $this.find( ".img1" );
		var border = $this.find( ".border" ).get( 0 );
		var handle = $this.find( ".handle" );
		var scroll = false;

		var src = img1.attr("src");
		img1.attr( "src", "" ).on("load", function () {
			handle.css({
				"top": ( $(img1).height() / 2 - handle.height() / 2 ) + "px",
				"left": ( $this.width() / 2 - handle.width() / 2 ) + "px"
			});
			img2.style.width = "50%";
			border.style.left = "50%";
		}).attr( "src", src );

		function trackLocation(e) {
			if (scroll) {
				rect = img1.get( 0 ).getBoundingClientRect();
				var position = ( (e.pageX - rect.left - $(window).scrollLeft()) / img1.get(0).offsetWidth ) * 100;
				if ( position <= 100 ) {
					img2.style.width = position + "%";
					border.style.left = position + "%";
					handle.get( 0 ).style.left = (e.pageX - rect.left - $(window).scrollLeft() - handle.width() / 2) + "px";
				}
			}
		}

		handle.on("mousedown", function () { scroll = true }).on( "mouseup", function () { scroll = false });
		$this.on("mouseleave mouseup", function () { scroll = false; });

		$this.on( "mousemove", trackLocation );
		$this.get( 0 ).addEventListener( "touchstart", trackLocation, false);
		$this.get( 0 ).addEventListener( "touchmove", trackLocation, false);
	});

	// Slide with handle
	$( ".beforeAfter-fade" ).each(function () {
		var $this = $( this );
		var img2 = $this.find( ".img2" ).get( 0 );
		var img1 = $this.find( ".img1" );
		var border = $this.find( ".border" ).get( 0 );
		var handle = $this.find( ".handle" );
		var body = $( "body" );
		var scroll = false;

		var src = img1.attr("src");
		img1.attr( "src", "" ).on("load", function () {
			handle.css({
				"left": ($this.width() / 2 - handle.width() / 2) + "px",
				"top": "auto",
				"bottom": "-25px"
			});
			$(border).css({
				width: "100%",
				height: "1px",
				top: "auto",
				left: 0,
				bottom: "-15px"
			});
		}).attr( "src", src );
		img2.style.width = "100%";
		img2.style.opacity = 0.5;

		function trackLocation(e) {
			if (scroll) {
				rect = img1.get( 0 ).getBoundingClientRect();
				var position = ( (e.pageX - rect.left - $(window).scrollLeft()) / img1.get(0).offsetWidth );
				if ( position >= 0 && position <= 1 ) {
					$(img2).css( "opacity", position );
					handle.get( 0 ).style.left = (e.pageX - rect.left - $(window).scrollLeft() - handle.width() / 2) + "px";
				}
			}
		}

		handle.on("mousedown", function () {
			scroll = true;
			body.one("mouseup", function () {
				scroll = false;
			});
		});
		body.on( "mouseleave", function () { scroll = false; });

		body.on( "mousemove", trackLocation);
		$this.get( 0 ).addEventListener( "touchstart", trackLocation, false);
		$this.get( 0 ).addEventListener( "touchmove", trackLocation, false);
	});
});
