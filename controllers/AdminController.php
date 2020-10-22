<?php

// error_reporting(E_ALL);
class AdminController {

    private $model;

    public function __construct() {
        $this->model = new AdminModel();
    }

    public function getErrors() {

        $jsonDatan = json_encode($this->model->getErrors());
        return $jsonDatan;
    }
     //Hämtar alla arbetare och gör om arrayen till JSON
    
    public function getWorkers() {

        $jsonDataArbetare = json_encode($this->model->getWorkers());
        return $jsonDataArbetare;
    }
       //För sorteringsknappen som hämtar från modellens funktion getsortby som anropar databasen

    public function getSortByDate() {

        $jsonSorted = json_encode($this->model->getSortByDate());
        return $jsonSorted;
    }
    
     public function getSortByCheckbox() {

        $jsonSorted = json_encode($this->model->getSortByCheckbox());
        return $jsonSorted;
    }
    
     public function getSortByWorker() {

        $jsonSorted = json_encode($this->model->getSortByWorker());
        return $jsonSorted;
    }
       //Hämtar alla felbeskrivningar med dess arbetare, returnerar JSON.
    
public function getErrorWorkers($emplo) {
		
		$emplo = json_encode($this->model->getErrorWorkers($emplo));
                return $emplo;
	}
 //Lägger till ett nytt genom en request, filtrerar och skickar till databasen.
    
    public function addError() {

        $error = new stdClass();
        $error->fel = filter_var($_REQUEST['fel'], FILTER_SANITIZE_STRING);
        $error->datum = filter_var($_REQUEST['datum'], FILTER_SANITIZE_NUMBER_FLOAT);
        $error->arbetare = filter_var($_REQUEST['arbetare'], FILTER_SANITIZE_STRING);
        $error->ibockad = filter_var($_REQUEST['ibockad']);
       
        $this->model->addError($error);     
    }
 
    //Hämtar data till formuläret, returnar JSON.
   
    public function getErrorsByID($idx) {
        return json_encode($this->model->geterrorByIndex($idx));
    }
   //Uppdaterar checkboxen, skickar in id:t för vald checkbox och 1=ikryssad eller 0=icke ikryssad

    public function updateCheckbox(){
          $checkbox = new stdClass();
        $checkbox->id = filter_var($_REQUEST['id'], FILTER_SANITIZE_STRING);
         $checkbox->ibockad = filter_var($_REQUEST['ibockad']);
          $this->model->updateCheckbox($checkbox); 
          
    }


}

?>
