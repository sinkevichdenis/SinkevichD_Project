(function (){
	var borderWidth,
	slideElement = document.querySelector(".sliderTop_images"),
	slideSize,
	currentPosition = 0,
	normalTimePeriod = 3000,
	resizeTimePeriod = 100,
	indexInterval,
	indexImage = 0;

	var arrayDot= $(".sliderTop_dot"),
	arrayLayer= $(".sliderTop_layer"),
	classDot = "sliderTop_dot__visible",
	classLayer= "style_layer__visible";

	//change shadow's size on the slider
	window.addEventListener("resize", resizeShadow);
	window.addEventListener("load", resizeShadow);

	function resizeShadow ()
	{
		borderWidth = document.querySelector(".sliderTop_images");
		borderWidth = parseInt(getComputedStyle(borderWidth).height);

		$(".sliderTop_shadow").css("border-bottom-width", borderWidth + 400);
		$(".sliderTop_shadow").css("border-right-width", borderWidth);
	}

	//slider's work - change images
	window.addEventListener("load", restartSlider);
	window.addEventListener("resize", restartSlider);

	function restartSlider()
	{
		clearInterval(indexInterval);
		slideSize = slideElement.clientHeight;
		currentPosition = indexImage*slideSize;
		startSlider(resizeTimePeriod, "auto");
	}

	function startSlider(time, type)
	 {
		slideSize = slideElement.clientHeight;

		indexInterval = setInterval(function()
		{
			currentPosition += slideSize;
			if (currentPosition >= (slideElement.scrollHeight - 30))
			//30 - это погрешность, на некоторых разрешениях получается не целый размер картинки,
			//	 и слайдер делает лишний переход 
			{
				currentPosition = slideSize;
				slideElement.scroll({top: 0, behavior: "auto"});
				indexImage = 0;
			}
			slideElement.scroll({top: currentPosition, behavior: type});
			indexImage++;
			changeText();

			if (time === resizeTimePeriod)
			{
				clearInterval(indexInterval);
				startSlider(normalTimePeriod, "smooth");
			}
		}, time);
	}

	// change text and dots on slides
	function changeText()
	{	
		switch (indexImage)
		{
			case 1:
				arrayDot[0].classList.toggle(classDot);
				arrayDot[1].classList.toggle(classDot);
				arrayLayer[0].classList.toggle(classLayer);
				arrayLayer[1].classList.toggle(classLayer);
				break;

			case 2:
				arrayDot[1].classList.toggle(classDot);
				arrayDot[2].classList.toggle(classDot);
				arrayLayer[1].classList.toggle(classLayer);
				arrayLayer[2].classList.toggle(classLayer);
				break;

			case 3:
				arrayDot[2].classList.toggle(classDot);
				arrayDot[0].classList.toggle(classDot);
				arrayLayer[2].classList.toggle(classLayer);
				arrayLayer[0].classList.toggle(classLayer);
				break;
		}
	}

	//script for slider's control buttons
	document.querySelectorAll(".sliderTop_buttons").forEach(function (element)
	{
		document.querySelector(".go-up").onclick = function ()
		{
			currentPosition += slideSize;
			restartSlider();
		};
		document.querySelector(".go-down").onclick = function ()
		{
			currentPosition -= currentPosition - slideSize;
			restartSlider();
		};	
	})

})();
