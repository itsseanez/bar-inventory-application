document.addEventListener("DOMContentLoaded", () => {
  // Handle ALL delete buttons
  document.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const type = btn.dataset.delete; // "categories", "items", etc.

      try {
        await fetch(`/${type}/${id}`, {
          method: "DELETE"
        });

        window.location.reload();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll('[data-type]').forEach(button => {
    button.addEventListener('click', async () => {

      const type = button.dataset.type;
      const id = button.dataset.id;

      try {

        let body = {};

        // ITEMS
        if (type === "items") {
          const newName = prompt("Edit name:", button.dataset.name);
          if (!newName) return;

          const newQuantity = prompt("Edit quantity:", button.dataset.quantity);
          if (!newQuantity) return;

          body = {
            name: newName,
            quantity: newQuantity
          };
        }

        // CATEGORIES
        if (type === "categories") {
          const newName = prompt("Edit name:", button.dataset.name);
          if (!newName) return;

          body = { name: newName };
        }

        // SUBCATEGORIES
        if (type === "subcategories") {
          const newName = prompt("Edit name:", button.dataset.name);
          if (!newName) return;

          const newCategoryId = prompt("Edit category ID:", button.dataset.categoryId);
          if (!newCategoryId) return;

          body = {
            name: newName,
            category_id: newCategoryId
          };
        }

        const res = await fetch(`/${type}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });

        if (res.ok) {
          window.location.reload();
        }

      } catch (err) {
        console.error("Edit failed:", err);
      }

    });
  });

});