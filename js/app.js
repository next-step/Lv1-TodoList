
	const input = document.getElementById("new-todo-title");
	const todo = document.getElementById("todo-list");

	input.addEventListener("keydown", v => {
		if(v.key === "Enter"){
			console.log(v.key === "Enter");
			const li = document.createElement("li");
			const div = document.createElement("div");
			const toggleinput = document.createElement("input");
			const label =  document.createElement("label");
			const button = document.createElement("button");
			const editinput = document.createElement("input");

			div.setAttribute("class", "view");
			toggleinput.setAttribute("class", "toggle");
			toggleinput.setAttribute("type", "checkbox");
			label.setAttribute("class", "label");
			button.setAttribute("class", "destroy");
			editinput.setAttribute("class", "edit");

			label.innerHTML = input.value;

			div.append(toggleinput, label, button);
			li.append(div, editinput);
			todo.append(li);

			input.value = "";
		}
	})