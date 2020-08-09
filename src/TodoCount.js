export default function TodoCount(
  $todoCount,
  { parentRender, getFilteredItem }
) {
  this.changeSelected = (filter) => {
    filter = filter.replace("todo-filter", "").trim();
    const $target = $todoCount.querySelector(`.${filter}`);
    $todoCount.querySelector(".selected").classList.remove("selected");
    $target.classList.add("selected");
    parentRender(getFilteredItem(filter));
  };

  $todoCount.addEventListener("click", (event) => {
    const $target = event.target;

    if ($target.classList.contains("todo-filter")) {
      this.changeSelected($target.className);
    }
  });

  this.render = (count) => {
    $todoCount.querySelector(".todo-count strong").textContent = count;
  };
}
