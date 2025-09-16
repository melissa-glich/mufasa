document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("roarButton");
  const headline = document.getElementById("headline");

  if (button && headline) {
    button.addEventListener("click", () => {
      headline.textContent = "ROAAARRR!!! 🦁🔥";
      alert("Mufasa is roaring!");
    });
  }
});
