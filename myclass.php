<?php
class weiboad{

	public function __construct()
    {
    	#do nothing
    	echo "welcome to weiboAds class......\n";
    }

    public function run()
    {
    	#do nothing
    }
    
	public function postcomment($email,$pw,$keyword,$comment)
	{
		$casperdir="~/Documents/Li/weiguangproject/weiboadjs/";
		//$email="";
		//$pw="";
		//$keyword="悬疑片";
		//$comment="v5";
		system("casperjs ".$casperdir."test.js --u=".$email." --p=".$pw." --k=".$keyword." --c=".$comment." --ssl-protocol=any --web-security=no --ignore-ssl-errors=true
");
	}
   

}

?>