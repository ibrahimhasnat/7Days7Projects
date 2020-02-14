// UI
const search = document.getElementById("search");
const result = document.getElementById("result");

// Search State
const searchStates = async name => {
  const res = await fetch("../data/states.json");
  const states = await res.json();

  let matches = states.filter(state => {
    const re = new RegExp(`^${name}`, "gi");
    return state.name.match(re) || state.abbr.match(re);
  });

  if (name.length === 0) {
    matches = [];
    result.innerHTML = "";
  }

  // HTML Output
  if (matches.length > 0) {
    const format = matches
      .map(
        match => `
    <div class="state-card">
        <h4>State: ${match.name} - <small>${match.abbr}</small></h4>
        <h5>Capital: ${match.capital}</h5>
    </div>
`
      )
      .join("");

    result.innerHTML = format;
  }
};

search.addEventListener("keyup", () => searchStates(search.value));
