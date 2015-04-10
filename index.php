<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="Solving Mastermind using Genetic Algorithm in JavaScript">
	<meta name="keywords" content="mastermind, game, genetic, evolving, algorithm, ai, solver">
	<meta name="author" content="ognjenvucko@gmail.com">
	<title>Mastermind AI</title>

	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/bootstrap-theme.min.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">

	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->

</head>
<body>

	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-61732641-1', 'auto');
	  ga('send', 'pageview');

	</script>

	<div id="fb-root"></div>
	<script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>	

	<div class="header">
		Solving Mastermind using Genetic Algorithm
	</div>

	<div class="container-fluid">
		<div class="guess-zone">
			<div class="one-guess">
				<table class="guess-table">
					<?php for($i=0; $i<7; $i++): ?>
						<?php if($i < 6) : ?>
							<tr class="guess-row-<?= $i ?>">
								<td class="sym-col block-0"><span></span></td>
								<td class="sym-col block-1"><span></span></td>
								<td class="sym-col block-2"><span></span></td>
								<td class="sym-col block-3"><span></span></td>
								<td>
									<table class="test-table-<?= $i ?>">
										<tr>
											<td class="test-col" id="tcol-0"></td>
											<td class="test-col" id="tcol-1"></td>
										</tr>
										<tr>
											<td class="test-col" id="tcol-2"></td>
											<td class="test-col" id="tcol-3"></td>
										</tr>									
									</table>
								</td>
								<td class="loader-col">
									<?php if($i < 5) : ?>
										<div class="btn btn-default go-btn-<?= $i ?> disabled">Go</div>
									<?php else: ?>
										<div class="btn btn-default go-btn-<?= $i ?> disabled" style="display: none;">Go</div>
									<?php endif; ?>
									<img id="loader-<?= $i ?>" src="images/loader.gif">
								</td>
							</tr>
						<?php else: ?>
							<tr>
								<td class="sym-col secret-block-0 secret-sym"></td>
								<td class="sym-col secret-block-1 secret-sym"></td>
								<td class="sym-col secret-block-2 secret-sym"></td>
								<td class="sym-col secret-block-3 secret-sym"></td>
							</tr>
						<?php endif; ?>
					<?php endfor; ?>
				</table>
				<p>
					<table class="options-table">
						<tr>
							<td class="option-col-A sym-A"></td>
							<td class="option-col-B sym-B"></td>
							<td class="option-col-C sym-C"></td>
							<td class="option-col-D sym-D"></td>
							<td class="option-col-E sym-E"></td>
							<td class="option-col-F sym-F"></td>
						</tr>
					</table>
					<div class="game-control-section">	
						<label>
							<span>Choose game mode:</span>
							<select id="mode-select" class="form-control">
								<option value="1">Human vs Computer</option>
								<option value="2">AI vs Human</option>
								<option value="3">AI vs Computer</option>
							</select>
						</label>

						<div class="btn btn-success new-game">New Game</div><br><br>
						<div>
							<div class="fb-like" data-href="http://ognjenvucko.github.io/mastermind-ai/" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>
						</div>
					</div>					
				</p>
			</div>
		</div>
	</div>

	<a class="hidden-xs" href="https://github.com/ognjenvucko/mastermind-ai" target="_blank">
		<img class="ribbon" alt="Fork me on GitHub" src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png">
	</a>

 	<script src="js/jquery/jquery.min.js"></script>
	<script src="js/bootstrap/bootstrap.min.js"></script>
	<script src="js/underscore-min.js"></script>
	<script src="js/application.js"></script>
</body>
</html>