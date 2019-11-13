const submitButton = document.querySelector("#submit");
const inputs = document.querySelectorAll("input");

// Saves to local so P5 can pick it up (? can it? )
function handleSubmit(e) {
    let data = createGeometryData();
    window.localStorage.setItem("geometryData", JSON.stringify(data));
}

// inefficiently saving things that don't change! Whatever, it's small. we'll fix it.
// This also is not particularly modular, we'll need to fix. 
// As it stands, it does return two modular objects that are identical in structure. 
// Easier to handle in P5

// Snags the inputs' data and returns object of the geo specs and data.
function createGeometryData() {
    let data = {
        one: {},
        two: {}
    };

    inputs.forEach(input => {
        if (input.name.includes("1")) {
            data.one[input.name.slice(0, -1)] = input.value;
        } else {
            data.two[input.name.slice(0, -1)] = input.value;
        }
    });

    return data;
}

submitButton.addEventListener("click", handleSubmit);