function check(checked = true) {
  const checkboxes = document.querySelectorAll('input[name="class"]');
  checkboxes.forEach((checkbox) => {
      checkbox.checked = checked;
}};