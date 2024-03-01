# JSHelpers

JSHelpers is a collection of useful JavaScript classes that can be used in various projects.

## Installation

You can include individual classes from this repository by directly referencing the script files in your HTML

## ClassObserver

ClassObserver is a utility class that watches for changes in a specified class on a target node and triggers callbacks accordingly.

### Usage

1. Include the `ClassObserver` class in your project.

```html
<script src="https://cdn.jsdelivr.net/gh/LFebruary/JSHelpers@release/v0.0.2/src/class_observer.js"></script>
```

2. Instantiate the ClassObserver class with the required parameters:

```javascript
let targetElement = document.getElementById("labelToUpdate");

function onClassAdded() {
  console.log('"class-that-gets-dynamically-added" class got added to label');
}

function onClassRemoved() {
  console.log(
    '"class-that-gets-dynamically-added" class has been removed from label',
  );
}

// Create a new ClassObserver instance
const observer = new ClassObserver(
  targetElement, // The target node to observe
  "class-that-gets-dynamically-added", // The class to watch for changes
  onClassAdded, // Callback function when the class is added
  onClassRemoved, // Callback function when the class is removed
);

// Initialize the observer
observer.init();
```

3. Call the disconnect() method to stop observing changes when no longer needed:

```javascript
// Disconnect the observer before the page unloads
window.onbeforeunload = function () {
  // Disconnect the observer
  observer.disconnect();
};

// OR explicitly stop observing changes
observer.disconnect();
```

### Example

```html
<div id="target" class="watched-class">Target Node</div>
<button id="btnToggleClass" onclick="toggleClass()">
  Toggle class on button
</button>

<script>
  function toggleClass() {
    let divToWatch = document.getElementById("target");
    if (divToWatch.classList.contains("watched-class")) {
      divToWatch.classList.remove("watched-class");
    } else {
      divToWatch.classList.add("watched-class");
    }
  }

  // Define callback functions
  function onClassAdded() {
    console.log("Class added!");
  }

  function onClassRemoved() {
    console.log("Class removed!");
  }

  // Create ClassObserver instance
  const observer = new ClassObserver(
    document.getElementById("target"),
    "watched-class",
    onClassAdded,
    onClassRemoved,
  );

  // Initialize observer
  observer.init();
</script>
```

## Will soon be available to npm
