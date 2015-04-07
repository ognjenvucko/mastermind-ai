<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="Solving Mastermind using Genetic Algorithm in JavaScript">
	<meta name="keywords" content="mastermind, game, genetic, evolving, algorithm, ai, solver">
	<meta name="author" content="ognjenvucko@gmail.com">
	<title>Skocko</title>

	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/bootstrap-theme.min.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">

	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->

</head>
<body>

	<div class="header">
		Solving Mastermind using Genetic Algorithm
	</div>

	<div class="container-fluid">
		<div class="guess-zone">
			<div class="one-guess">
				<table class="guess-table">
					<?php for($i=0; $i<6; $i++): ?>
						<tr class="guess-row-<?= $i ?>">
							<td class="sym-col"><span></span></td>
							<td class="sym-col"><span></span></td>
							<td class="sym-col"><span></span></td>
							<td class="sym-col"><span></span></td>
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
								<?php endif; ?>
								<img id="loader-<?= $i ?>" src="images/loader.gif">
							</td>
						</tr>
					<?php endfor; ?>
				</table>
				<p>
					<p>Mastermind Genetic Algorithm v1.2.0</p>
					<div class="checkbox">
						<div class="btn btn-success new-game">New Game</div>&nbsp;			
						<label>
							<input type="checkbox" id="ai-mode">Auto AI Mode
						</label>
					</div>					
				</p>
			</div>
		</div>
	</div>

 	<script src="js/jquery/jquery.min.js"></script>
	<script src="js/bootstrap/bootstrap.min.js"></script>
	<script src="js/underscore-min.js"></script>
	<script src="js/application.js"></script>
</body>
</html>