"use strict";

$(() => {
    $("#caricaDrivers").on("click", () => {
        $("#wrapper").empty();
        $("#info").empty();
        richiesta("/drivers/list", data => {
            //console.log(data);
            creaTabellaDrivers(data);
        });
    });
    
    $("#caricaTeams").on("click", () => {
        $("#wrapper").empty();
        $("#info").empty();
        richiesta("/teams/list", data => {
            //console.log(data);
            creaTabellaTeams(data);
        });
    });

    $("#caricaCircuits").on("click", () => {
        $("#wrapper").empty();
        $("#info").empty();
        richiesta("/circuits/list", data => {
            //console.log(data);
            creaTabellaCircuits(data);
        });
    });

});

function creaTabellaDrivers(drivers)
{
    let _table = $("<table>").addClass("table");
    _table.append($("<tr id='trI'><td class='table-primary'>ID</td><td class='table-active'>First Name</td><td class='table-active'>Last Name</td><td class='table-active'>Nationality</td><td class='table-active'>Photo</td></tr>"));
    for (let i = 0; i < drivers.length; i++)
    {
        let row = $("<tr>");
        for (let index in drivers[i])
        {
            let cell = $("<td>");
            if (index != "img")
            {
                cell.text(drivers[i][index]);
                row.append(cell);
            }
            else
            {
                let _img = $("<img>");
                _img.prop("src", drivers[i][index]);
                _img.prop("height", "50").css("margin-left","8px");
                row.append(_img);
            }
        }
        let btnInfo = $(`<input type='button' onclick='visualizzaDriver(${drivers[i]["id"]})' value='Info' class="btn btn-info">`).css("margin-left", "20px").on("click",()=>alert("Dati caricati correttamente a fondo pagina!"));

        row.append(btnInfo);
        _table.append(row);

    }
    $("#wrapper").append(_table);
}

function visualizzaDriver(_driverId)
{
    let _info = $("#info");
    _info.empty();
    richiesta(`/drivers/${_driverId}`, data => {
        console.log(data);
        let nome = data["firstname"];
        let cognome = data["lastname"];
        let foto = data["img"];
        let dob = data["dob"];
        let luogoNascita = data["placeOfBirthday"];
        let desc = data["description"];
        let nazionalita = data["country"]["countryName"];
        _info.append($(`<h1>${nome} ${cognome}</h1>`));

        let _div = $("<div class='row'></div>");
        _div.append($("<div class='col-sm-4'></div>"));
        let _p = $(`<p class="col-sm-4"><b>Date of Birth:</b> ${dob.split('T')[0]}</p>`);
        _div.append(_p);
        _info.append(_div);
        _div = $("<div class='row'></div>");
        _div.append($("<div class='col-sm-4'></div>"));
        _p = $(`<p class="col-sm-4"><b>Place of Birth:</b> ${luogoNascita}</p>`);
        _div.append(_p);
        _info.append(_div);
        _div = $("<div class='row'></div>");
        _div.append($("<div class='col-sm-4'></div>"));
        _p = $(`<p class="col-sm-4"><b>Nationality:</b> ${nazionalita}</p>`);
        _div.append(_p);
        _info.append(_div);

        _div = $("<div class='row'></div>");
        _div.append($("<div class='col-sm-2'></div>"));
        let _img = $("<img class='col-sm-3 img-responsive'>");
        _img.prop("src", foto);
        _img.css("max-height", "15em");
        _img.css("max-width", "15em");
        _div.append(_img);
        _p = $(`<p class="col-sm-6">${desc}</p>`);
        _div.append(_p);
        _info.append(_div);
        _info.append($("<div id='farlocs'></div>"));
    });
}

function creaTabellaTeams(teams) {
    let _table = $("<table>").addClass("table");;
    _table.append($("<tr id='trI'><td class='table-primary'>ID</td><td class='table-active'>Name</td><td class='table-active'>Country</td><td class='table-active'>Logo</td><td class='table-active'>First Driver</td><td class='table-active'>Second Driver</td><td class='table-active'>Car Photo</td></tr>"));
    for (let i = 0; i < teams.length; i++) {
        let row = $("<tr>");
        for (let index in teams[i]) {
            let cell = $("<td>");
            if (index != "img" && index!="logo") {
                cell.text(teams[i][index]);
                console.log(index);
                if (index == "firstdriver")
                    cell.css("border-left", "1px solid black");
                row.append(cell);
            }
            else {
                if (index == "logo") {
                    let _div = $("<div>");
                    let _img = $("<img>");
                    _img.prop("src", teams[i][index]);
                    _img.prop("height", "50");
                    _div.append(_img).addClass("text-center");
                    row.append(_div);
                }

                else {
                    let _img = $("<img>");
                    _img.prop("src", teams[i][index]);
                    _img.prop("height", "50");
                    row.append(_img);
                }
            }
        }
        let btnInfo = $(`<input type='button' onclick='visualizzaTeam(${teams[i]["id"]})' value='Info' class="btn btn-info">`).css("margin-left", "20px");
        row.append(btnInfo);
        _table.append(row);

    }
    $("#wrapper").append(_table);
}

