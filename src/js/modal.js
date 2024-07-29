export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

export function closeModal(modal) {
  modal.classList.remove("flex");
  modal.classList.add("hidden");
}

// 綁定事件
export function bindModalEvents(openBtnId, modalId) {
  document
    .getElementById(openBtnId)
    .addEventListener("click", () => openModal(modalId));

  document.querySelectorAll(".closeModalBtn").forEach((button) => {
    button.addEventListener("click", () =>
      closeModal(button.closest(".modal")),
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll("tbody tr");

  rows.forEach((row, rowIndex) => {
    const id = rowIndex + 1;
    row.setAttribute("data-id", id);
    row
      .querySelectorAll("button.viewAdminBtn, button.editAdminBtn")
      .forEach((button) => {
        button.setAttribute("data-id", id);
      });
  });

  document
    .querySelectorAll("button.viewAdminBtn, button.editAdminBtn")
    .forEach((button) => {
      const modalIdPrefix = button.classList.contains("editAdminBtn")
        ? "edit"
        : "view";
      button.addEventListener("click", () => {
        const row = button.closest("tr");
        const id = `#${row.getAttribute("data-id")}`;
        const name = row.children[1].textContent;
        const email = row.children[2].textContent;

        const idElement = document.getElementById(`${modalIdPrefix}AdminId`);
        const nameElement = document.getElementById(
          `${modalIdPrefix}AdminName`,
        );
        const emailElement = document.getElementById(
          `${modalIdPrefix}AdminEmail`,
        );

        if (idElement && nameElement && emailElement) {
          if (modalIdPrefix === "view") {
            idElement.textContent = id;
            nameElement.textContent = name;
            emailElement.textContent = email;
          } else {
            idElement.value = id;
            nameElement.value = name;
            emailElement.value = email;
          }
          openModal(`${modalIdPrefix}AdminModal`);
        } else {
          console.error(
            `Cannot find modal elements for prefix: ${modalIdPrefix}`,
          );
        }
      });
    });
});

// 新增事件監聽器，切換 hiddenDiv 的顯示狀態
document.querySelectorAll(".toggleBtn").forEach((button) => {
  button.addEventListener("click", () => {
    const hiddenDiv = document.getElementById("hiddenDiv");
    hiddenDiv.classList.toggle("hidden");
  });
});
