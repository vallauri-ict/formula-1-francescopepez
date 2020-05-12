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
    let _table = $("<table>");
    _table.append($("<tr><td>ID</td><td>First Name</td><td>Last Name</td><td>Nationality</td><td>Photo</td></tr>"));
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
                _img.prop("height", "50");
                row.append(_img);
            }
        }
        let btnInfo = $(`<input type='button' onclick='visualizzaDriver(${drivers[i]["id"]})' value='Info'>`);
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
        let _p = $(`<p>Date of Birth: ${dob.split('T')[0]}</p>`);
        _info.append(_p);
        _p = $(`<p>Place of Birth: ${luogoNascita}</p>`);
        _info.append(_p);
        _p = $(`<p>Nationality: ${nazionalita}</p>`);
        _info.append(_p);
        let _img = $("<img>");
        _img.prop("src", foto);
        _img.prop("height", "150");
        _info.append(_img);
        _p = $(`<p>${desc}</p>`);
        _info.append(_p);
    });
}

function creaTabellaTeams(teams) {
    let _table = $("<table>");
    _table.append($("<tr><td>ID</td><td>Name</td><td>Country</td><td>Logo</td><td>First Driver</td><td>Second Driver</td><td>Car Photo</td></tr>"));
    for (let i = 0; i < teams.length; i++) {
        let row = $("<tr>");
        for (let index in teams[i]) {
            let cell = $("<td>");
            if (index != "img" && index!="logo") {
                cell.text(teams[i][index]);
                row.append(cell);
            }
            else {
                let _img = $("<img>");
                _img.prop("src", teams[i][index]);
                _img.prop("height", "50");
                row.append(_img);
            }
        }
        let btnInfo = $(`<input type='button' onclick='visualizzaTeam(${teams[i]["id"]})' value='Info'>`);
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

        _info.append($(`<h1>${nome}</h1>`));
        let _img = $("<img>");
        _img.prop("src", logo);
        _img.prop("height", "150");
        _info.append(_img);
        let _p = $(`<p>Full team Name: ${nomeCompleto}</p>`);
        _info.append(_p);
        _p = $(`<p>Country: ${paese}</p>`);
        _info.append(_p);
        _p = $(`<p>Chassis: ${chassis}</p>`);
        _info.append(_p);
        _p = $(`<p>Power unit: ${powerUnit}</p>`);
        _info.append(_p);
        _p = $(`<p>TechnicalChief: ${technicalChief}</p>`);
        _info.append(_p);
        _p = $(`<p>Drivers: ${primoDriver}, ${secondoDriver}</p>`);
        _info.append(_p);
        _img = $("<img>");
        _img.prop("src", foto);
        _img.prop("height", "150");
        _info.append(_img);
    });
}

function creaTabellaCircuits(circuits) {
    let _table = $("<table>");
    _table.append($("<tr><td>ID</td><td>Name</td><td>Length (m)</td><td>Number of Laps</td><td>Country</td><td>Photo</td></tr>"));
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
                let _img = $("<img>");
                _img.prop("src", circuits[i][index]);
                _img.prop("height", "50");
                row.append(_img);
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

