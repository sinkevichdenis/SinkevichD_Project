(function (){
	var elementSidebar = $(".sidebar"),
	elementButton = $(".sidebar_button"),
	elementContent = $(".content"),
	elementSubsribe = $(".header_subscribe"),
	elementPath = $("#input_name"),
	classSidebar = "sidebar__open",
	classContent = "content_screen";

	//close-open sidebar
	elementButton.on("click", moveSidebar);
	$(window).on("load", moveSidebarWidth);

	function moveSidebar()
		{
			elementSidebar.toggleClass(classSidebar);
			elementContent.toggleClass(classContent);
		}

	function moveSidebarWidth()
	{
		if (document.documentElement.clientWidth > 1000)
		{
			moveSidebar();
		}
	}

	//link from subscribe(header) to login window
	elementSubsribe.on("click", function()
	{
		$("html").animate({scrollTop: elementPath.offset().top}, 500);
		if (elementPath.parents("." + classSidebar).length === 0)
		{
			moveSidebar();
		}
		elementPath.focus();
	})

})();