function visualizzaTeam(_teamId) {
    let _info = $("#info");
    _info.empty();
    richiesta(`/teams/${_teamId}`, data => {
        console.log(data);
        let chassis = data["chassis"];
        let paese = data["country"]["countryName"];
        let primoDriver = data["firstDriver"]["firstname"] + " " + data["firstDriver"]["lastname"];
        let nomeCompleto = data["fullTeamName"];
        let foto = data["img"];
        let logo = data["logo"];
        let nome = data["name"];
        let powerUnit = data["powerUnit"];
        let technicalChief = data["technicalChief"];
        let secondoDriver = data["secondDriver"]["firstname"] + " " + data["secondDriver"]["lastname"];

        let _div = $("<div class='row'></div>");
        _div.append($("<div class='col-sm-3'></div>"));

        _div.append($(`<h1 class='col-sm-4' style='line-height:150px'>${nome}</h1>`));



        let _img = $("<img>");
        _img.prop("src", logo);
        _img.prop("height", "150");
        _div.append(_img);
        _info.append(_div);

        _div = $("<div class='row'></div>");
        _div.append($("<div class='col-sm-4'></div>"));
        let _p = $(`<p class="col-sm-4"><b>Full team Name:</b> ${nomeCompleto}</p>`);
        _div.append(_p);
        _info.append(_div);


        _div = $("<div class='row'></div>");
        _div.append($("<div class='col-sm-4'></div>"));
        _p = $(`<p class="col-sm-4"><b>Country:</b> ${paese}</p>`);
        _div.append(_p);
        _info.append(_div);

        _div = $("<div class='row'></div>");
        _div.append($("<div class='col-sm-4'></div>"));
        _p = $(`<p class="col-sm-4"><b>Chassis:</b> ${chassis}</p>`);
        _div.append(_p);
        _info.append(_div);

        _div = $("<div class='row'></div>");
        _div.append($("<div class='col-sm-4'></div>"));
        _p = $(`<p class="col-sm-4"><b>Power unit:</b> ${powerUnit}</p>`);
        _div.append(_p);
        _info.append(_div);

        _div = $("<div class='row'></div>");
        _div.append($("<div class='col-sm-4'></div>"));
        _p = $(`<p class="col-sm-4"><b>Technical Chief:</b> ${technicalChief}</p>`);
        _div.append(_p);
        _info.append(_div);

        _div = $("<div class='row'></div>");
        _div.append($("<div class='col-sm-4'></div>"));
        _p = $(`<p class="col-sm-4"><b>Drivers:</b> ${primoDriver}, ${secondoDriver}</p>`);
        _div.append(_p);
        _info.append(_div);

        _img = $("<img>");
        _img.prop("src", foto);
        _img.prop("height", "150");
        _info.append($("<center>").append(_img));
    });
}

function creaTabellaCircuits(circuits) {
    let _table = $("<table>").addClass("table");;
    _table.append($("<tr id='trI'><td class='table-primary'>ID</td><td class='table-active'>Name</td><td class='table-active'>Length (m)</td><td class='table-active'>Number of Laps</td><td class='table-active'>Country</td><td class='table-active'>Photo</td></tr>"));
    for (let i = 0; i < circuits.length; i++) {
        let row = $("<tr>");
        for (let index in circuits[i]) {
            if (index == "recordLap")
                continue;
            let cell = $("<td>");
            if (index != "img") {
                if (index == "country")
                    cell.text(circuits[i][index]["countryName"]);
                else
                    cell.text(circuits[i][index]);
                row.append(cell);
            }
            else {
                let _div=$("<div>")
                let _img = $("<img>");
                _img.prop("src", circuits[i][index]);
                _img.prop("height", "50");
                _div.append(_img).addClass("text-center");
                row.append(_div);
            }
        }
        _table.append(row);

    }
    $("#wrapper").append(_table);
}

function richiesta(parameters,callbackFunction) {
    let _richiesta = $.ajax({
        url: "api" + parameters,
        type: "GET",
        data: "",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        timeout: 5000,
    });

    _richiesta.done(callbackFunction);
    _richiesta.fail(error);
}

function error(jqXHR, testStatus, strError) {
    $("#table thead").html("");
    $("#table tbody").html("Impossibile trovare la risorsa richiesta");
    if (jqXHR.status == 0)
        console.log("server timeout");
    else if (jqXHR.status == 200)
        console.log("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        console.log("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
};

