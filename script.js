document.getElementById("modeToggle").addEventListener("change", function () {
  alert("Theme toggle not implemented yet! (But can be)");
});


document.querySelectorAll(".subject").forEach(btn => {
  btn.addEventListener("click", () => {
    const subject = btn.textContent.trim();
    alert(`You selected: ${subject}\nQuiz will start here.`);
  });
});
