<script lang="ts">
	//logic regarding session storage
	//if session storage is empty, redirect to home
	//redirect to consent if no consent is found
</script>

<div class="centered">
	<slot />
</div>

<!-- 
 -->

<style>
	.centered {
		display: flex;
		flex-direction: column;
		height: 100vh;
		align-items: center;
	}
</style>
