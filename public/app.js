document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const oldNote = event.target.closest("li").innerHTML.split("\n");
    const newTitle = prompt("Введите новое значение", oldNote[1].trim());
    if (newTitle) {
      edit(id, { title: newTitle }).then((res) => {
        oldNote[1] = newTitle;
        event.path[1].innerHTML = oldNote.join("\n");
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, body) {
  const bodyJSON = JSON.stringify(body);

  await fetch(`/${id}`, {
    method: "PUT",
    body: bodyJSON,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
