<?php

class AdminModel {

    private function getPDOConnection() {
        
       $db_host = '127.0.0.1';
       $db_name = 'db-h17miklu';
        $db_user = 'root';
        $db_pass = '';

    //     $db_host = 'edu-mysql.du.se';
    //      $db_name = 'db-h17miklu';
    //      $db_user = 'h17miklu';
     //     $db_pass = 'ueSY5FcqtHKNQ839'; 

        $options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
        try {
            $pdoConnection = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass, $options);
        } catch (PDOException $exp) {
            echo 'Något gick fel. Försök igen.', $exp->getMessage();
            $pdoConnection = NULL;
            die();
        }
        return $pdoConnection;
    }
      //Anropar stored proceduren i databasen för att hämta baserat på åtgärdat

     public function getSortByCheckbox() {
        try {
            $pdoCon = $this->getPDOConnection();
            $pdoStatement = $pdoCon->prepare('CALL h17miklu_sortByCheckbox()');
            $pdoStatement->execute();
            $events = $pdoStatement->fetchAll(PDO::FETCH_OBJ);
            $pdoCon = NULL;
            return $events;
        } catch (PDOException $pdoexp) {
            $pdoCon = NULL;
            throw new Exception('Databasfel. Det gick inte att hämta checkboxen');
        }
    }
    
     public function getSortByDate() {
        try {
            $pdoCon = $this->getPDOConnection();
            $pdoStatement = $pdoCon->prepare('CALL h17miklu_sortByDate()');
            $pdoStatement->execute();
            $events = $pdoStatement->fetchAll(PDO::FETCH_OBJ);
            $pdoCon = NULL;
            return $events;
        } catch (PDOException $pdoexp) {
            $pdoCon = NULL;
            throw new Exception('Databasfel. Det gick inte att hämta datum');
        }
    }
    
     public function getSortByWorker() {
        try {
            $pdoCon = $this->getPDOConnection();
            $pdoStatement = $pdoCon->prepare('CALL h17miklu_sortByWorker()');
            $pdoStatement->execute();
            $events = $pdoStatement->fetchAll(PDO::FETCH_OBJ);
            $pdoCon = NULL;
            return $events;
        } catch (PDOException $pdoexp) {
            $pdoCon = NULL;
            throw new Exception('Databasfel. Det gick inte att hämta arbetare');
        }
    }
    
    //Hämtar hem alla felbeskrivningar från databasen
    public function getErrors() {
        try {
            $pdoCon = $this->getPDOConnection();
            $pdoStatement = $pdoCon->prepare('CALL h17miklu_getAllError()');
            $pdoStatement->execute();
            $fel = $pdoStatement->fetchAll(PDO::FETCH_OBJ);
            $pdoCon = NULL;
            return $fel;
        } catch (PDOException $pdoexp) {
            $pdoCon = NULL;
            throw new Exception('Databasfel. Det gick inte att hämta fel');
        }
    }
   

         //Hämtar alla som berörs för drop down menyn
    //Avsedd för drop down menyn, hämtar alla fel, skickar in namnet på den som berörs till databasen


        public function getErrorWorkers($emplo) {
		
		$pdoConnection = $this->getPDOConnection();
		$pdoStatement = $pdoConnection->prepare("CALL h17miklu_getErrorWorkers('{$emplo}')");
		$pdoStatement->execute();
		$reports = $pdoStatement->fetchAll(PDO::FETCH_OBJ);
		$pdoConnection = NULL;
		
		return $reports;
	}
    //Hämtar alla som berörs för drop down menyn

         public function getWorkers() {
		
		$pdoConnection = $this->getPDOConnection();
		$pdoStatement = $pdoConnection->prepare('CALL h17miklu_getAllWorkers()');
		$pdoStatement->execute();
		$employees = $pdoStatement->fetchAll(PDO::FETCH_OBJ);
		$pdoConnection = NULL;
		
		return $employees;
	}
        
       //Lägger till nytt baserat på den stored procedure som finns i databasen

    public function addError($error) {
        try {
            print_r($error);
            $pdoCon = $this->getPDOConnection();
            $pdoStatement = $pdoCon->prepare("CALL h17miklu_addError('{$error->fel}',' {$error->datum}',' {$error->arbetare}',' {$error->ibockad}')");
            
            $pdoStatement->execute();
            $pdoCon = NULL;
        } catch (PDOException $pdoexp) {
            $pdoCon = NULL;
            throw new Exception('Databasfel. Det gick inte att lägga till felbeskrivning');
        }
    }
    //Hämtar felbeskrivningen som möjliggör uppdatering genom id:et
    
     public function geterrorByIndex($idx) {
        try {
            $pdoCon = $this->getPDOConnection();
            $pdoStatement = $pdoCon->prepare("CALL h17miklu_getErrorByIndex('{$idx}')");
            $pdoStatement->execute();
            $fel = $pdoStatement->fetchAll(PDO::FETCH_OBJ);
           
            $pdoCon = NULL;
            return $fel;
        } catch (PDOException $pdoexp) {
            $pdoCon = NULL;
            throw new Exception('Databasfel. Det gick inte att hämta felbeskrivning');
        }
        
        
    }
    //Uppdaterar checkboxen, skickar in värde 0 eller 1 och id:et för den raden
        
         public function updateCheckbox($checkbox) {
            try {
                  $pdoCon = $this->getPDOConnection();
            $pdoStatement = $pdoCon->prepare("CALL h17miklu_updateErrorCheckbox('{$checkbox->id}','{$checkbox->ibockad}')");
            $pdoStatement->execute();
            $pdoCon = NULL;
            
            } catch (PDOException $pdoexp) {
   $pdoCon = NULL;
            throw new Exception('Databasfel. Det gick inte att uppdatera checkboxen');
            }
        }

}

?>
