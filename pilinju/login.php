<?php 
    $current_page = "login";
    require("header.php");
?>
<script type="text/javascript" src="js/login.js"></script>
<link rel="stylesheet" type="text/css" href="css/login.css">
    <body>
        <?php
            require("header_nav.php");
        ?>
        <div class="container">
        	<div class="row">
                <div class="col-md-3">
                </div>
    			<div class="col-md-6">
                    <form role="form" style="border:1px solid #e7e7e7;padding:40px;margin-top:80px;">
                      <div class="form-group">
                        <label for="exampleInputEmail1">邮件地址</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="邮件地址">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">密码</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="密码">
                      </div>
                      <button type="submit" class="btn btn-primary">登录</button>
                      <button type="submit" class="btn btn-default">注册</button>
                      <small><a style="cursor:pointer;">忘记密码?</a></small>
                    </form>
        		</div>
                <div class="col-md-3">
                </div>
        	</div>
        </div>
    </body>

</html>