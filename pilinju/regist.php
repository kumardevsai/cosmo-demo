<?php 
    $current_page = "regist";
    require("header.php");
?>
<script type="text/javascript" src="js/regist.js"></script>
<script type="text/javascript" src="js/classlist.js"></script>
<link rel="stylesheet" type="text/css" href="css/regist.css">
    <body>
        <?php
            require("header_nav.php");
        ?>
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                </div>
                <div class="col-md-6">
                    <form role="form" style="border:1px solid #e7e7e7;padding:40px;margin-top:20px;">
                      <div class="form-group">
                        <label for="inputEmail">邮件地址</label>
                        <input type="email" class="form-control" id="inputEmail" placeholder="邮件地址">
                      </div>
                      <span class="help-block" id="inputEmailHelper">例:example@gmail.com</span>
                      <div class="form-group">
                        <label for="inputUsername">用户名</label>
                        <input type="text" class="form-control" id="inputUsername" placeholder="用户名">
                      </div>
                      <span class="help-block" id="inputUsernameHelper">数字字母下划线(第一个字符必须是英文，长度6-10)</span>
                      <div class="form-group">
                        <label for="inputPassword">密码</label>
                        <input type="password" class="form-control" id="inputPassword" placeholder="密码">
                      </div>
                      <span class="help-block" id="inputPasswordHelper">数字字母下划线(第一个字符必须是英文，长度6-10)</span>
                      <button class="btn btn-primary" id="okBtn">注册</button>
                    </form>
                </div>
                <div class="col-md-3">
                </div>
            </div>
        </div>
    </body>

</html>