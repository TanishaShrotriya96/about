// Loads each project card from partials/ into #project-list.
// To add a project: create partials/<name>.html and add its path below.
(function () {
  var projects = [
    "partials/freebib.html"
    // "partials/nextproject.html",
  ];

  var container = document.getElementById("project-list");
  if (!container) return;

  // Fetch all cards in parallel, but insert them in the order listed above.
  Promise.all(
    projects.map(function (file) {
      return fetch(file).then(function (r) {
        if (!r.ok) throw new Error(file + " returned " + r.status);
        return r.text();
      });
    })
  )
    .then(function (cards) {
      container.insertAdjacentHTML("beforeend", cards.join("\n"));
    })
    .catch(function (err) {
      console.error("Could not load project cards:", err);
    });
})();
