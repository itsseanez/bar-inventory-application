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