(function (){
	var borderWidth;
	
	//change shadow's size on the slaider
	window.addEventListener("resize", sizeShadow);
	window.addEventListener("load", sizeShadow) ;

	function sizeShadow ()
	{
		borderWidth = document.querySelector(".sliderTop_images");
		borderWidth = parseInt(getComputedStyle(borderWidth).height);

		$(".sliderTop_shadow").css("border-bottom-width", borderWidth + 400);
		$(".sliderTop_shadow").css("border-right-width", borderWidth);
	}


})();
