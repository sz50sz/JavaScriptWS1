const target = document.querySelector("#workList");
target.innerHTML = works.map(createWorkItem).join("");