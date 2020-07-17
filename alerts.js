const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (msg, type) => {
  hideAlert();
  const markup = `<div class='${type}-alert alert'>${msg}</div>`;

  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  setTimeout(() => hideAlert(), 4000);
};

export default showAlert;
