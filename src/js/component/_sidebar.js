(function (){
	var elementSidebar = $(".sidebar"),
	elementButton = $(".sidebar_button"),
	elementContent = $(".content"),
	classSidebar = "sidebar__open",
	classContent = "content_screen";

	elementButton.on("click", hideSidebar);
	window.addEventListener("load", hideSidebarWindow);

	function hideSidebar()
		{
			elementSidebar.toggleClass(classSidebar);
			elementContent.toggleClass(classContent);
		}

	function hideSidebarWindow()
	{
		if (document.documentElement.clientWidth > 1000)
		{
			hideSidebar();
		}
	}

})();
