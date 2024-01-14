document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  // prevent reset page when we submit;
  let name = document.querySelector("#name").value;
  let item = {
    id: new Date().toISOString(),
    name: name.trim(),
  };
});
// getlist(): recieve one list when user input;
const getlist = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
};
// function receive
