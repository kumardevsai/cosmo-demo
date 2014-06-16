 <nav class="navbar navbar-default" role="navigation" style="margin-bottom:10px;">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">
                Toggle navigation
            </span>
            <span class="icon-bar">
            </span>
            <span class="icon-bar">
            </span>
            <span class="icon-bar">
            </span>
        </button>
        <a class="navbar-brand" href="#">
            毗邻居
        </a>
    </div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right">
            <?php
                if($current_page == "index")
                {
                    ?>
                        <form class="navbar-form navbar-left" role="search">
                            <div class="form-group">
                                <input type="text" class="form-control" style="width:300px;" id="searchplace" placeholder="关键字">
                            </div>
                            <button class="btn btn-default" id="sbtn0">
                                搜索
                            </button>
                            or
                            <button type="submit" class="btn btn-default" id="sbtn1">
                                我的位置
                            </button>
                        </form>
                    <?php
                }
            ?>
            <?php
                if($current_page == "regist"){
                    ?>
                    <li>
                        <a href="login.php">
                            登录
                        </a>
                    </li>
                    <?php
                }
            ?>
            <?php
                if($current_page == "login"){
                    ?>
                    <li>
                        <a href="regist.php">
                            注册
                        </a>
                    </li>
                    <?php
                }
            ?>
            <li>
                <a href="#">
                    关于
                </a>
            </li>
        </ul>
    </div>
    <!-- /.navbar-collapse -->
</nav>
<div id="result_error" style="display:none;"></div>
<a id="show_result_error" rel="leanModal" name="show_result_error" href="#result_error" style="display:none;"></a>