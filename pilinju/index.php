<?php
    $current_page = "index";
    require("header.php");
?>
    <script src="http://webapi.amap.com/maps?v=1.2&key=45c3f528acdd137d5baba38042aab148" type="text/javascript"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="plugins/leanmodal/leanmodal.js"></script>
    <link rel="stylesheet" type="text/css" href="css/index.css">
    <link rel="stylesheet" type="text/css" href="plugins/leanmodal/leanmodal.css">
    <body>
        <?php
            require("header_nav.php");
        ?>
        <div class="container">
        	<div class="row">
    			<div class="col-md-6">
    				<div id="gaodemap"></div>
        		</div>
        		<div class="col-md-6">
        			<div id="result" class="result">
        			</div>
        		</div>
        	</div>
        </div>
    </body>

</html>