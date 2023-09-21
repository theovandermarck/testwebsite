// Replace the previous code with this
const leaderboardDiv = document.getElementById("leaderboard");
const newDataList = [];
fetch("https://titleid.playfabapi.com/Server/GetLeaderboard", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-SecretKey": "EKPUCDUBZ1ROIB9KSBXXYKRJ3Z3J3D5XBF6YXCSX4761E1FEUZ",
  },
  body: JSON.stringify({
    MaxResultsCount: 100,
    StartPosition: 0,
    StatisticName: "High Score",
    CustomTags: {},
    ProfileConstraints: null,
    UseSpecificVersion: false,
    Version: null,
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(
        `Error in response: ${response.status} ${response.statusText}`
      );
    }
    return response.json();
  })
  .then((data) => {
    console.log(data); // Log the received data to the console

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    var tof = false;
    // Create the table headers
    const headerRow = document.createElement("tr");
    const headers = ["Place", "Name", "Score"];
    for (const header of headers) {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);
    console.log(data);
    for (let i = 0; i < data["data"]["Leaderboard"].length; i++) {
      for (let o = 0; o < newDataList.length; o++) {
        // if (
        //   data["data"]["Leaderboard"][i]["DisplayName"] ==
        //   newDataList[o]["DisplayName"]
        // ) {
        //   tof = true;
        //   console.log("EEEEE");
        // }
      }
      if (data["data"]["Leaderboard"][i]["DisplayName"] && tof == false) {
        newDataList.push(data["data"]["Leaderboard"][i]);
        console.log(data["data"]["Leaderboard"][i]["DisplayName"]);
      }
      tof = false;
    }
    // console.log(newDataList);
    // Populate the table with data
    for (let i = 0; i < newDataList.length; i++) {
      const row = document.createElement("tr");
      const place = document.createElement("td");
      place.textContent = i + 1;
      const displayName = document.createElement("td");
      displayName.textContent = newDataList[i]["DisplayName"];
      const statValue = document.createElement("td");
      statValue.textContent = newDataList[i]["StatValue"];

      row.appendChild(place);
      row.appendChild(displayName);
      row.appendChild(statValue);
      tbody.appendChild(row);
    }
    table.appendChild(tbody);
    leaderboardDiv.appendChild(table);
  })
  .catch((error) => {
    console.error("Error:", error); // Log the error to the console
  });
