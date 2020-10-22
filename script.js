

$(document).ready(function () {//Körs först
    getFel();
    getWorkers();
    
});
//Hämtat från https://stackoverflow.com/questions/574944/how-to-load-up-css-files-using-javascript/40933978#40933978 för att kunna implementera css
var cssId = 'myCss';  
if (!document.getElementById(cssId))
{
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'style.css';
    link.media = 'all';
    head.appendChild(link);
}
//Hämtar hem allt med getJSON och skickar in datan i tabellen för att visa det som hämtats ut
function getFel() {
    $.getJSON("./index1.php?AdminController/getErrors/", function (jsondata) {
    

        showJSONDataInTable(jsondata);
    });
}
//Hämtar hem sorteringen med getjson och skickar in datan i tabellen för att visa det som hämtats ut
function getSortByDate() {
    $.getJSON("./index1.php?AdminController/getSortByDate/", function (jsonSorted) {
        console.log("jsondata: ", jsonSorted);

        showJSONDataInTable(jsonSorted);
    });
}

function getSortByCheckbox() {
    $.getJSON("./index1.php?AdminController/getSortByCheckbox/", function (jsonSorted) {
        console.log("jsondata: ", jsonSorted);

        showJSONDataInTable(jsonSorted);
    });
}

function getSortByWorker() {
    $.getJSON("./index1.php?AdminController/getSortByWorker/", function (jsonSorted) {
        console.log("jsondata: ", jsonSorted);

        showJSONDataInTable(jsonSorted);
    });
}
//Avsedd för dropdown menyn
function getWorkers() {

    let dropDown = $("#dropDownSelect");
    let employeeSelect = $("#employeeSelect");
    dropDown.on('change', function () {
        var value = $(this).val();
        getErrorWorkers(value);
        console.log("testar, hämtar den?", value);
    });

    $.getJSON("./index1.php?AdminController/getWorkers/", function ($jsonDataArbetare) {
        console.log("jsondata: ", $jsonDataArbetare);
        $.each($jsonDataArbetare, function (index, element) {

            //Fyller dropdown-menyerna med data från tabellen i databasen
            dropDown.append("<option>" + element['arbetare'].trim() + "</option>");
            employeeSelect.append("<option>" + element['arbetare'].trim() + "</option>");

        });
       
    });

}

//Avsedd för dropdown menyn
function getErrorWorkers(emplo) {
//Inparametern är ifrån admincontrollern som sen kommer från modellen
    $.getJSON("./index1.php?AdminController/getErrorWorkers/" + emplo, function (jsondata) {
        let table = $('#tblAktiviteter');
        console.log("testar, hämtar den?", emplo);
        //console.log("testar, hämtar den?", jsondata);
        table.empty();
        let tr = $("<tr></tr>");
        let thId = $("<th></th>");
        let thFel = $("<th></th>");
        let thDatum = $("<th></th>");
        let thArbetare = $("<th></th>");
        let thGjord = $("<th></th>");


        thId.text("ID");
        thFel.text("Felbeskrivning");
        thDatum.html('<p onclick="getSortByDate()">▼ Datum</p>');
      thArbetare.html('<p onclick="getSortByWorker()">▼ Fastighetsskötare</p>');
       
      thGjord.html('<p onclick="getSortByCheckbox()">▼ Åtgärdat?</p>');

        tr.append(thId);
        tr.append(thFel);
        tr.append(thDatum);
        tr.append(thArbetare);
        tr.append(thGjord);

        table.append(tr);
        //For each loop som loopar igenom det inhämtade datat från databasen
        $.each(jsondata, function (index, element) {
            
            
            console.log(jsondata);

//Skapar upp tabellraderna
            let tr = $("<tr></tr>");

            let tdId = $("<td></td>");

            let tdFel = $("<td></td>");


            let tdDatum = $("<td></td>");
            let tdArbetare = $("<td></td>");

            let tdChecked = $('<input type="checkbox" id="checked' + element.ID + '"" value="' + element.ID + '"onclick="updatecheck(' + element.ID + ')"></input>');

 

            tdId.text(element.ID);

            tdFel.text(element.fel);


            tdDatum.text(element.datum);
            tdArbetare.text(element.arbetare);

            // console.log((element.arbetare))


            var ibockad = (element.ibockad === "1");


            tdChecked.prop('checked', ibockad);




            tr.append(tdId);

            tr.append(tdFel);

            tr.append(tdDatum);

            tr.append(tdArbetare);
            tr.append(tdChecked);



            table.append(tr);

        });
    });
}



