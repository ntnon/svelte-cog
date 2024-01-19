<div class="clock">
	<div class="dial"></div>
	<div class="hand hour"></div>
	<div class="hand minute"></div>
	<slot />
</div>

<style>
	.clock {
		margin-top: 1rem;
		width: 300px;
		height: 300px;
		border: 15px solid #e37951;
		border-radius: 50%;
		position: relative;
		align-self: center;
	}

	.dial {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 10px;
		height: 10px;
		background: rgb(128, 127, 127);
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
</style>
