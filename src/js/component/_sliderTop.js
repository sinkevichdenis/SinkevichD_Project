(function (){
	var borderWidth,
	slideElement = document.querySelector(".sliderTop_images"),
	slideSize,
	currentPosition = 0,
	oldPositiion,
	timePeriod = 3000,
	indexInterval;

	var arrayDot= document.querySelectorAll(".sliderTop_dot"),
	arrayLayer= document.querySelectorAll(".sliderTop_layer"),
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
	window.addEventListener("load", startSlider);
	window.addEventListener("resize", restartSlider);

	function restartSlider()
	{
		slideSize = slideElement.clientHeight+1;
		console.log(slideSize);
		/*console.log(slideElement.getBoundingClientRect());*/
/*		clearInterval(indexInterval);
		slideSize = slideElement.clientHeight+1;
		while (currentPosition % slideSize !== 0)
		{
			currentPosition++;
			slideElement.scroll({top: currentPosition, behavior: "auto" });
		}
		startSlider();*/
	}

	function startSlider()
	{
		slideSize = slideElement.clientHeight-1;
		indexInterval = setInterval(function()
		{
			currentPosition += slideSize;
			if (currentPosition >= (slideElement.scrollHeight - 30))
			//30 - это погрешность, на некоторых разрешениях получается не целый размер картинки,
			//	 и слайдер делает лишний переход 
			{
				currentPosition = slideSize;
				slideElement.scroll({top: 0, behavior: "auto"});
			}
			slideElement.scroll({top: currentPosition, behavior: "smooth" });
			changeText();
		}, timePeriod);
	}

	// change text and dots on slides
	function changeText()
	{	

		if (currentPosition>=slideSize && currentPosition<slideSize*2)
		{
			console.log("!!!!!!!",currentPosition, slideSize, slideSize*2);
			console.log("11111", arrayDot[0].getBoundingClientRect());
			arrayDot[0].classList.toggle(classDot);
			arrayDot[1].classList.toggle(classDot);
			arrayLayer[0].classList.toggle(classLayer);
			arrayLayer[1].classList.toggle(classLayer);
		}
		if (currentPosition>=slideSize*2 && currentPosition<slideSize*3)
		{
			console.log("!!!!!!!",currentPosition, slideSize*2, slideSize*3);
			arrayDot[1].classList.toggle(classDot);
			arrayDot[2].classList.toggle(classDot);
			arrayLayer[1].classList.toggle(classLayer);
			arrayLayer[2].classList.toggle(classLayer);
		}
		if (currentPosition>=slideSize*3 && currentPosition<slideSize*4)
		{
			console.log("!!!!!!!",currentPosition, slideSize*3, slideSize*4);
			arrayDot[2].classList.toggle(classDot);
			arrayDot[0].classList.toggle(classDot);
			arrayLayer[2].classList.toggle(classLayer);
			arrayLayer[0].classList.toggle(classLayer);
		}
	}

	//script for slider's control buttons
	document.querySelectorAll(".sliderTop_buttons").forEach(function (element)
	{

	})

})();
