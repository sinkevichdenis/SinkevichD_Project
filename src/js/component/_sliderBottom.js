(function (){
	$(document).ready(function()
	{
		$('.sliderBottom').slick(
		{
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
			responsive: 
			[
				{
				breakpoint: 1024,
				settings: 
					{
						slidesToShow: 3,
						infinite: true
					}
				}, 
				{
				breakpoint: 600,
				settings: 
					{
					slidesToShow: 2,
					dots: true
					}
				}
			]
		});
	});
})();