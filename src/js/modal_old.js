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
    // 設置每個 <tr> 的 data-id
    row.setAttribute("data-id", rowIndex + 1);

    // 遍歷該 <tr> 中的所有按鈕，並設置相同的 data-id
    const buttons = row.querySelectorAll(
      "button.viewAdminBtn, button.editAdminBtn",
    );
    buttons.forEach((button) => {
      button.setAttribute("data-id", rowIndex + 1);
    });
  });

  const buttons = [
    ...document.querySelectorAll("button.viewAdminBtn, button.editAdminBtn"),
  ];

  buttons.forEach((button) => {
    const modalIdPrefix = button.classList.contains("editAdminBtn")
      ? "edit"
      : "view";
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      const id = `#${row.getAttribute("data-id")}`;
      const name = row.children[1].textContent;
      const email = row.children[2].textContent;

      const idElement = document.getElementById(`${modalIdPrefix}AdminId`);
      const nameElement = document.getElementById(`${modalIdPrefix}AdminName`);
      const emailElement = document.getElementById(
        `${modalIdPrefix}AdminEmail`,
      );

      if (modalIdPrefix === "view") {
        if (idElement && nameElement && emailElement) {
          idElement.textContent = id;
          nameElement.textContent = name;
          emailElement.textContent = email;
        } else {
          console.error(
            `Cannot find modal elements for prefix: ${modalIdPrefix}`,
          );
        }
      } else if (modalIdPrefix === "edit") {
        if (idElement && nameElement && emailElement) {
          idElement.value = id;
          nameElement.value = name;
          emailElement.value = email;
        } else {
          console.error(
            `Cannot find modal elements for prefix: ${modalIdPrefix}`,
          );
        }
      }

      openModal(`${modalIdPrefix}AdminModal`);
    });
  });
});
