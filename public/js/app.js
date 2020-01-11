const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorHtml = document.querySelector('#ErrorMessage');
const table1 = document.querySelector('#dvTable');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    errorHtml.textContent = "Loading....";
    //table.textContent = "Could not Find any Weather Data";
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                const errorImage = document.querySelector('#errorImage');
                errorHtml.textContent = data.error;
                table1.style.visibility = 'hidden';
                /*var img = document.createElement("img");
                img.src = "/img/not-found.png";
                img.setAttribute("class", "error");
                errorImage.appendChild(img);*/
            } else {
                console.log('Test');
                table1.style.visibility = 'visible';
                errorHtml.textContent = "Below Table Contain The Weather Report";
                //Build an array containing Customer records.
                var customers = new Array();
                customers.push(["S.No", "Weather Property", "Value"]);
                customers.push([1, "Temperature", data.temparature]);
                customers.push([2, "Presure", data.presure]);
                customers.push([3, "Place", data.geoPlace]);
                customers.push([4, "Time", data.time]);
                customers.push([5, "humidity", data.humidity]);
                customers.push([6, "summary", data.summary]);
                customers.push([7, "windSpeed", data.windSpeed]);
                customers.push([8, "visibility", data.visibility]);
                customers.push([9, "Rain Probablity", data.precipProbability])
                    //Create a HTML Table element.
                var table = document.createElement("TABLE");
                table.border = "1";

                //Get the count of columns.
                var columnCount = customers[0].length;

                //Add the header row.
                var row = table.insertRow(-1);
                for (var i = 0; i < columnCount; i++) {
                    var headerCell = document.createElement("TH");
                    headerCell.innerHTML = customers[0][i];
                    row.appendChild(headerCell);
                }

                //Add the data rows.
                for (var i = 1; i < customers.length; i++) {
                    row = table.insertRow(-1);
                    for (var j = 0; j < columnCount; j++) {
                        cell = row.insertCell(-1);
                        //cell.classList.add("far fa-snowflake");
                        cell.innerHTML = customers[i][j];
                        // cell.className ="far fa-snowflake";
                        if (i == 1 && j == 2) {
                            cell.setAttribute("class", "fas fa-temperature-high");
                            cell.setAttribute("id", "cell2");
                        }
                        if (i == 2 && j == 2) {
                            cell.setAttribute("class", "fas fa-wind");
                            cell.setAttribute("id", "cell2");
                        }
                        if (i == 3 && j == 2) {
                            cell.setAttribute("class", "fas fa-map");
                            cell.setAttribute("id", "cell2");
                        }
                        if (i == 4 && j == 2) {
                            cell.setAttribute("class", "fas fa-clock");
                            cell.setAttribute("id", "cell2");
                        }
                        if (i == 5 && j == 2) {
                            cell.setAttribute("class", "fas fa-burn");
                            cell.setAttribute("id", "cell2");
                        }
                        if (i == 6 && j == 2) {
                            cell.setAttribute("class", "fas fa-sun");
                            cell.setAttribute("id", "cell2");
                        }
                        if (i == 7 && j == 2) {
                            cell.setAttribute("class", "fas fa-wind");
                            cell.setAttribute("id", "cell2");
                        }
                        if (i == 8 && j == 2) {
                            cell.setAttribute("class", "fas fa-blind");
                            cell.setAttribute("id", "cell2");
                        }
                        if (i == 9 && j == 2) {
                            cell.setAttribute("class", "fas fa-cloud-rain");
                            cell.setAttribute("id", "cell2");
                        }

                    }
                }

                var dvTable = document.getElementById("dvTable");
                dvTable.innerHTML = "";
                dvTable.appendChild(table);
                while (customers.length > 0) {
                    customers.pop();
                }
            }

        })
    })
})