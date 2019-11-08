const submitButton = document.querySelector("#submit");
const inputs = document.querySelectorAll("input");

// Saves to local so P5 can pick it up (? can it? )
function handleSubmit(e) {
    let data = createGeometryData();
    window.localStorage.setItem("geometryData", JSON.stringify(data));
}

// inefficiently saving things that don't change! Whatever, it's small. we'll fix it.

// Snags the inputs' data and returns object of the geo specs and data.
function createGeometryData() {
    let data = {};

    inputs.forEach(input => {
        data[input.name] = input.value;
    });

    return data;
}

submitButton.addEventListener("click", handleSubmit);