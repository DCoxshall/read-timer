function change_focus(x) {
	let new_textbox = document.getElementById(`input${x + 1}`);
	new_textbox.focus();
}
