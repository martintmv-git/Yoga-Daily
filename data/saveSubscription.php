<?php
if(isset($_POST["json"])){
	$subscribersFile="subscribers.json";
	//Open the subscriberfile
	$fileHandler=fopen($subscribersFile,"r");
	$subscribers=fread($fileHandler,filesize($subscribersFile));
	$subscribers=json_decode($subscribers,true);
	fclose($fileHandler);
	//Decoding the JSON string to an array and add (or overwrite) it in subscribers
	$subscriberRawData=json_decode($_POST["json"],true);
	$subscribers[$subscriberRawData["endpoint"]]["keys"]=$subscriberRawData["keys"];
	$subscribers[$subscriberRawData["endpoint"]]["timestamp"]=time();
	//Writing the file
	$fileHandler=fopen($subscribersFile,"w");
	fwrite($fileHandler,json_encode($subscribers));	
	fclose($fileHandler);
	echo "Subscriber saved!";
} else {
	echo "Nothing to do....";
}
?>