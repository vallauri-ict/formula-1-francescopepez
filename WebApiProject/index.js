"use strict;"

$(function () {
    $("#loadDrivers").on("click", function () {
        richiesta("/Drivers", loadTable);
    });

    $("#loadTeams").on("click", function () {
        richiesta("/Teams", loadTable);
    });

    $("#loadCountries").on("click", function () {
        richiesta("/Countries", loadTable);
    });
    
    $("#loadDriver").on("click", function () {
        let driverId = $("#txtDriver").val();
        richiesta("/Drivers/" + driverId, loadElement);
    });
    $("#loadTeam").on("click", function () {
        let teamId = $("#txtTeam").val();
        richiesta("/Teams/" + teamId, loadElement);
    });
    $("#loadCountry").on("click", function () {
        let countryId = $("#txtCountry").val();
        richiesta("/Countries/" + countryId, loadElement);
    });
});

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

function loadTable(data) {
    let tbl_body = "";
    let tbl_head = "";
    let odd_even = false;
    let first = true;
    $.each(data, function () {
        let tbl_row = "";

        $.each(this, function (k, v) {
            if (first) {
                tbl_head += "<th>" + k + "</th>";
            }

            if (({}).constructor === v.constructor) //check if json
            {
                for (var key in v) {
                    if (v.hasOwnProperty(key)) {
                        tbl_row += "<td>" + v[key] + "</td>";
                        break;
                    }
                }
            }
            else
                tbl_row += "<td>" + v + "</td>";
        });
        first = false;
        tbl_body += "<tr class=\"" + (odd_even ? "odd" : "even") + "\">" + tbl_row + "</tr>";
        odd_even = !odd_even;
    });
    $("#table thead").html(tbl_head);
    $("#table tbody").html(tbl_body);
};
function loadElement(data) {
    console.log(data);
    let tbl_body = "";
    let tbl_head = "";

    $.each(data, function (k, v) {
        tbl_head += "<th>" + k + "</th>";

        if (({}).constructor === v.constructor) //check if json
        {
            for (var key in v) {
                if (v.hasOwnProperty(key)) {
                    tbl_body += "<td>" + v[key] + "</td>";
                    break;
                }
            }
        }
        else
            tbl_body += "<td>" + v + "</td>";
    });
    $("#table thead").html(tbl_head);
    $("#table tbody").html(tbl_body);
};

function error(jqXHR, testStatus, strError) {
    $("#table thead").html("");
    $("#table tbody").html("Impossibile trovare la risorsa richiesta, maggiori informazioni in console.");
    if (jqXHR.status == 0)
        console.log("server timeout");
    else if (jqXHR.status == 200)
        console.log("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        console.log("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
};