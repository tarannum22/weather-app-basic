console.log("This is the weather App");

// Select the form element using its ID
const form = document.getElementById("weatherForm");

async function handleRequest() {
  // Prevent default form submission behavior (optional)
  event.preventDefault(); // Assuming this is called from a button inside the form
  console.log("Calling API");

  // Get Lat and Long values from the form
  const lat = document.getElementById("latitude").value;
  const long = document.getElementById("longitude").value;
  const messageElement = document.getElementById("message");

  try {
    //Create the URL using user input
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m`;

    // Make the fetch call to weather API using async/await
    const response = await fetch(url);

    if (!response.ok) {
      // Handle non-200 status codes
      const error = new Error(`Fetch API error: ${response.status}`);
      error.status = response.status;
      throw error;
    }

    const data = await response.json(); // Assuming the response is text
    const temperature = data.current.temperature_2m;

    // Handle the fetched data (e.g., display it in the message element)
    messageElement.textContent = `Temperature is: ${temperature}`;
  } catch (error) {
    // Handle errors during the fetch call
    messageElement.textContent = `${error}`;
  }
}
