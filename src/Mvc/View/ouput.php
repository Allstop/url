<html>
    <head>
        <meta charset="utf-8">
        <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.4/darkly/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="public/css/main.css">
        <title>URL</title>
    </head>
    <body>
        <form action="'.$file.'" method="post">
            <h1>Results Data</h1>
            <?php echo $urlInput ?>
            <?php echo $methodInput ?>
            <?php echo $dataInput ?>
            <div class="url-output form-group"></div>
            <?php echo $regexInput ?>
            <div class="regex-output"></div>
            <div class="result-output"></div>
        </form>
        <script src="public/js/jquery-1.11.2.min.js"></script>
        <script src="public/js/main.js"></script>
    </body>
</html>

<?php

$urlInput = include('src/Mvc/View/url-input.php');
$methodInput = include('src/Mvc/View/method-input.php');
$dataInput = include('src/Mvc/View/data-input.php');
$regexInput = include('src/Mvc/View/regex-input.php');

?>
