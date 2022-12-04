const addbtn = document.querySelector("#addbtn");
btn.addEventListener("click", (event) => {
  let checkboxes = document.querySelectorAll('input[name="class"]:checked');
  let values = [];
  checkboxes.forEach((checkbox) => {
    values.push(checkbox.value);
  });
});