function showJSONDataInTable(jsondatafel) {
    let table = $('#tblAktiviteter');
    table.empty();
    let tr = $("<tr></tr>");
    let thId = $("<th></th>");
    let thFel = $("<th></th>");
    let thDatum = $("<th></th>");
    let thArbetare = $("<th></th>");
    let thGjord = $("<th></th>");

    thId.text("ID");
    thFel.text("Felbeskrivning");

    thDatum.html('<p onclick="getSortByDate()">▼ Datum</p>');
   
     thArbetare.html('<p onclick="getSortByWorker()">▼ Fastighetsskötare</p>');
 
 
    thGjord.html('<p onclick="getSortByCheckbox()">▼ Åtgärdat?</p>');

    tr.append(thId);
    tr.append(thFel);
    tr.append(thDatum);
    tr.append(thArbetare);
    tr.append(thGjord);

    table.append(tr);
    $.each(jsondatafel, function (index, element) {
        console.log(jsondatafel);

//Skapar upp tabellraderna
        let tr = $("<tr></tr>");

        let tdId = $("<td></td>");

        let tdFel = $("<td></td>");


        let tdDatum = $("<td></td>");
        let tdArbetare = $("<td></td>");

        let tdChecked = $('<input type="checkbox" id="checked' + element.ID + '"" value="' + element.ID + '"onclick="updatecheck(' + element.ID + ')"></input>');



        tdId.text(element.ID);

        tdFel.text(element.fel);


        tdDatum.text(element.datum);
        tdArbetare.text(element.arbetare);

      
        var ibockad = (element.ibockad === "1");


        tdChecked.prop('checked', ibockad);




        tr.append(tdId);

        tr.append(tdFel);

        tr.append(tdDatum);

        tr.append(tdArbetare);
        tr.append(tdChecked);



        table.append(tr);

    });
}

function getTestModal() {
 
//Skapar upp modalen, jag gjorde en egen modal utan bootstrap
    var x = `
            <div id="foreground">
            <div id="testmodal">
            <h1 lang="sv" align=center>Lägg till fel</h1>
            <div id="inform">
    <p class="modaltext">Felbeskrivning:</p><input type="text" id=txtFel>
    <p class="modaltext">Datum:</p><input type="date" id=txtDatum>
    <br><br><select name="asd" id="employeeSelect"></select><br><br>
    <p class="modaltext">Åtgärdat?<input type="checkbox" id=checked></p>
    </div>

    <button type="button" class="btn-default" onclick="fetchError()">Lägg till</button>
    
            </div></div>`;

    document.body.insertAdjacentHTML('afterbegin', x);
getWorkers()
 

    clickedOutside();

}
//När användaren klickar utanför modalen så körs funktionen nedan
function clickedOutside() {

    var parent = document.getElementById('foreground');
    document.getElementById('testmodal').parentNode.addEventListener("click", function (event) {

        if (event.target == parent) {
            document.body.removeChild(parent)
        }
        ;
    })
}

function updatecheck(index) {

    var checkbox = document.getElementById("checked" + index);
    console.log(checkbox);
    //Här säger det ifall min checkbox är = true alltså att den är ikryssad
    if (checkbox.checked == true) {

        gjord = 1;// så blir det 1
    } else {
        gjord = 0;// om den inte är så blir det 0, båda dessa kan man se i databasen
    }

    $.post("./index1.php?AdminController/updateCheckbox/", {
        id: checkbox.value,
        ibockad: gjord,

    });
}
//Funktionen körs när man trycker på att skicka in fel
function fetchError() {
    var parent = document.getElementById('foreground');
    var error = $("#txtFel").val();
    var datumdate = $("#txtDatum").val();
    var worker = $("#employeeSelect").val();
    var gjord;

    var checkbox = document.getElementById("checked");
    //här säger det ifall min checkbox är = true alltså att den är ikryssad
    if (checkbox.checked == true) {

        gjord = 1;// så blir det 1
    } else {
        gjord = 0;// om den inte är så blir det 0, båda dessa kan man se i databasen
    }


    ;

    console.log(error);

    console.log(datumdate);
    console.log(worker);
    console.log(gjord);
//Datat sätts in i namnen som liknar den i databasen för att sedan postas
    $.post("./index1.php?AdminController/addError/", {
        fel: error,
        datum: datumdate,
        arbetare: worker,
        ibockad: gjord,

    });

    getFel();
    getWorkers() 
    document.body.removeChild(parent);
}




