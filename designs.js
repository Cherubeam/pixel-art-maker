/**
 * @file A Pixel Art Maker
 * @author Marco Braun <marco.braun@pixelartmaker.de>
 * @copyright Marco Braun 2017
 * @version 2.0
 */

/**
 * @description Creates the grid according the size the user selects.
 * <code>document.getElementsByTagName("tr")</code> makes sure to remove all of the <code>&lt;tr&gt;</code> elements if they already
 * exist, to avoid malfunction.
 */
function makeGrid() {
	if (document.getElementsByTagName("tr").length > 0) {
		$("tr").remove();
	}

	/**
	 * @description Fetch the values of both input fields and save them as variables.
	 */
	const gridHeight = $("#input_height").val();
	const gridWidth = $("#input_width").val();

	/**
	 * @description Create amount of rows the functions gets by gridHeight argument.
	 */
	for (let heightCount = 0; heightCount < gridHeight; heightCount++) {
		$("table#pixel_canvas").append("<tr></tr>");
	}

	/**
	 * @description Create amount of columns – within the created rows – the function gets by gridWidth argument.
	 */
	for (let widthCount = 0; widthCount < gridWidth; widthCount++) {
		$("table#pixel_canvas > tr").append("<td></td>");
	}

	console.log("Success: Table created!");
}

$(document).ready(function() {

	/**
	 * @description Display an alert message if the user removes the number from the input fields with <code>type='number'</code> an clicks outside the respective input field.
	 */
	$("input[type='number']").on("blur", function() {
		if(!this.value) {
			alert("Bitte eine Zahl eingeben!");
		}
	});

	/**
	 * @description Display the hexadecimal value of the selected color.
	 */
	const defaultColor = $("#colorPicker").val();
	$(".currentColor").append("Current Color: " + defaultColor);

	$("#colorPicker").change(function() {
		const pickedColor = $("#colorPicker").val();
		$(".currentColor").empty();
		$(".currentColor").append("Current Color: " + pickedColor);

		console.log("Current Color: " + pickedColor);
	});

	/**
	 * @description If the user clicks on the submit button, the makeGrid function will be called.
	 */
	$("#sizePicker").on("submit", function(event) {
		event.preventDefault();

		makeGrid();
	});

	/**
	 * @description If the user selects a color, the value will be fetched and added to the <code><td></code> element the user clicked on.
	 * Using event delegation / event bubbling in combination with <code>event.target</code> to track a click on <strong>any</strong> <code>&lt;td&gt;</code> element and
	 * to attach the user choosen <code>background-color</code> value to the <strong>specific</strong> <code>&lt;td&gt;</code> element.
	 */
	$("table#pixel_canvas").on("click", "td", function(event) {

		/**
		 * @description If a attribute is set for the <code>&lt;td&gt;</code> it will be removed. This enables the user to remove a color by clicking again.
		 */
		if($(event.target).attr("style") !== undefined) {
			$(this).removeAttr("style");
		} else {
			let pickedColor = $("#colorPicker").val();
			$(event.target).css("background-color", pickedColor);

			console.log("Picked Color: " + pickedColor)
		}
	});

	/**
	 * @description CLick and hold functionality for adding a color to muliple elements while clicking once and moving the mouse over the respective table data fields.
	 */
	var clicking = false;
	$("table#pixel_canvas").on("mousedown", "td", function() {
		clicking = true;
	});

	$("table#pixel_canvas").on("mouseup", function() {
		clicking = false;
	});

	$("table#pixel_canvas").on("mousemove", "td", function(event) {
		if(clicking == true) {
			let pickedColor = $("#colorPicker").val();
			$(event.target).css("background-color", pickedColor);
		} else {
			return;
		}
	});

	/**
	 * @description By clicking the bright button the background will be set to #fff (default value).
	 */
	 $(".bright").click(function() {
	 	$("body").css("background-color", "#fff");
	 });

	/**
	 * @description By clicking the dark button the background will be set to #393939.
	 */
	 $(".dark").click(function() {
	 	$("body").css("background-color", "#393939");
	 });

	/**
	 * @description By clicking the Fill button the user is able to fill the grid with the selected color.
	 */
	 $(".fill").click(function(){
		let pickedColor = $("#colorPicker").val();
		$("td").removeAttr("style");
		$("#pixel_canvas").css("background-color", pickedColor);

	 	console.log("Filled Color: " + pickedColor)
	 });

	/**
	 * @description By clicking the reset button the user is able to clear the table. The table will remain visible.
	 */
	 $(".reset").click(function() {
	 	$("table").removeAttr("style");
	 	$("td").removeAttr("style");
	 	// @todo: + clear blackground as well
	 });
});